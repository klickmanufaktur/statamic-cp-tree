<?php

namespace StatamicCpTree\Http\Controllers\Cp;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Statamic\Facades\Collection;
use Statamic\Facades\Entry;
use Statamic\Facades\Site;
use Statamic\Facades\User;

class PageTreeFlagsController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $collection = Collection::findByHandle((string) $request->query('collection', ''));

        abort_unless($collection, 404);
        abort_unless(User::current()?->can("view {$collection->handle()} entries"), 403);

        $site = Site::get((string) $request->query('site')) ?? Site::current();
        $user = User::current();
        $accessResolver = $this->accessResolver();
        $restricted = $this->isRestricted($accessResolver, $user);
        $allowedIds = $restricted ? $this->allowedEntryIds($accessResolver, $user, $site->handle()) : [];

        $query = Entry::query()
            ->where('collection', $collection->handle())
            ->where('site', $site->handle());

        if ($restricted) {
            $query->whereIn('id', $allowedIds ?: ['__no_entries__']);
        }

        $fields = config('statamic-cp-tree.flags', []);
        $badgeConfigs = config('statamic-cp-tree.badges', []);

        $flags = $query
            ->get()
            ->mapWithKeys(fn ($entry): array => [
                $entry->id() => [
                    'hide_navigation' => (bool) $entry->get($fields['hide_navigation'] ?? 'hide_navigation'),
                    'search_hidden' => (bool) $entry->get($fields['search_hidden'] ?? 'search_hidden'),
                    'badges' => $this->entryBadges($entry, is_array($badgeConfigs) ? $badgeConfigs : []),
                ],
            ]);

        return response()->json([
            'flags' => $flags,
            'restricted' => $restricted,
            'allowed_ids' => $allowedIds,
            'cache_key' => sha1($user->id().'|'.$collection->handle().'|'.implode(',', $this->allowedRootIds($accessResolver, $user))),
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
     * @param  array<string, array<string, mixed>>  $badgeConfigs
     * @return list<array{key: string, value: string, label: string, color: ?string}>
     */
    private function entryBadges(mixed $entry, array $badgeConfigs): array
    {
        return collect($badgeConfigs)
            ->map(function (mixed $config, string|int $key) use ($entry): ?array {
                if (! is_array($config)) {
                    return null;
                }

                $field = $config['field'] ?? $key;

                if (! is_string($field) || $field === '') {
                    return null;
                }

                $value = (string) ($entry->get($field) ?: ($config['default'] ?? ''));

                if ($value === '') {
                    return null;
                }

                $values = is_array($config['values'] ?? null) ? $config['values'] : [];
                $mapped = is_array($values[$value] ?? null) ? $values[$value] : [];
                $label = $mapped['label'] ?? $value;

                if (! is_string($label) || $label === '') {
                    return null;
                }

                $color = $mapped['color'] ?? null;

                return [
                    'key' => (string) $key,
                    'value' => $value,
                    'label' => $label,
                    'color' => is_string($color) && $color !== '' ? $color : null,
                ];
            })
            ->filter()
            ->values()
            ->all();
    }

    private function isRestricted(?object $resolver, mixed $user): bool
    {
        return $resolver && method_exists($resolver, 'isRestricted')
            ? (bool) $resolver->isRestricted($user)
            : false;
    }

    /**
     * @return list<string>
     */
    private function allowedEntryIds(?object $resolver, mixed $user, string $site): array
    {
        if (! $resolver || ! method_exists($resolver, 'allowedEntryIds')) {
            return [];
        }

        return collect($resolver->allowedEntryIds($user, $site))
            ->map(fn (mixed $id): string => (string) $id)
            ->values()
            ->all();
    }

    /**
     * @return list<string>
     */
    private function allowedRootIds(?object $resolver, mixed $user): array
    {
        if (! $resolver || ! method_exists($resolver, 'allowedRootIds')) {
            return [];
        }

        return collect($resolver->allowedRootIds($user))
            ->map(fn (mixed $id): string => (string) $id)
            ->values()
            ->all();
    }
}
