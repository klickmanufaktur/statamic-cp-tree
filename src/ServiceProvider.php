<?php

namespace StatamicCpTree;

use Statamic\Providers\AddonServiceProvider;
use Statamic\Statamic;

class ServiceProvider extends AddonServiceProvider
{
    protected $routes = [
        'cp' => __DIR__.'/../routes/cp.php',
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
                'pageLinkCollection' => config('statamic-cp-tree.page_link_collection', 'pages'),
                'pageLinkTreeUrl' => cp_route('statamic-cp-tree.page-link-tree'),
            ],
        ]);
    }
}
