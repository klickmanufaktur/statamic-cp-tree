<?php

use Illuminate\Support\Facades\Route;
use StatamicCpTree\Http\Controllers\Cp\PageTreeFlagsController;

Route::get('api/statamic-cp-tree/flags', [PageTreeFlagsController::class, 'index'])
    ->name('statamic-cp-tree.flags');
