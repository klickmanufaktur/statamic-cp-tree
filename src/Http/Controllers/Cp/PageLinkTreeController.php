<?php

namespace StatamicCpTree\Http\Controllers\Cp;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Statamic\Facades\Collection;
use Statamic\Facades\Site;
use Statamic\Facades\User;
use Statamic\Structures\TreeBuilder;

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
        $pages = $collection->structure()
            ? (new TreeBuilder)->buildForController([
                'structure' => $collection->structure(),
                'include_home' => true,
                'site' => $site->handle(),
            ])
            : [];

        return response()->json([
            'pages' => $this->filterTree($pages, $site->handle()),
            'site' => $site->handle(),
        ]);
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
