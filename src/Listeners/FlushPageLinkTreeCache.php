<?php

namespace StatamicCpTree\Listeners;

use Statamic\Events\CollectionTreeDeleted;
use Statamic\Events\CollectionTreeSaved;
use Statamic\Events\EntryDeleted;
use Statamic\Events\EntrySaved;
use StatamicCpTree\Support\PageLinkTreeCache;

class FlushPageLinkTreeCache
{
    public function handle(EntrySaved|EntryDeleted|CollectionTreeSaved|CollectionTreeDeleted $event): void
    {
        [$collection, $site] = $this->resolve($event);

        if ($collection !== (string) config('statamic-cp-tree.page_link_collection', 'pages')) {
            return;
        }

        PageLinkTreeCache::bump($collection, $site);
    }

    /**
     * @return array{0: string, 1: string}
     */
    private function resolve(EntrySaved|EntryDeleted|CollectionTreeSaved|CollectionTreeDeleted $event): array
    {
        if ($event instanceof EntrySaved || $event instanceof EntryDeleted) {
            return [$event->entry->collectionHandle(), $event->entry->locale()];
        }

        return [$event->tree->collection()->handle(), $event->tree->locale()];
    }
}
