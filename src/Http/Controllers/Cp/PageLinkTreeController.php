<?php

namespace StatamicCpTree\Http\Controllers\Cp;

use Illuminate\Contracts\Cache\LockTimeoutException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Cache;
use Statamic\Facades\Collection;
use Statamic\Facades\Site;
use Statamic\Facades\User;
use Statamic\Structures\TreeBuilder;
use StatamicCpTree\Support\PageLinkTreeCache;

class PageLinkTreeController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $collectionHandle = config('statamic-cp-tree.page_link_collection', 'pages');

        abort_unless(is_string($collectionHandle) && $collectionHandle !== '', 404);

        $collection = Collection::findByHandle($collectionHandle);

        abort_unless($collection, 404);
        abort_unless(User::current()?->can("view {$collection->handle()} entries"), 403);

        $site = Site::get((string) $request->query('site')) ?? Site::current();

        return response()->json([
            'pages' => $this->cachedTree($collection, $site->handle()),
            'site' => $site->handle(),
        ]);
    }

    /**
     * Der Baum-Build ist teuer (~0,7–5 s). Pro Anfrage neu zu bauen lässt jeden
     * Picker-Open hängen, und mehrere Felder gleichzeitig vervielfachen das. Das
     * Ergebnis wird daher pro Collection/Site/User gecacht und mit einem Lock
     * gegen parallele Cold-Builds (Stampede) abgesichert: nur eine Anfrage baut,
     * die übrigen warten kurz und lesen dann aus dem Cache. Der Cache-Key enthält
     * eine Versionsnummer (siehe PageLinkTreeCache), die FlushPageLinkTreeCache bei
     * Entry- oder Baum-Änderungen hochzählt, damit Änderungen sofort sichtbar sind.
     *
     * @return list<array<string, mixed>>
     */
    private function cachedTree(\Statamic\Contracts\Entries\Collection $collection, string $site): array
    {
        $user = (string) (User::current()?->id() ?? 'guest');
        $cacheKey = PageLinkTreeCache::key($collection->handle(), $site, $user);

        if (($cached = Cache::get($cacheKey)) !== null) {
            return $cached;
        }

        $remember = fn (): array => Cache::remember(
            $cacheKey,
            now()->addMinutes(5),
            fn (): array => $this->buildTree($collection, $site),
        );

        try {
            return Cache::lock(PageLinkTreeCache::lockKey($collection->handle(), $site, $user), 20)->block(15, $remember);
        } catch (LockTimeoutException) {
            return $this->buildTree($collection, $site);
        }
    }

    /**
     * @return list<array<string, mixed>>
     */
    private function buildTree(\Statamic\Contracts\Entries\Collection $collection, string $site): array
    {
        $pages = $collection->structure()
            ? (new TreeBuilder)->buildForController([
                'structure' => $collection->structure(),
                'include_home' => true,
                'site' => $site,
            ])
            : [];

        return $this->filterTree($pages, $site);
    }

    private function accessResolver(): ?object
    {
        $class = config('statamic-cp-tree.access_resolver');

        if (! is_string($class) || $class === '' || ! class_exists($class)) {
            return null;
        }

        return app($class);
    }

    /**
     * @param  list<array<string, mixed>>  $pages
     * @return list<array<string, mixed>>
     */
    private function filterTree(array $pages, string $site): array
    {
        $resolver = $this->accessResolver();
        $user = User::current();

        if (! $resolver || ! method_exists($resolver, 'isRestricted') || ! $resolver->isRestricted($user)) {
            return $pages;
        }

        $allowedIds = method_exists($resolver, 'allowedEntryIds')
            ? collect($resolver->allowedEntryIds($user, $site))
                ->map(fn (mixed $id): string => (string) $id)
                ->filter()
                ->flip()
                ->all()
            : [];

        return $this->filterNodes($pages, $allowedIds);
    }

    /**
     * @param  list<array<string, mixed>>  $nodes
     * @param  array<string, int>  $allowedIds
     * @return list<array<string, mixed>>
     */
    private function filterNodes(array $nodes, array $allowedIds): array
    {
        $filtered = [];

        foreach ($nodes as $node) {
            $children = $this->filterNodes($node['children'] ?? [], $allowedIds);
            $entryId = (string) ($node['entry'] ?? $node['id'] ?? '');

            if (isset($allowedIds[$entryId])) {
                $node['children'] = $children;
                $filtered[] = $node;

                continue;
            }

            array_push($filtered, ...$children);
        }

        return array_values($filtered);
    }
}
