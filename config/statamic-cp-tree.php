<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Collections
    |--------------------------------------------------------------------------
    |
    | Collection handles whose default Statamic tree view should be replaced by
    | this control panel tree UI. Keep this empty to leave all collections on
    | Statamic's default collection tree.
    |
    */
    'collections' => [],

    /*
    |--------------------------------------------------------------------------
    | Hide Root URL
    |--------------------------------------------------------------------------
    |
    | Collection handles whose tree header should omit the root URL button.
    |
    */
    'hide_root_url_collections' => [],

    /*
    |--------------------------------------------------------------------------
    | Page Link Collection
    |--------------------------------------------------------------------------
    |
    | Collection handle used by the link fieldtype's page picker. Set this to
    | null to leave Statamic's default link fieldtype untouched.
    |
    */
    'page_link_collection' => 'pages',

    /*
    |--------------------------------------------------------------------------
    | Optional Access Resolver
    |--------------------------------------------------------------------------
    |
    | The resolver may expose isRestricted($user), allowedEntryIds($user, $site),
    | and allowedRootIds($user). Leave this null when no additional entry-node
    | restrictions are required.
    |
    */
    'access_resolver' => null,

    /*
    |--------------------------------------------------------------------------
    | Entry Flag Fields
    |--------------------------------------------------------------------------
    */
    'flags' => [
        'hide_navigation' => 'hide_navigation',
        'search_hidden' => 'search_hidden',
    ],

    /*
    |--------------------------------------------------------------------------
    | Entry Badges
    |--------------------------------------------------------------------------
    |
    | Optional project-specific badges shown on each tree item. The array key is
    | used as the badge key. Each badge may define a field, default value, and a
    | value map with label/color pairs.
    |
    */
    'badges' => [],
];
