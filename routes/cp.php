<?php

use Illuminate\Support\Facades\Route;
use StatamicCpTree\Http\Controllers\Cp\PageLinkTreeController;
use StatamicCpTree\Http\Controllers\Cp\PageTreeFlagsController;

Route::get('api/statamic-cp-tree/flags', [PageTreeFlagsController::class, 'index'])
    ->name('statamic-cp-tree.flags');

Route::get('api/statamic-cp-tree/page-link-tree', [PageLinkTreeController::class, 'index'])
    ->name('statamic-cp-tree.page-link-tree');
