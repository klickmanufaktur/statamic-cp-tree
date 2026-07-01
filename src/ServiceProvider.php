<?php

namespace StatamicCpTree;

use Statamic\Events\CollectionTreeDeleted;
use Statamic\Events\CollectionTreeSaved;
use Statamic\Events\EntryDeleted;
use Statamic\Events\EntrySaved;
use Statamic\Providers\AddonServiceProvider;
use Statamic\Statamic;
use StatamicCpTree\Listeners\FlushPageLinkTreeCache;

class ServiceProvider extends AddonServiceProvider
{
    protected $routes = [
        'cp' => __DIR__.'/../routes/cp.php',
    ];

    protected $listen = [
        EntrySaved::class => [FlushPageLinkTreeCache::class],
        EntryDeleted::class => [FlushPageLinkTreeCache::class],
        CollectionTreeSaved::class => [FlushPageLinkTreeCache::class],
        CollectionTreeDeleted::class => [FlushPageLinkTreeCache::class],
    ];

    protected $vite = [
        'input' => [
            'resources/js/cp.js',
        ],
        'publicDirectory' => 'resources/dist',
        'buildDirectory' => 'cp',
    ];

    public function bootAddon(): void
    {
        Statamic::provideToScript([
            'statamicCpTree' => fn (): array => [
                'collections' => config('statamic-cp-tree.collections', []),
                'flagsUrl' => cp_route('statamic-cp-tree.flags'),
                'hideRootUrlCollections' => config('statamic-cp-tree.hide_root_url_collections', []),
                'pageLinkCollection' => config('statamic-cp-tree.page_link_collection', 'pages'),
                'pageLinkTreeUrl' => cp_route('statamic-cp-tree.page-link-tree'),
            ],
        ]);
    }
}
