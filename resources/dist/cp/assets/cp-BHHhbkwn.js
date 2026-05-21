const V=window.Vue,{BaseTransition:qe,BaseTransitionPropsValidators:He,Comment:ze,DeprecationTypes:Ve,EffectScope:Ke,ErrorCodes:je,ErrorTypeStrings:Ge,Fragment:I,KeepAlive:Qe,ReactiveEffect:Je,Static:We,Suspense:Ye,Teleport:Xe,Text:Ze,TrackOpTypes:et,Transition:tt,TransitionGroup:it,TriggerOpTypes:rt,VueElement:nt,__esModule:st,assertNumber:ot,callWithAsyncErrorHandling:at,callWithErrorHandling:lt,camelize:dt,capitalize:ct,cloneVNode:ut,compatUtils:ht,compile:pt,computed:gt,createApp:K,createBlock:v,createCommentVNode:C,createElementBlock:u,createElementVNode:g,createHydrationRenderer:ft,createPropsRestProxy:mt,createRenderer:yt,createSSRApp:It,createSlots:vt,createStaticVNode:Ct,createTextVNode:_t,createVNode:c,customRef:bt,defineAsyncComponent:St,defineComponent:xt,defineCustomElement:wt,defineEmits:Pt,defineExpose:Dt,defineModel:Nt,defineOptions:Tt,defineProps:kt,defineSSRCustomElement:At,defineSlots:Rt,devtools:Ut,effect:Et,effectScope:Ft,getCurrentInstance:Ot,getCurrentScope:Bt,getCurrentWatcher:Mt,getTransitionRawChildren:Lt,guardReactiveProps:$t,h:qt,handleError:Ht,hasInjectionContext:zt,hydrate:Vt,hydrateOnIdle:Kt,hydrateOnInteraction:jt,hydrateOnMediaQuery:Gt,hydrateOnVisible:Qt,initCustomFormatter:Jt,initDirectivesForSSR:Wt,inject:Yt,isMemoSame:Xt,isProxy:Zt,isReactive:ei,isReadonly:ti,isRef:ii,isRuntimeOnly:ri,isShallow:ni,isVNode:si,markRaw:oi,mergeDefaults:ai,mergeModels:li,mergeProps:di,nextTick:ci,nodeOps:ui,normalizeClass:j,normalizeProps:hi,normalizeStyle:pi,onActivated:gi,onBeforeMount:fi,onBeforeUnmount:mi,onBeforeUpdate:yi,onDeactivated:Ii,onErrorCaptured:vi,onMounted:Ci,onRenderTracked:_i,onRenderTriggered:bi,onScopeDispose:Si,onServerPrefetch:xi,onUnmounted:wi,onUpdated:Pi,onWatcherCleanup:Di,openBlock:o,patchProp:Ni,popScopeId:Ti,provide:ki,proxyRefs:Ai,pushScopeId:Ri,queuePostFlushCb:Ui,reactive:Ei,readonly:Fi,ref:Oi,registerRuntimeCompiler:Bi,render:Mi,renderList:N,renderSlot:Li,resolveComponent:h,resolveDirective:$i,resolveDynamicComponent:qi,resolveFilter:Hi,resolveTransitionHooks:zi,setBlockTracking:Vi,setDevtoolsHook:Ki,setTransitionHooks:ji,shallowReactive:Gi,shallowReadonly:Qi,shallowRef:Ji,ssrContextKey:Wi,ssrUtils:Yi,stop:Xi,toDisplayString:T,toHandlerKey:Zi,toHandlers:er,toRaw:tr,toRef:ir,toRefs:rr,toValue:nr,transformVNodeArgs:sr,triggerRef:or,unref:ar,useAttrs:lr,useCssModule:dr,useCssVars:cr,useHost:ur,useId:hr,useModel:pr,useSSRContext:gr,useShadowRoot:fr,useSlots:mr,useTemplateRef:yr,useTransitionState:Ir,vModelCheckbox:vr,vModelDynamic:Cr,vModelRadio:_r,vModelSelect:br,vModelText:Sr,vShow:xr,version:wr,warn:Pr,watch:Dr,watchEffect:Nr,watchPostEffect:Tr,watchSyncEffect:kr,withAsyncContext:Ar,withCtx:k,withDefaults:Rr,withDirectives:Ur,withKeys:Er,withMemo:Fr,withModifiers:Or,withScopeId:Br}=V,{Alert:Mr,AuthCard:Lr,Avatar:$r,Badge:G,Button:U,ButtonGroup:qr,Calendar:Hr,Card:zr,CardList:Vr,CardListItem:Kr,CardPanel:jr,CharacterCounter:Gr,Checkbox:Qr,CheckboxGroup:Jr,CodeEditor:Wr,Combobox:Yr,CommandPaletteItem:Xr,ConfirmationModal:Q,Context:J,ContextFooter:Zr,ContextHeader:en,ContextItem:W,ContextLabel:Y,ContextMenu:X,ContextSeparator:Z,CreateForm:tn,DatePicker:rn,DateRangePicker:nn,Description:sn,DocsCallout:on,DragHandle:ee,Dropdown:te,DropdownItem:ie,DropdownLabel:re,DropdownMenu:ne,DropdownSeparator:se,DropdownFooter:an,DropdownHeader:ln,Editable:dn,ErrorMessage:cn,EmptyStateItem:un,EmptyStateMenu:hn,Field:pn,Header:gn,Heading:fn,HoverCard:mn,Icon:E,Input:oe,InputGroup:yn,InputGroupAppend:In,InputGroupPrepend:vn,Label:Cn,Listing:_n,ListingCustomizeColumns:bn,ListingFilters:Sn,ListingHeaderCell:xn,ListingPagination:wn,ListingPresets:Pn,ListingPresetTrigger:Dn,ListingRowActions:Nn,ListingSearch:Tn,ListingTable:kn,ListingTableBody:An,ListingTableHead:Rn,ListingToggleAll:Un,LivePreview:En,LivePreviewPopout:Fn,MiddleEllipsis:On,Modal:Bn,ModalClose:Mn,ModalTitle:Ln,Pagination:$n,Panel:ae,PanelFooter:qn,PanelHeader:le,Popover:Hn,PublishComponents:zn,PublishContainer:Vn,publishContextKey:Kn,injectPublishContext:jn,PublishField:Gn,PublishFields:Qn,PublishFieldsProvider:Jn,PublishForm:Wn,PublishLocalizations:Yn,PublishSections:Xn,PublishTabs:Zn,Radio:es,RadioGroup:ts,Select:is,Separator:rs,Slider:ns,Skeleton:ss,SplitterGroup:os,SplitterPanel:as,SplitterResizeHandle:ls,StatusIndicator:de,Subheading:ds,Switch:cs,TabContent:us,Stack:hs,StackClose:ps,StackHeader:gs,StackFooter:fs,StackContent:ms,Table:ys,TableCell:Is,TableColumn:vs,TableColumns:Cs,TableRow:_s,TableRows:bs,TabList:Ss,TabProvider:xs,Tabs:ws,TabTrigger:Ps,Text:Ds,Textarea:Ns,TimePicker:Ts,ToggleGroup:ks,ToggleItem:As,Widget:Rs,registerIconSet:Us,registerIconSetFromStrings:Es}=__STATAMIC__.ui,ce=(e,t)=>{const i=e.__vccOpts||e;for(const[n,s]of t)i[n]=s;return i},ue="statamic.cp_tree.open_ids",he="statamic.cp_tree.pages",pe="statamic.cp_tree.filter_id",ge={name:"DropdownPageActionMenu",components:{DropdownItem:ie,DropdownLabel:re,DropdownMenu:ne,DropdownSeparator:se},props:{node:{type:Object,required:!0},childCreateItems:{type:Array,required:!0},canDuplicate:{type:Boolean,required:!0},canDelete:{type:Boolean,required:!0},canCut:{type:Boolean,required:!0},isCut:{type:Boolean,required:!0},isFiltered:{type:Boolean,required:!0},pasteActions:{type:Array,required:!0},visitUrl:{type:String,default:null}},emits:["duplicate","delete","copy-url","cut","paste","filter"],template:`
        <DropdownMenu>
            <DropdownItem text="Bearbeiten" icon="edit" :href="node.edit_url" />
            <DropdownItem
                v-if="canDuplicate"
                text="Duplizieren"
                icon="duplicate"
                @click="$emit('duplicate')"
            />

            <DropdownSeparator />
            <DropdownItem
                :text="isFiltered ? 'Filteransicht aufheben' : 'Filteransicht'"
                icon="filter"
                @click="$emit('filter')"
            />

            <DropdownSeparator v-if="canCut || isCut || pasteActions.length" />
            <DropdownItem
                v-if="isCut"
                text="Ausschneiden aufheben"
                icon="fullscreen-close"
                @click="$emit('cut')"
            />
            <DropdownItem
                v-else-if="canCut"
                text="Ausschneiden"
                icon="edit-scissors-cut"
                @click="$emit('cut')"
            />
            <DropdownLabel v-if="pasteActions.length" text="Einfügen" />
            <DropdownItem
                v-for="action in pasteActions"
                :key="action.position"
                :text="action.text"
                :icon="action.icon"
                @click="$emit('paste', action.position)"
            />

            <DropdownSeparator v-if="childCreateItems.length" />
            <DropdownLabel v-if="childCreateItems.length > 1" text="Neuer Untereintrag" />
            <DropdownItem
                v-for="item in childCreateItems"
                :key="item.handle"
                :text="item.text"
                :icon="item.icon"
                :href="item.href"
            />

            <DropdownSeparator v-if="visitUrl" />
            <DropdownItem v-if="visitUrl" text="Ansehen" icon="external-link" :href="visitUrl" target="_blank" />
            <DropdownItem v-if="visitUrl" text="URL kopieren" icon="clipboard" @click="$emit('copy-url')" />

            <DropdownSeparator v-if="canDelete" />
            <DropdownItem
                v-if="canDelete"
                text="Löschen"
                icon="trash"
                variant="destructive"
                @click="$emit('delete')"
            />
        </DropdownMenu>
    `},fe={name:"ContextPageActionMenu",components:{ContextItem:W,ContextLabel:Y,ContextMenu:X,ContextSeparator:Z},props:{node:{type:Object,required:!0},childCreateItems:{type:Array,required:!0},canDuplicate:{type:Boolean,required:!0},canDelete:{type:Boolean,required:!0},canCut:{type:Boolean,required:!0},isCut:{type:Boolean,required:!0},isFiltered:{type:Boolean,required:!0},pasteActions:{type:Array,required:!0},visitUrl:{type:String,default:null}},emits:["duplicate","delete","copy-url","cut","paste","filter"],template:`
        <ContextMenu>
            <ContextItem text="Bearbeiten" icon="edit" :href="node.edit_url" />
            <ContextItem
                v-if="canDuplicate"
                text="Duplizieren"
                icon="duplicate"
                @click="$emit('duplicate')"
            />

            <ContextSeparator />
            <ContextItem
                :text="isFiltered ? 'Filteransicht aufheben' : 'Filteransicht'"
                icon="filter"
                @click="$emit('filter')"
            />

            <ContextSeparator v-if="canCut || isCut || pasteActions.length" />
            <ContextItem
                v-if="isCut"
                text="Ausschneiden aufheben"
                icon="fullscreen-close"
                @click="$emit('cut')"
            />
            <ContextItem
                v-else-if="canCut"
                text="Ausschneiden"
                icon="edit-scissors-cut"
                @click="$emit('cut')"
            />
            <ContextLabel v-if="pasteActions.length" text="Einfügen" />
            <ContextItem
                v-for="action in pasteActions"
                :key="action.position"
                :text="action.text"
                :icon="action.icon"
                @click="$emit('paste', action.position)"
            />

            <ContextSeparator v-if="childCreateItems.length" />
            <ContextLabel v-if="childCreateItems.length > 1" text="Neuer Untereintrag" />
            <ContextItem
                v-for="item in childCreateItems"
                :key="item.handle"
                :text="item.text"
                :icon="item.icon"
                :href="item.href"
            />

            <ContextSeparator v-if="visitUrl" />
            <ContextItem v-if="visitUrl" text="Ansehen" icon="external-link" :href="visitUrl" target="_blank" />
            <ContextItem v-if="visitUrl" text="URL kopieren" icon="clipboard" @click="$emit('copy-url')" />

            <ContextSeparator v-if="canDelete" />
            <ContextItem
                v-if="canDelete"
                text="Löschen"
                icon="trash"
                variant="destructive"
                @click="$emit('delete')"
            />
        </ContextMenu>
    `},me={name:"TreeNode",components:{Button:U,Badge:G,Context:J,ContextPageActionMenu:fe,DragHandle:ee,DropdownPageActionMenu:ge,Dropdown:te,Icon:E,StatusIndicator:de},props:{node:{type:Object,required:!0},depth:{type:Number,required:!0},maxDepth:{type:Number,required:!0},blueprints:{type:Array,required:!0},createUrl:{type:String,required:!0},openIds:{type:Array,required:!0},editable:{type:Boolean,required:!0},entriesActionUrl:{type:String,required:!0},expectsRoot:{type:Boolean,required:!0},rootId:{type:String,default:null},draggingId:{type:String,default:null},cutNodeId:{type:String,default:null},filterNodeId:{type:String,default:null},dropTarget:{type:Object,default:null},allowedPastePosition:{type:Function,required:!0}},emits:["toggle","duplicate-node","delete-node","copy-node-url","cut-node","paste-node","filter-node","drag-start","drag-over","drag-end","drop-node","drop-clear"],computed:{hasChildren(){return Array.isArray(this.node.children)&&this.node.children.length>0},isOpen(){return this.openIds.includes(this.node.id)},statusLabel(){return this.node.status?this.node.status.charAt(0).toUpperCase()+this.node.status.slice(1):""},primaryBlueprint(){return this.blueprints[0]||null},canCreateChild(){return this.createUrl&&this.primaryBlueprint&&this.depth<this.maxDepth},childCreateItems(){return this.canCreateChild?this.blueprints.map(e=>({handle:e.handle,href:this.createChildUrl(e),icon:e.icon||"add-entry",text:this.blueprints.length>1?e.title:"Neuer Untereintrag"})):[]},pageTitle(){return this.node.title||this.node.entry_title||this.node.url},visitUrl(){return this.node.url?new URL(this.node.url,window.location.origin).href:null},canDrag(){return this.editable&&(!this.expectsRoot||this.node.id!==this.rootId)},canCut(){return this.canDrag},isCut(){return this.cutNodeId===this.node.id},isFiltered(){return this.filterNodeId===this.node.id},pasteActions(){return!this.cutNodeId||this.isCut?[]:[{position:"before",text:"Vorher einfügen",icon:"arrow-up"},{position:"after",text:"Nachher einfügen",icon:"arrow-down"},{position:"inside",text:"Als Unterpunkt einfügen",icon:"add-entry"}].filter(e=>this.allowedPastePosition(this.node.id,e.position))},canDuplicate(){return this.editable&&!!this.entriesActionUrl&&!!(this.node.entry||this.node.id)},canDelete(){return this.editable&&!!this.node.can_delete&&(!this.expectsRoot||this.node.id!==this.rootId)},isDragging(){return this.draggingId===this.node.id},isRootNode(){return this.expectsRoot&&this.node.id===this.rootId},dropPosition(){return this.dropTarget?.id===this.node.id?this.dropTarget.position:null},visibilityIndicators(){return[{key:"hide_navigation",active:!!this.node.hide_navigation,icon:"navigation",label:"In Navigation ausgeblendet"},{key:"search_hidden",active:!!this.node.search_hidden,icon:"magnifying-glass",label:"In Suche ausgeblendet"}].filter(e=>e.active)},customBadges(){return Array.isArray(this.node.badges)?this.node.badges.filter(e=>e?.label):[]}},methods:{toggle(){this.hasChildren&&this.$emit("toggle",this.node.id)},startDrag(e){if(!this.canDrag){e.preventDefault();return}e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain",this.node.id),this.$emit("drag-start",this.node.id)},dragOver(e){!this.draggingId||this.draggingId===this.node.id||(e.dataTransfer.dropEffect="move",this.$emit("drag-over",{id:this.node.id,position:this.resolveDropPosition(e)}))},drop(e){this.$emit("drop-node",{id:this.node.id,fallbackPosition:this.resolveDropPosition(e)})},createChildUrl(e){const t=this.createUrl.includes("?")?"&":"?";return`${this.createUrl}${t}blueprint=${e.handle}&parent=${this.node.id}`},resolveDropPosition(e){const t=e.currentTarget.getBoundingClientRect(),i=(e.clientY-t.top)/t.height;return this.isRootNode?i>.5?"after":null:i<.4?"before":i>.6?"after":"inside"}},template:`
        <li
            class="statamic-cp-tree__item"
            :class="{
                'statamic-cp-tree__item--open': isOpen,
                'statamic-cp-tree__item--leaf': !hasChildren,
                'statamic-cp-tree__item--dragging': isDragging,
                'statamic-cp-tree__item--cut': isCut,
                'statamic-cp-tree__item--search-match': node.search_match,
                'statamic-cp-tree__item--search-muted': node.search_muted,
                'statamic-cp-tree__item--drop-before': dropPosition === 'before',
                'statamic-cp-tree__item--drop-after': dropPosition === 'after',
                'statamic-cp-tree__item--drop-inside': dropPosition === 'inside',
            }"
            role="treeitem"
            :aria-expanded="hasChildren ? String(isOpen) : undefined"
            :style="{ '--tree-depth': depth }"
        >
            <button
                v-if="hasChildren"
                class="statamic-cp-tree__toggle"
                :class="{ 'is-open': isOpen }"
                type="button"
                :aria-label="isOpen ? 'Einklappen' : 'Ausklappen'"
                @click.stop="toggle"
            >
                <span class="statamic-cp-tree__toggle-label" aria-hidden="true"></span>
            </button>
            <span v-else class="statamic-cp-tree__spacer" aria-hidden="true"></span>

            <div
                class="statamic-cp-tree__row"
                @dragover.prevent="dragOver"
                @drop.prevent="drop"
                @dragleave="$emit('drop-clear')"
            >
                <Context side="bottom" align="start">
                    <template #trigger>
                        <a :href="node.edit_url" class="statamic-cp-tree__main-action">
                            <StatusIndicator :status="node.status || 'draft'" :show-label="false" />

                            <span class="statamic-cp-tree__title">
                                <Icon v-if="depth === 1 && node.slug === 'home'" name="home" class="statamic-cp-tree__home" aria-hidden="true" />
                                {{ pageTitle }}
                            </span>

                            <span v-if="node.collection" class="statamic-cp-tree__collection">
                                <Icon name="navigation" class="statamic-cp-tree__collection-icon" aria-hidden="true" />
                                {{ node.collection.title }}
                            </span>
                        </a>
                    </template>

                    <ContextPageActionMenu
                        :node="node"
                        :child-create-items="childCreateItems"
                        :can-duplicate="canDuplicate"
                        :can-delete="canDelete"
                        :can-cut="canCut"
                        :is-cut="isCut"
                        :is-filtered="isFiltered"
                        :paste-actions="pasteActions"
                        :visit-url="visitUrl"
                        @duplicate="$emit('duplicate-node', node)"
                        @delete="$emit('delete-node', node)"
                        @copy-url="$emit('copy-node-url', node)"
                        @cut="$emit('cut-node', node)"
                        @paste="$emit('paste-node', { targetId: node.id, position: $event })"
                        @filter="$emit('filter-node', node)"
                    />
                </Context>

                <Badge
                    v-for="badge in customBadges"
                    :key="badge.key"
                    class="statamic-cp-tree__badge"
                    size="sm"
                    :text="badge.label"
                    :color="badge.color"
                />

                <span
                    v-if="visibilityIndicators.length"
                    class="statamic-cp-tree__indicators"
                    aria-label="Sichtbarkeit"
                >
                    <span
                        v-for="indicator in visibilityIndicators"
                        :key="indicator.key"
                        class="statamic-cp-tree__indicator"
                        :class="'statamic-cp-tree__indicator--' + indicator.key"
                        :aria-label="indicator.label"
                        v-tooltip="indicator.label"
                    >
                        <Icon :name="indicator.icon" aria-hidden="true" />
                    </span>
                </span>

                <Dropdown side="bottom" align="end">
                    <template #trigger>
                        <Button
                            class="statamic-cp-tree__item-menu"
                            icon="dots"
                            icon-only
                            size="sm"
                            variant="ghost"
                            aria-label="Optionen öffnen"
                        />
                    </template>

                    <DropdownPageActionMenu
                        :node="node"
                        :child-create-items="childCreateItems"
                        :can-duplicate="canDuplicate"
                        :can-delete="canDelete"
                        :can-cut="canCut"
                        :is-cut="isCut"
                        :is-filtered="isFiltered"
                        :paste-actions="pasteActions"
                        :visit-url="visitUrl"
                        @duplicate="$emit('duplicate-node', node)"
                        @delete="$emit('delete-node', node)"
                        @copy-url="$emit('copy-node-url', node)"
                        @cut="$emit('cut-node', node)"
                        @paste="$emit('paste-node', { targetId: node.id, position: $event })"
                        @filter="$emit('filter-node', node)"
                    />
                </Dropdown>

                <DragHandle
                    v-if="canDrag"
                    class="statamic-cp-tree__drag"
                    draggable="true"
                    title="Verschieben"
                    @dragstart.stop="startDrag"
                    @dragend="$emit('drag-end')"
                />
            </div>

            <ul v-if="hasChildren && isOpen" class="statamic-cp-tree__children" role="group">
                <TreeNode
                    v-for="child in node.children"
                    :key="child.id"
                    :node="child"
                    :depth="depth + 1"
                    :max-depth="maxDepth"
                    :blueprints="blueprints"
                    :create-url="createUrl"
                    :open-ids="openIds"
                    :editable="editable"
                    :entries-action-url="entriesActionUrl"
                    :expects-root="expectsRoot"
                    :root-id="rootId"
                    :dragging-id="draggingId"
                    :cut-node-id="cutNodeId"
                    :filter-node-id="filterNodeId"
                    :drop-target="dropTarget"
                    :allowed-paste-position="allowedPastePosition"
                    @toggle="$emit('toggle', $event)"
                    @duplicate-node="$emit('duplicate-node', $event)"
                    @delete-node="$emit('delete-node', $event)"
                    @copy-node-url="$emit('copy-node-url', $event)"
                    @cut-node="$emit('cut-node', $event)"
                    @paste-node="$emit('paste-node', $event)"
                    @filter-node="$emit('filter-node', $event)"
                    @drag-start="$emit('drag-start', $event)"
                    @drag-over="$emit('drag-over', $event)"
                    @drag-end="$emit('drag-end')"
                    @drop-node="$emit('drop-node', $event)"
                    @drop-clear="$emit('drop-clear')"
                />
            </ul>
        </li>
    `},ye={components:{Button:U,ConfirmationModal:Q,Icon:E,Input:oe,Panel:ae,PanelHeader:le,TreeNode:me},props:{pageProps:{type:Object,required:!0},addonConfig:{type:Object,default:()=>({})}},data(){return{loading:!0,saving:!1,error:null,pages:[],initialPages:[],searchQuery:"",filterNodeId:null,openIds:[],hasStoredOpenIds:!1,pageAccessRestricted:!1,pageAccessCacheKey:"unknown",draggingId:null,cutNodeId:null,dropTarget:null,deletedEntries:[],nodePendingDelete:null,dirty:!1}},computed:{site(){return this.pageProps.initialSite},collectionHandle(){return this.pageProps.handle},pagesUrl(){return this.pageProps.structurePagesUrl},submitUrl(){return this.pageProps.structureSubmitUrl},createUrl(){return this.pageProps.createUrls?.[this.site]||""},entriesActionUrl(){return this.pageProps.entriesActionUrl||""},pagesFlagsUrl(){return this.addonConfig.flagsUrl?this.addonConfig.flagsUrl:`${String(Statamic.$config.get("cpRoot")||"/cp").replace(/\/$/,"")}/api/statamic-cp-tree/flags`},blueprints(){return this.pageProps.blueprints||[]},maxDepth(){return this.pageProps.structureMaxDepth||1/0},expectsRoot(){return!!this.pageProps.structureExpectsRoot},editable(){return!!this.pageProps.canEdit},treeEditable(){return this.editable&&!this.pageAccessRestricted},rootId(){return this.pages[0]?.id||null},normalizedSearchQuery(){return this.normalizeSearchText(this.searchQuery)},isSearching(){return this.normalizedSearchQuery.length>0},filterPath(){return this.filterNodeId?this.findNodePath(this.pages,this.filterNodeId):[]},filterRootPages(){if(!this.filterNodeId)return this.pages;const e=this.filterPath.at(-1)?.node;return e?[e]:this.pages},displayPages(){return this.isSearching?this.filterPagesForSearch(this.filterRootPages):this.filterRootPages},treeOpenIds(){if(this.filterNodeId&&!this.isSearching)return[...new Set([...this.openIds,this.filterNodeId])];if(!this.isSearching)return this.openIds;const e=[],t=i=>i.forEach(n=>{n.children?.length&&(e.push(n.id),t(n.children))});return t(this.displayPages),e},searchResultCount(){return this.isSearching?this.countSearchMatches(this.displayPages):0},searchAppendText(){return this.isSearching?String(this.searchResultCount):null},rootUrl(){const e=this.pages[0]?.url||"/";return new URL(e,window.location.origin).href},rootUrlLabel(){return this.rootUrl.replace(/^https?:\/\//,"").replace(/\/$/,"")},deleteConfirmationText(){if(!this.nodePendingDelete)return"";const e=this.collectDescendantIds(this.nodePendingDelete);return e.length?`Diese Seite und ${e.length} Untereintrag(e) löschen? Die Änderung wird erst mit dem Seitenbaum gespeichert.`:"Diese Seite löschen? Die Änderung wird erst mit dem Seitenbaum gespeichert."}},mounted(){this.load()},methods:{async load(){this.error=null,this.loading=!0;try{const e=await this.$axios.get(`${this.pagesFlagsUrl}?collection=${encodeURIComponent(this.collectionHandle)}&site=${this.site}`).catch(()=>({data:{flags:{},cache_key:"unknown"}}));this.pageAccessRestricted=!!e.data.restricted,this.pageAccessCacheKey=e.data.cache_key||"unknown";const t=this.restorePagesCache();t&&(this.applyLoadedPages(t),this.applyFilterNode(),this.applyOpenIds(),this.loading=!1);const i=await this.$axios.get(`${this.pagesUrl}?site=${this.site}`);this.pageAccessRestricted=!!(i.data.access_restricted||e.data.restricted);const n=this.pageAccessRestricted?this.filterPagesByAllowedIds(i.data.pages||[],e.data.allowed_ids||[]):i.data.pages||[];this.applyLoadedPages(this.mergePageFlags(n,e.data.flags||{})),this.persistPagesCache(),this.applyFilterNode(),this.applyOpenIds()}catch{this.error="Der Seitenbaum konnte nicht geladen werden."}finally{this.loading=!1}},applyLoadedPages(e){this.pages=e||[],this.initialPages=this.clonePages(this.pages),this.deletedEntries=[],this.dirty=!1,this.cutNodeId&&!this.findNode(this.pages,this.cutNodeId)&&(this.cutNodeId=null),this.filterNodeId&&!this.findNode(this.pages,this.filterNodeId)&&(this.filterNodeId=null,this.persistFilterNode())},mergePageFlags(e,t){return(e||[]).map(i=>{const n=i.entry||i.id,s=t[n]||t[i.id]||{};return{...i,hide_navigation:!!s.hide_navigation,search_hidden:!!s.search_hidden,badges:Array.isArray(s.badges)?s.badges:i.badges||[],children:this.mergePageFlags(i.children||[],t)}})},filterPagesByAllowedIds(e,t){const i=new Set(t||[]);return(e||[]).flatMap(n=>{const s=this.filterPagesByAllowedIds(n.children||[],t),r=n.entry||n.id;return i.has(r)?[{...n,children:s}]:s})},applyFilterNode(){const e=this.restoreFilterNode();e&&this.findNode(this.pages,e)&&(this.filterNodeId=e)},applyOpenIds(){const e=this.restoreOpenIds();e!==null?(this.openIds=this.filterExistingIds(e,this.pages),this.hasStoredOpenIds=!0):(this.openIds=this.defaultOpenIds(this.pages),this.hasStoredOpenIds=!1,this.persistOpenIds())},toggle(e){this.openIds=this.openIds.includes(e)?this.openIds.filter(t=>t!==e):[...this.openIds,e],this.persistOpenIds()},expandAll(){const e=[],t=i=>i.forEach(n=>{n.children?.length&&(e.push(n.id),t(n.children))});t(this.pages),this.openIds=e,this.persistOpenIds()},collapseAll(){this.openIds=[],this.persistOpenIds()},startDrag(e){this.draggingId=e},dragOver(e){if(!this.draggingId)return;const t=this.allowedDropPosition(this.draggingId,e.id,e.position);this.dropTarget=t?{id:e.id,position:t}:null,t==="inside"&&this.openDropTarget(e.id)},clearDropTarget(){this.dropTarget=null},finishDrag(){this.draggingId=null,this.dropTarget=null},cutNode(e){e?.id&&(this.cutNodeId=this.cutNodeId===e.id?null:e.id,this.dropTarget=null)},setFilterNode(e){e?.id&&(this.filterNodeId=e.id,this.cutNodeId=null,this.dropTarget=null,this.openIds=[...new Set([...this.openIds,e.id])],this.persistOpenIds(),this.persistFilterNode())},toggleFilterNode(e){if(this.filterNodeId===e?.id){this.clearNodeFilter();return}this.setFilterNode(e)},clearNodeFilter(){this.filterNodeId=null,this.dropTarget=null,this.persistFilterNode()},pasteNode(e){if(!this.cutNodeId||this.isSearching)return;const t=this.allowedDropPosition(this.cutNodeId,e.targetId,e.position);if(!t||!this.moveNode(this.cutNodeId,e.targetId,t)){this.$toast?.error?.(__("Something went wrong"));return}this.cutNodeId=null,this.dropTarget=null,this.dirty=!0},allowedPastePosition(e,t){return!!(!this.isSearching&&this.cutNodeId&&this.allowedDropPosition(this.cutNodeId,e,t))},dropNode(e){if(!this.draggingId||this.isSearching)return;const t=this.dropTarget?.id===e.id?this.dropTarget:{id:e.id,position:this.allowedDropPosition(this.draggingId,e.id,e.fallbackPosition)};if(!t.position||!this.moveNode(this.draggingId,t.id,t.position)){this.finishDrag();return}this.dirty=!0,this.finishDrag()},openDropTarget(e){!this.findNode(this.pages,e)?.node.children?.length||this.openIds.includes(e)||(this.openIds=[...this.openIds,e],this.persistOpenIds())},async duplicateNode(e){if(!(!this.entriesActionUrl||!(e.entry||e.id))&&!(this.dirty&&!window.confirm("Ungespeicherte Änderungen am Seitenbaum vorher verwerfen?"))){this.saving=!0;try{await this.$axios.post(this.entriesActionUrl,{action:"duplicate_entry",selections:[e.entry||e.id],context:{collection:this.pageProps.handle,view:"list"},values:{}}),this.$toast?.success?.("Eintrag dupliziert"),await this.load()}catch{this.$toast?.error?.(__("Something went wrong"))}finally{this.saving=!1}}},deleteNode(e){e.can_delete&&(this.nodePendingDelete=e)},confirmDeleteNode(){if(!this.nodePendingDelete)return;const e=this.clonePages(this.pages),t=this.removeNode(e,this.nodePendingDelete.id);if(!t){this.nodePendingDelete=null;return}this.deletedEntries=[...new Set([...this.deletedEntries,t.id,...this.collectDescendantIds(t)])],this.pages=e,this.openIds=this.filterExistingIds(this.openIds,this.pages),this.persistOpenIds(),this.nodePendingDelete=null,this.dirty=!0},async copyNodeUrl(e){if(e.url)try{await navigator.clipboard.writeText(new URL(e.url,window.location.origin).href),this.$toast?.success?.("URL kopiert")}catch{this.$toast?.error?.(__("Something went wrong"))}},allowedDropPosition(e,t,i){if(!i||e===t)return null;const n=this.findNode(this.pages,e),s=this.findNode(this.pages,t);if(!n||!s||this.containsNode(n.node,t)||this.expectsRoot&&s.node.id===this.rootId&&i!=="after")return null;const r=i==="inside"?s.depth+1:s.depth,a=this.subtreeDepth(n.node);return r+a-1>this.maxDepth?null:i},moveNode(e,t,i){const n=this.clonePages(this.pages),s=this.removeNode(n,e);if(!s)return!1;const r=this.findNode(n,t);return r?(i==="inside"?(r.node.children||=[],r.node.children.push(s),this.openIds=[...new Set([...this.openIds,r.node.id])]):r.siblings.splice(r.index+(i==="after"?1:0),0,s),this.pages=n,this.persistOpenIds(),!0):!1},async save(){if(!this.editable||!this.submitUrl||!this.dirty)return;this.saving=!0;const e={pages:this.cleanPagesForSubmission(this.pages),site:this.site,expectsRoot:this.expectsRoot,deletedEntries:this.deletedEntries,deleteLocalizationBehavior:this.pageProps.deleteLocalizationBehavior};Object.keys(e).forEach(t=>e[t]===void 0&&delete e[t]);try{if(!(await this.$axios.patch(this.submitUrl,e)).data.saved)throw new Error("not_saved");this.initialPages=this.clonePages(this.pages),this.deletedEntries=[],this.cutNodeId=null,this.dirty=!1,this.persistPagesCache(),this.$toast?.success?.(__("Saved"))}catch{this.$toast?.error?.(__("Something went wrong"))}finally{this.saving=!1}},discard(){this.pages=this.clonePages(this.initialPages),this.deletedEntries=[],this.cutNodeId=null,this.dirty=!1,this.finishDrag()},cleanPagesForSubmission(e){return e.map(t=>({id:t.id,children:this.cleanPagesForSubmission(t.children||[])}))},nodeLabel(e){return e.title||e.entry_title||e.url},filterPagesForSearch(e){return e.flatMap(t=>{const i=this.filterPagesForSearch(t.children||[]),n=this.nodeMatchesSearch(t);return!n&&!i.length?[]:[{...t,search_match:n,search_muted:!n,children:i}]})},nodeMatchesSearch(e){const t=[e.title,e.entry_title,e.url,e.slug,e.entry_blueprint?.title,e.collection?.title].filter(Boolean).join(" ");return this.normalizeSearchText(t).includes(this.normalizedSearchQuery)},countSearchMatches(e){return e.reduce((t,i)=>{const n=this.nodeMatchesSearch(i)?1:0;return t+n+this.countSearchMatches(i.children||[])},0)},normalizeSearchText(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim()},findNode(e,t,i=null,n=1){for(let s=0;s<e.length;s++){const r=e[s];if(r.id===t)return{node:r,parent:i,siblings:e,index:s,depth:n};const a=this.findNode(r.children||[],t,r,n+1);if(a)return a}return null},findNodePath(e,t,i=[]){for(const n of e){const s=[...i,{node:n}];if(n.id===t)return s;const r=this.findNodePath(n.children||[],t,s);if(r.length)return r}return[]},removeNode(e,t){const i=this.findNode(e,t);return i?i.siblings.splice(i.index,1)[0]:null},containsNode(e,t){return(e.children||[]).some(i=>i.id===t||this.containsNode(i,t))},collectDescendantIds(e){return(e.children||[]).flatMap(t=>[t.id,...this.collectDescendantIds(t)])},subtreeDepth(e){return e.children?.length?1+Math.max(...e.children.map(t=>this.subtreeDepth(t))):1},clonePages(e){return JSON.parse(JSON.stringify(e))},defaultOpenIds(e,t=1){return e.flatMap(i=>!i.children?.length||t>1?[]:[i.id,...this.defaultOpenIds(i.children,t+1)])},filterExistingIds(e,t){const i=new Set,n=s=>s.forEach(r=>{i.add(r.id),n(r.children||[])});return n(t),e.filter(s=>i.has(s))},storageKey(){return`${ue}.${this.collectionHandle}.${this.site||"default"}`},filterStorageKey(){return`${pe}.${this.collectionHandle}.${this.site||"default"}`},pagesCacheKey(){return`${he}.${this.collectionHandle}.${this.site||"default"}.${this.pageAccessCacheKey}`},restorePagesCache(){try{const e=window.sessionStorage.getItem(this.pagesCacheKey());return e?JSON.parse(e):null}catch{return null}},persistPagesCache(){try{window.sessionStorage.setItem(this.pagesCacheKey(),JSON.stringify(this.pages))}catch{}},restoreOpenIds(){try{const e=window.localStorage.getItem(this.storageKey());return e===null?null:JSON.parse(e)}catch{return null}},persistOpenIds(){window.localStorage.setItem(this.storageKey(),JSON.stringify(this.openIds))},restoreFilterNode(){try{return window.localStorage.getItem(this.filterStorageKey())}catch{return null}},persistFilterNode(){if(this.filterNodeId){window.localStorage.setItem(this.filterStorageKey(),this.filterNodeId);return}window.localStorage.removeItem(this.filterStorageKey())}}},Ie={class:"statamic-cp-tree__header-main"},ve={class:"statamic-cp-tree__tools"},Ce={key:0,class:"statamic-cp-tree__filter-breadcrumb"},_e={class:"statamic-cp-tree__filter-path"},be=["onClick"],Se={key:1,class:"statamic-cp-tree__state"},xe={key:2,class:"statamic-cp-tree__state statamic-cp-tree__state--error"},we={key:3,class:"statamic-cp-tree__state"},Pe={key:4,class:"statamic-cp-tree__list",role:"tree"};function De(e,t,i,n,s,r){const a=h("Button"),L=h("Input"),$=h("PanelHeader"),w=h("Icon"),q=h("TreeNode"),H=h("Panel"),z=h("ConfirmationModal");return o(),u(I,null,[c(H,{class:"statamic-cp-tree","aria-label":"Seitenbaum"},{default:k(()=>[c($,{class:"statamic-cp-tree__header"},{default:k(()=>[g("div",Ie,[c(a,{class:"statamic-cp-tree__root-url",href:r.rootUrl,target:"_blank",icon:"web",text:r.rootUrlLabel},null,8,["href","text"]),c(L,{class:"statamic-cp-tree__search",modelValue:s.searchQuery,"onUpdate:modelValue":t[0]||(t[0]=l=>s.searchQuery=l),"icon-prepend":"magnifying-glass",placeholder:"Suchen",clearable:"",append:r.searchAppendText},null,8,["modelValue","append"])]),g("div",ve,[s.dirty?(o(),v(a,{key:0,size:"sm",text:"Verwerfen",onClick:r.discard},null,8,["onClick"])):C("",!0),s.dirty?(o(),v(a,{key:1,size:"sm",variant:"primary",loading:s.saving,disabled:s.saving,text:s.saving?"Speichere...":"Änderungen speichern",onClick:r.save},null,8,["loading","disabled","text","onClick"])):C("",!0),c(a,{size:"sm",icon:"tree-collapse",text:"Alle schließen",onClick:r.collapseAll},null,8,["onClick"]),c(a,{size:"sm",icon:"tree-expand",text:"Alle öffnen",onClick:r.expandAll},null,8,["onClick"])])]),_:1}),r.filterPath.length?(o(),u("div",Ce,[g("div",_e,[c(w,{name:"filter",class:"statamic-cp-tree__filter-icon","aria-hidden":"true"}),g("button",{type:"button",class:"statamic-cp-tree__filter-link",onClick:t[1]||(t[1]=(...l)=>r.clearNodeFilter&&r.clearNodeFilter(...l))}," Alle Seiten "),c(w,{name:"chevron-right",class:"statamic-cp-tree__filter-separator","aria-hidden":"true"}),(o(!0),u(I,null,N(r.filterPath,(l,D)=>(o(),u(I,{key:l.node.id},[g("button",{type:"button",class:j(["statamic-cp-tree__filter-link",{"is-current":D===r.filterPath.length-1}]),onClick:$e=>r.setFilterNode(l.node)},T(r.nodeLabel(l.node)),11,be),D<r.filterPath.length-1?(o(),v(w,{key:0,name:"chevron-right",class:"statamic-cp-tree__filter-separator","aria-hidden":"true"})):C("",!0)],64))),128))]),c(a,{class:"statamic-cp-tree__filter-clear",size:"xs",variant:"ghost",icon:"x","icon-only":"","aria-label":"Filter zurücksetzen",onClick:r.clearNodeFilter},null,8,["onClick"])])):C("",!0),s.loading?(o(),u("div",Se,"Lade Seitenbaum...")):s.error?(o(),u("div",xe,T(s.error),1)):r.isSearching&&!r.displayPages.length?(o(),u("div",we,"Keine Treffer.")):(o(),u("ul",Pe,[(o(!0),u(I,null,N(r.displayPages,l=>(o(),v(q,{key:l.id,node:l,depth:1,"max-depth":r.maxDepth,blueprints:r.blueprints,"create-url":r.createUrl,"open-ids":r.treeOpenIds,editable:r.treeEditable&&!r.isSearching,"entries-action-url":r.entriesActionUrl,"expects-root":r.expectsRoot,"root-id":r.rootId,"dragging-id":s.draggingId,"cut-node-id":s.cutNodeId,"filter-node-id":s.filterNodeId,"drop-target":s.dropTarget,"allowed-paste-position":r.allowedPastePosition,onToggle:r.toggle,onDuplicateNode:r.duplicateNode,onDeleteNode:r.deleteNode,onCopyNodeUrl:r.copyNodeUrl,onCutNode:r.cutNode,onPasteNode:r.pasteNode,onFilterNode:r.toggleFilterNode,onDragStart:r.startDrag,onDragOver:r.dragOver,onDragEnd:r.finishDrag,onDropNode:r.dropNode,onDropClear:r.clearDropTarget},null,8,["node","max-depth","blueprints","create-url","open-ids","editable","entries-action-url","expects-root","root-id","dragging-id","cut-node-id","filter-node-id","drop-target","allowed-paste-position","onToggle","onDuplicateNode","onDeleteNode","onCopyNodeUrl","onCutNode","onPasteNode","onFilterNode","onDragStart","onDragOver","onDragEnd","onDropNode","onDropClear"]))),128))]))]),_:1}),c(z,{open:!!s.nodePendingDelete,title:"Seite löschen","body-text":r.deleteConfirmationText,"button-text":"Löschen",danger:"",onConfirm:r.confirmDeleteNode,onCancel:t[2]||(t[2]=l=>s.nodePendingDelete=null)},null,8,["open","body-text","onConfirm"])],64)}const Ne=ce(ye,[["render",De]]);let A=!1,d=null,p=null,m=null,y=null,b=!1,x=null;const _=new Map;function R(){A||(A=!0,Re(),document.addEventListener("inertia:navigate",()=>f(50)),document.addEventListener("inertia:finish",()=>f(50)),f(0),f(250),f(750))}function F(){return Statamic.$config.get("statamicCpTree")||{}}function Te(){return F().collections||[]}function O(e){return Te().includes(e)}function ke(){const e=String(Statamic.$config.get("cpRoot")||"/cp").replace(/^\/|\/$/g,""),t=window.location.pathname.split("/").filter(Boolean),i=t.indexOf(e);return i===-1?null:t[i+1]==="collections"&&t.length===i+3?t[i+2]:null}function P(){const e=ke();return e?O(e):!1}function Ae(){const e=P();if(document.documentElement.classList.toggle("statamic-cp-tree-view",e),e){Fe(),B();return}Oe(),S()}function Re(){const e=Statamic.$app?.config.globalProperties?.$axios;if(!e||e.get.__statamicCpTreeDedupe)return;const t=e.get.bind(e);e.get=(i,n)=>{if(!Ue(i))return t(i,n);const s=String(i);if(_.has(s))return _.get(s);const r=t(i,n).finally(()=>{_.delete(s)});return _.set(s,r),r},e.get.__statamicCpTreeDedupe=!0}function Ue(e){try{const t=String(Statamic.$config.get("cpRoot")||"/cp").replace(/^\/|\/$/g,""),i=new URL(e,window.location.origin).pathname.split("/").filter(Boolean),n=i.indexOf(t);return n!==-1&&i[n+1]==="collections"&&i[n+3]==="tree"}catch{return!1}}function Ee(){const e=document.getElementById("statamic"),t=JSON.parse(e?.dataset.page||"{}");return window.history.state?.page?.props||window.history.state?.props||t?.props||{}}function f(e=0){window.clearTimeout(x),x=window.setTimeout(Ae,e)}function Fe(){y||(y=new MutationObserver(()=>{b||(b=!0,requestAnimationFrame(()=>{b=!1,B()}))}),y.observe(document.body,{childList:!0,subtree:!0}))}function Oe(){y?.disconnect(),y=null,b=!1,window.clearTimeout(x),x=null}function B(){if(!P()){S();return}const e=Ee();if(!O(e.handle)||!e.structurePagesUrl){S();return}if(Be(e)!=="tree"){S();return}const i=document.querySelector(".page-tree")?.closest("[data-ui-panel]");if(d){M(i);return}const n=i||Me();n&&Le(n,e,i)}function Be(e){return Statamic.$preferences?.get?.(`collections.${e.handle}.view`)||"tree"}function Me(){const e=document.querySelector("[data-ui-header]");return!e||!e.parentElement?null:e.nextElementSibling||null}function M(e){!e||e===m||(e.hidden=!0,m=e)}function Le(e,t,i=null){d||!P()||(p=document.createElement("div"),p.className="statamic-cp-tree-mount",e.before(p),M(i),d=K(Ne,{pageProps:t,addonConfig:F()}),Object.assign(d._context.components,Statamic.$app._context.components),Object.assign(d._context.directives,Statamic.$app._context.directives),Object.assign(d._context.provides,Statamic.$app._context.provides),Object.assign(d.config.globalProperties,Statamic.$app.config.globalProperties),d.mount(p))}function S(){d&&(d.unmount(),d=null),p?.remove(),p=null,m&&(m.hidden=!1,m=null)}Statamic.$app?R():Statamic.booted(R);
