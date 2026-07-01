<?php

namespace StatamicCpTree\Support;

use Illuminate\Support\Facades\Cache;

class PageLinkTreeCache
{
    public static function key(string $collection, string $site, string $user): string
    {
        return implode(':', [
            'statamic-cp-tree', 'page-link-tree', $collection, $site, $user, static::version($collection, $site),
        ]);
    }

    public static function lockKey(string $collection, string $site, string $user): string
    {
        return static::key($collection, $site, $user).':lock';
    }

    public static function version(string $collection, string $site): string
    {
        return (string) Cache::get(static::versionKey($collection, $site), '0');
    }

    public static function bump(string $collection, string $site): void
    {
        $key = static::versionKey($collection, $site);

        Cache::forever($key, (string) (((int) Cache::get($key, '0')) + 1));
    }

    private static function versionKey(string $collection, string $site): string
    {
        return "statamic-cp-tree:page-link-tree-version:{$collection}:{$site}";
    }
}
