const ae=window.Vue,{BaseTransition:Ut,BaseTransitionPropsValidators:Ft,Comment:Mt,DeprecationTypes:Lt,EffectScope:Bt,ErrorCodes:Vt,ErrorTypeStrings:$t,Fragment:b,KeepAlive:qt,ReactiveEffect:zt,Static:Ht,Suspense:Kt,Teleport:jt,Text:Qt,TrackOpTypes:Gt,Transition:Jt,TransitionGroup:Wt,TriggerOpTypes:Yt,VueElement:Xt,__esModule:Zt,assertNumber:ei,callWithAsyncErrorHandling:ti,callWithErrorHandling:ii,camelize:ni,capitalize:ri,cloneVNode:si,compatUtils:ai,compile:oi,computed:li,createApp:oe,createBlock:y,createCommentVNode:f,createElementBlock:d,createElementVNode:h,createHydrationRenderer:di,createPropsRestProxy:ci,createRenderer:hi,createSSRApp:pi,createSlots:ui,createStaticVNode:gi,createTextVNode:V,createVNode:o,customRef:fi,defineAsyncComponent:mi,defineComponent:yi,defineCustomElement:_i,defineEmits:Si,defineExpose:Ii,defineModel:vi,defineOptions:Pi,defineProps:Ci,defineSSRCustomElement:bi,defineSlots:wi,devtools:xi,effect:ki,effectScope:Ti,getCurrentInstance:Ni,getCurrentScope:Di,getCurrentWatcher:Oi,getTransitionRawChildren:Ai,guardReactiveProps:Ri,h:Ei,handleError:Ui,hasInjectionContext:Fi,hydrate:Mi,hydrateOnIdle:Li,hydrateOnInteraction:Bi,hydrateOnMediaQuery:Vi,hydrateOnVisible:$i,initCustomFormatter:qi,initDirectivesForSSR:zi,inject:Hi,isMemoSame:Ki,isProxy:ji,isReactive:Qi,isReadonly:Gi,isRef:Ji,isRuntimeOnly:Wi,isShallow:Yi,isVNode:Xi,markRaw:Zi,mergeDefaults:en,mergeModels:tn,mergeProps:nn,nextTick:rn,nodeOps:sn,normalizeClass:le,normalizeProps:an,normalizeStyle:on,onActivated:ln,onBeforeMount:dn,onBeforeUnmount:cn,onBeforeUpdate:hn,onDeactivated:pn,onErrorCaptured:un,onMounted:gn,onRenderTracked:fn,onRenderTriggered:mn,onScopeDispose:yn,onServerPrefetch:_n,onUnmounted:Sn,onUpdated:In,onWatcherCleanup:vn,openBlock:a,patchProp:Pn,popScopeId:Cn,provide:bn,proxyRefs:wn,pushScopeId:xn,queuePostFlushCb:kn,reactive:Tn,readonly:Nn,ref:Dn,registerRuntimeCompiler:On,render:An,renderList:F,renderSlot:Rn,resolveComponent:l,resolveDirective:de,resolveDynamicComponent:En,resolveFilter:Un,resolveTransitionHooks:Fn,setBlockTracking:Mn,setDevtoolsHook:Ln,setTransitionHooks:Bn,shallowReactive:Vn,shallowReadonly:$n,shallowRef:qn,ssrContextKey:zn,ssrUtils:Hn,stop:Kn,toDisplayString:v,toHandlerKey:jn,toHandlers:Qn,toRaw:Gn,toRef:Jn,toRefs:Wn,toValue:Yn,transformVNodeArgs:Xn,triggerRef:Zn,unref:er,useAttrs:tr,useCssModule:ir,useCssVars:nr,useHost:rr,useId:sr,useModel:ar,useSSRContext:or,useShadowRoot:lr,useSlots:dr,useTemplateRef:cr,useTransitionState:hr,vModelCheckbox:pr,vModelDynamic:ur,vModelRadio:gr,vModelSelect:fr,vModelText:mr,vShow:yr,version:_r,warn:Sr,watch:Ir,watchEffect:vr,watchPostEffect:Pr,watchSyncEffect:Cr,withAsyncContext:br,withCtx:m,withDefaults:wr,withDirectives:ce,withKeys:xr,withMemo:kr,withModifiers:he,withScopeId:Tr}=ae,{Alert:Nr,AuthCard:Dr,Avatar:Or,Badge:pe,Button:M,ButtonGroup:Ar,Calendar:Rr,Card:Er,CardList:Ur,CardListItem:Fr,CardPanel:Mr,CharacterCounter:Lr,Checkbox:Br,CheckboxGroup:Vr,CodeEditor:$r,Combobox:qr,CommandPaletteItem:zr,ConfirmationModal:ue,Context:ge,ContextFooter:Hr,ContextHeader:Kr,ContextItem:fe,ContextLabel:me,ContextMenu:ye,ContextSeparator:_e,CreateForm:jr,DatePicker:Qr,DateRangePicker:Gr,Description:Jr,DocsCallout:Wr,DragHandle:Se,Dropdown:H,DropdownItem:K,DropdownLabel:Ie,DropdownMenu:j,DropdownSeparator:ve,DropdownFooter:Yr,DropdownHeader:Xr,Editable:Zr,ErrorMessage:es,EmptyStateItem:ts,EmptyStateMenu:is,Field:ns,Header:rs,Heading:ss,HoverCard:as,Icon:R,Input:Q,InputGroup:os,InputGroupAppend:ls,InputGroupPrepend:ds,Label:cs,Listing:hs,ListingCustomizeColumns:ps,ListingFilters:us,ListingHeaderCell:gs,ListingPagination:fs,ListingPresets:ms,ListingPresetTrigger:ys,ListingRowActions:_s,ListingSearch:Ss,ListingTable:Is,ListingTableBody:vs,ListingTableHead:Ps,ListingToggleAll:Cs,LivePreview:bs,LivePreviewPopout:ws,MiddleEllipsis:xs,Modal:ks,ModalClose:Ts,ModalTitle:Ns,Pagination:Ds,Panel:Pe,PanelFooter:Os,PanelHeader:Ce,Popover:As,PublishComponents:Rs,PublishContainer:Es,publishContextKey:Us,injectPublishContext:Fs,PublishField:Ms,PublishFields:Ls,PublishFieldsProvider:Bs,PublishForm:Vs,PublishLocalizations:$s,PublishSections:qs,PublishTabs:zs,Radio:be,RadioGroup:we,Select:xe,Separator:Hs,Slider:Ks,Skeleton:js,SplitterGroup:Qs,SplitterPanel:Gs,SplitterResizeHandle:Js,StatusIndicator:G,Subheading:Ws,Switch:Ys,TabContent:Xs,Stack:ke,StackClose:Zs,StackHeader:ea,StackFooter:Te,StackContent:Ne,Table:ta,TableCell:ia,TableColumn:na,TableColumns:ra,TableRow:sa,TableRows:aa,TabList:oa,TabProvider:la,Tabs:da,TabTrigger:ca,Text:ha,Textarea:pa,TimePicker:ua,ToggleGroup:ga,ToggleItem:fa,Widget:ma,registerIconSet:ya,registerIconSetFromStrings:_a}=__STATAMIC__.ui,J=(e,t)=>{const i=e.__vccOpts||e;for(const[s,r]of t)i[s]=r;return i},De="statamic.cp_tree.open_ids",Oe="statamic.cp_tree.pages",Ae="statamic.cp_tree.filter_id",Re={name:"DropdownPageActionMenu",components:{DropdownItem:K,DropdownLabel:Ie,DropdownMenu:j,DropdownSeparator:ve},props:{node:{type:Object,required:!0},childCreateItems:{type:Array,required:!0},canDuplicate:{type:Boolean,required:!0},canDelete:{type:Boolean,required:!0},canCut:{type:Boolean,required:!0},isCut:{type:Boolean,required:!0},isFiltered:{type:Boolean,required:!0},pasteActions:{type:Array,required:!0},visitUrl:{type:String,default:null}},emits:["duplicate","delete","copy-url","cut","paste","filter"],template:`
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
    `},Ee={name:"ContextPageActionMenu",components:{ContextItem:fe,ContextLabel:me,ContextMenu:ye,ContextSeparator:_e},props:{node:{type:Object,required:!0},childCreateItems:{type:Array,required:!0},canDuplicate:{type:Boolean,required:!0},canDelete:{type:Boolean,required:!0},canCut:{type:Boolean,required:!0},isCut:{type:Boolean,required:!0},isFiltered:{type:Boolean,required:!0},pasteActions:{type:Array,required:!0},visitUrl:{type:String,default:null}},emits:["duplicate","delete","copy-url","cut","paste","filter"],template:`
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
    `},Ue={name:"TreeNode",components:{Button:M,Badge:pe,Context:ge,ContextPageActionMenu:Ee,DragHandle:Se,DropdownPageActionMenu:Re,Dropdown:H,Icon:R,StatusIndicator:G},props:{node:{type:Object,required:!0},depth:{type:Number,required:!0},maxDepth:{type:Number,required:!0},blueprints:{type:Array,required:!0},createUrl:{type:String,required:!0},openIds:{type:Array,required:!0},editable:{type:Boolean,required:!0},entriesActionUrl:{type:String,required:!0},expectsRoot:{type:Boolean,required:!0},rootId:{type:String,default:null},draggingId:{type:String,default:null},cutNodeId:{type:String,default:null},filterNodeId:{type:String,default:null},dropTarget:{type:Object,default:null},allowedPastePosition:{type:Function,required:!0}},emits:["toggle","duplicate-node","delete-node","copy-node-url","cut-node","paste-node","filter-node","drag-start","drag-over","drag-end","drop-node","drop-clear"],computed:{hasChildren(){return Array.isArray(this.node.children)&&this.node.children.length>0},isOpen(){return this.openIds.includes(this.node.id)},statusLabel(){return this.node.status?this.node.status.charAt(0).toUpperCase()+this.node.status.slice(1):""},primaryBlueprint(){return this.blueprints[0]||null},canCreateChild(){return this.createUrl&&this.primaryBlueprint&&this.depth<this.maxDepth},childCreateItems(){return this.canCreateChild?this.blueprints.map(e=>({handle:e.handle,href:this.createChildUrl(e),icon:e.icon||"add-entry",text:this.blueprints.length>1?e.title:"Neuer Untereintrag"})):[]},pageTitle(){return this.node.title||this.node.entry_title||this.node.url},visitUrl(){return this.node.url?new URL(this.node.url,window.location.origin).href:null},canDrag(){return this.editable&&(!this.expectsRoot||this.node.id!==this.rootId)},canCut(){return this.canDrag},isCut(){return this.cutNodeId===this.node.id},isFiltered(){return this.filterNodeId===this.node.id},pasteActions(){return!this.cutNodeId||this.isCut?[]:[{position:"before",text:"Vorher einfügen",icon:"arrow-up"},{position:"after",text:"Nachher einfügen",icon:"arrow-down"},{position:"inside",text:"Als Unterpunkt einfügen",icon:"add-entry"}].filter(e=>this.allowedPastePosition(this.node.id,e.position))},canDuplicate(){return this.editable&&!!this.entriesActionUrl&&!!(this.node.entry||this.node.id)},canDelete(){return this.editable&&!!this.node.can_delete&&(!this.expectsRoot||this.node.id!==this.rootId)},isDragging(){return this.draggingId===this.node.id},isRootNode(){return this.expectsRoot&&this.node.id===this.rootId},dropPosition(){return this.dropTarget?.id===this.node.id?this.dropTarget.position:null},visibilityIndicators(){return[{key:"hide_navigation",active:!!this.node.hide_navigation,icon:"navigation",label:"In Navigation ausgeblendet"},{key:"search_hidden",active:!!this.node.search_hidden,icon:"magnifying-glass",label:"In Suche ausgeblendet"}].filter(e=>e.active)},customBadges(){return Array.isArray(this.node.badges)?this.node.badges.filter(e=>e?.label):[]}},methods:{toggle(){this.hasChildren&&this.$emit("toggle",this.node.id)},startDrag(e){if(!this.canDrag){e.preventDefault();return}e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain",this.node.id),this.$emit("drag-start",this.node.id)},dragOver(e){!this.draggingId||this.draggingId===this.node.id||(e.dataTransfer.dropEffect="move",this.$emit("drag-over",{id:this.node.id,position:this.resolveDropPosition(e)}))},drop(e){this.$emit("drop-node",{id:this.node.id,fallbackPosition:this.resolveDropPosition(e)})},createChildUrl(e){const t=this.createUrl.includes("?")?"&":"?";return`${this.createUrl}${t}blueprint=${e.handle}&parent=${this.node.id}`},resolveDropPosition(e){const t=e.currentTarget.getBoundingClientRect(),i=(e.clientY-t.top)/t.height;return this.isRootNode?i>.5?"after":null:i<.4?"before":i>.6?"after":"inside"}},template:`
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
    `},Fe={components:{Button:M,ConfirmationModal:ue,Icon:R,Input:Q,Panel:Pe,PanelHeader:Ce,TreeNode:Ue},props:{pageProps:{type:Object,required:!0},addonConfig:{type:Object,default:()=>({})}},data(){return{loading:!0,saving:!1,error:null,pages:[],initialPages:[],searchQuery:"",filterNodeId:null,openIds:[],hasStoredOpenIds:!1,pageAccessRestricted:!1,pageAccessCacheKey:"unknown",draggingId:null,cutNodeId:null,dropTarget:null,deletedEntries:[],nodePendingDelete:null,dirty:!1}},computed:{site(){return this.pageProps.initialSite},collectionHandle(){return this.pageProps.handle},hideRootUrl(){return(this.addonConfig.hideRootUrlCollections||[]).includes(this.collectionHandle)},pagesUrl(){return this.pageProps.structurePagesUrl},submitUrl(){return this.pageProps.structureSubmitUrl},createUrl(){return this.pageProps.createUrls?.[this.site]||""},entriesActionUrl(){return this.pageProps.entriesActionUrl||""},pagesFlagsUrl(){return this.addonConfig.flagsUrl?this.addonConfig.flagsUrl:`${String(Statamic.$config.get("cpRoot")||"/cp").replace(/\/$/,"")}/api/statamic-cp-tree/flags`},blueprints(){return this.pageProps.blueprints||[]},maxDepth(){return this.pageProps.structureMaxDepth||1/0},expectsRoot(){return!!this.pageProps.structureExpectsRoot},editable(){return!!this.pageProps.canEdit},treeEditable(){return this.editable&&!this.pageAccessRestricted},rootId(){return this.pages[0]?.id||null},normalizedSearchQuery(){return this.normalizeSearchText(this.searchQuery)},isSearching(){return this.normalizedSearchQuery.length>0},filterPath(){return this.filterNodeId?this.findNodePath(this.pages,this.filterNodeId):[]},filterRootPages(){if(!this.filterNodeId)return this.pages;const e=this.filterPath.at(-1)?.node;return e?[e]:this.pages},displayPages(){return this.isSearching?this.filterPagesForSearch(this.filterRootPages):this.filterRootPages},treeOpenIds(){if(this.filterNodeId&&!this.isSearching)return[...new Set([...this.openIds,this.filterNodeId])];if(!this.isSearching)return this.openIds;const e=[],t=i=>i.forEach(s=>{s.children?.length&&(e.push(s.id),t(s.children))});return t(this.displayPages),e},searchResultCount(){return this.isSearching?this.countSearchMatches(this.displayPages):0},searchAppendText(){return this.isSearching?String(this.searchResultCount):null},rootUrl(){const e=this.pages[0]?.url||"/";return new URL(e,window.location.origin).href},rootUrlLabel(){return this.rootUrl.replace(/^https?:\/\//,"").replace(/\/$/,"")},deleteConfirmationText(){if(!this.nodePendingDelete)return"";const e=this.collectDescendantIds(this.nodePendingDelete);return e.length?`Diese Seite und ${e.length} Untereintrag(e) löschen? Die Änderung wird erst mit dem Seitenbaum gespeichert.`:"Diese Seite löschen? Die Änderung wird erst mit dem Seitenbaum gespeichert."}},mounted(){this.load()},methods:{async load(){this.error=null,this.loading=!0;try{const e=await this.$axios.get(`${this.pagesFlagsUrl}?collection=${encodeURIComponent(this.collectionHandle)}&site=${this.site}`).catch(()=>({data:{flags:{},cache_key:"unknown"}}));this.pageAccessRestricted=!!e.data.restricted,this.pageAccessCacheKey=e.data.cache_key||"unknown";const t=this.restorePagesCache();t&&(this.applyLoadedPages(t),this.applyFilterNode(),this.applyOpenIds(),this.loading=!1);const i=await this.$axios.get(`${this.pagesUrl}?site=${this.site}`);this.pageAccessRestricted=!!(i.data.access_restricted||e.data.restricted);const s=this.pageAccessRestricted?this.filterPagesByAllowedIds(i.data.pages||[],e.data.allowed_ids||[]):i.data.pages||[];this.applyLoadedPages(this.mergePageFlags(s,e.data.flags||{})),this.persistPagesCache(),this.applyFilterNode(),this.applyOpenIds()}catch{this.error="Der Seitenbaum konnte nicht geladen werden."}finally{this.loading=!1}},applyLoadedPages(e){this.pages=e||[],this.initialPages=this.clonePages(this.pages),this.deletedEntries=[],this.dirty=!1,this.cutNodeId&&!this.findNode(this.pages,this.cutNodeId)&&(this.cutNodeId=null),this.filterNodeId&&!this.findNode(this.pages,this.filterNodeId)&&(this.filterNodeId=null,this.persistFilterNode())},mergePageFlags(e,t){return(e||[]).map(i=>{const s=i.entry||i.id,r=t[s]||t[i.id]||{};return{...i,hide_navigation:!!r.hide_navigation,search_hidden:!!r.search_hidden,badges:Array.isArray(r.badges)?r.badges:i.badges||[],children:this.mergePageFlags(i.children||[],t)}})},filterPagesByAllowedIds(e,t){const i=new Set(t||[]);return(e||[]).flatMap(s=>{const r=this.filterPagesByAllowedIds(s.children||[],t),n=s.entry||s.id;return i.has(n)?[{...s,children:r}]:r})},applyFilterNode(){const e=this.restoreFilterNode();e&&this.findNode(this.pages,e)&&(this.filterNodeId=e)},applyOpenIds(){const e=this.restoreOpenIds();e!==null?(this.openIds=this.filterExistingIds(e,this.pages),this.hasStoredOpenIds=!0):(this.openIds=this.defaultOpenIds(this.pages),this.hasStoredOpenIds=!1,this.persistOpenIds())},toggle(e){this.openIds=this.openIds.includes(e)?this.openIds.filter(t=>t!==e):[...this.openIds,e],this.persistOpenIds()},expandAll(){const e=[],t=i=>i.forEach(s=>{s.children?.length&&(e.push(s.id),t(s.children))});t(this.pages),this.openIds=e,this.persistOpenIds()},collapseAll(){this.openIds=[],this.persistOpenIds()},startDrag(e){this.draggingId=e},dragOver(e){if(!this.draggingId)return;const t=this.allowedDropPosition(this.draggingId,e.id,e.position);this.dropTarget=t?{id:e.id,position:t}:null,t==="inside"&&this.openDropTarget(e.id)},clearDropTarget(){this.dropTarget=null},finishDrag(){this.draggingId=null,this.dropTarget=null},cutNode(e){e?.id&&(this.cutNodeId=this.cutNodeId===e.id?null:e.id,this.dropTarget=null)},setFilterNode(e){e?.id&&(this.filterNodeId=e.id,this.cutNodeId=null,this.dropTarget=null,this.openIds=[...new Set([...this.openIds,e.id])],this.persistOpenIds(),this.persistFilterNode())},toggleFilterNode(e){if(this.filterNodeId===e?.id){this.clearNodeFilter();return}this.setFilterNode(e)},clearNodeFilter(){this.filterNodeId=null,this.dropTarget=null,this.persistFilterNode()},pasteNode(e){if(!this.cutNodeId||this.isSearching)return;const t=this.allowedDropPosition(this.cutNodeId,e.targetId,e.position);if(!t||!this.moveNode(this.cutNodeId,e.targetId,t)){this.$toast?.error?.(__("Something went wrong"));return}this.cutNodeId=null,this.dropTarget=null,this.dirty=!0},allowedPastePosition(e,t){return!!(!this.isSearching&&this.cutNodeId&&this.allowedDropPosition(this.cutNodeId,e,t))},dropNode(e){if(!this.draggingId||this.isSearching)return;const t=this.dropTarget?.id===e.id?this.dropTarget:{id:e.id,position:this.allowedDropPosition(this.draggingId,e.id,e.fallbackPosition)};if(!t.position||!this.moveNode(this.draggingId,t.id,t.position)){this.finishDrag();return}this.dirty=!0,this.finishDrag()},openDropTarget(e){!this.findNode(this.pages,e)?.node.children?.length||this.openIds.includes(e)||(this.openIds=[...this.openIds,e],this.persistOpenIds())},async duplicateNode(e){if(!(!this.entriesActionUrl||!(e.entry||e.id))&&!(this.dirty&&!window.confirm("Ungespeicherte Änderungen am Seitenbaum vorher verwerfen?"))){this.saving=!0;try{await this.$axios.post(this.entriesActionUrl,{action:"duplicate_entry",selections:[e.entry||e.id],context:{collection:this.pageProps.handle,view:"list"},values:{}}),this.$toast?.success?.("Eintrag dupliziert"),await this.load()}catch{this.$toast?.error?.(__("Something went wrong"))}finally{this.saving=!1}}},deleteNode(e){e.can_delete&&(this.nodePendingDelete=e)},confirmDeleteNode(){if(!this.nodePendingDelete)return;const e=this.clonePages(this.pages),t=this.removeNode(e,this.nodePendingDelete.id);if(!t){this.nodePendingDelete=null;return}this.deletedEntries=[...new Set([...this.deletedEntries,t.id,...this.collectDescendantIds(t)])],this.pages=e,this.openIds=this.filterExistingIds(this.openIds,this.pages),this.persistOpenIds(),this.nodePendingDelete=null,this.dirty=!0},async copyNodeUrl(e){if(e.url)try{await navigator.clipboard.writeText(new URL(e.url,window.location.origin).href),this.$toast?.success?.("URL kopiert")}catch{this.$toast?.error?.(__("Something went wrong"))}},allowedDropPosition(e,t,i){if(!i||e===t)return null;const s=this.findNode(this.pages,e),r=this.findNode(this.pages,t);if(!s||!r||this.containsNode(s.node,t)||this.expectsRoot&&r.node.id===this.rootId&&i!=="after")return null;const n=i==="inside"?r.depth+1:r.depth,u=this.subtreeDepth(s.node);return n+u-1>this.maxDepth?null:i},moveNode(e,t,i){const s=this.clonePages(this.pages),r=this.removeNode(s,e);if(!r)return!1;const n=this.findNode(s,t);return n?(i==="inside"?(n.node.children||=[],n.node.children.push(r),this.openIds=[...new Set([...this.openIds,n.node.id])]):n.siblings.splice(n.index+(i==="after"?1:0),0,r),this.pages=s,this.persistOpenIds(),!0):!1},async save(){if(!this.editable||!this.submitUrl||!this.dirty)return;this.saving=!0;const e={pages:this.cleanPagesForSubmission(this.pages),site:this.site,expectsRoot:this.expectsRoot,deletedEntries:this.deletedEntries,deleteLocalizationBehavior:this.pageProps.deleteLocalizationBehavior};Object.keys(e).forEach(t=>e[t]===void 0&&delete e[t]);try{if(!(await this.$axios.patch(this.submitUrl,e)).data.saved)throw new Error("not_saved");this.initialPages=this.clonePages(this.pages),this.deletedEntries=[],this.cutNodeId=null,this.dirty=!1,this.persistPagesCache(),this.$toast?.success?.(__("Saved"))}catch{this.$toast?.error?.(__("Something went wrong"))}finally{this.saving=!1}},discard(){this.pages=this.clonePages(this.initialPages),this.deletedEntries=[],this.cutNodeId=null,this.dirty=!1,this.finishDrag()},cleanPagesForSubmission(e){return e.map(t=>({id:t.id,children:this.cleanPagesForSubmission(t.children||[])}))},nodeLabel(e){return e.title||e.entry_title||e.url},filterPagesForSearch(e){return e.flatMap(t=>{const i=this.filterPagesForSearch(t.children||[]),s=this.nodeMatchesSearch(t);return!s&&!i.length?[]:[{...t,search_match:s,search_muted:!s,children:i}]})},nodeMatchesSearch(e){const t=[e.title,e.entry_title,e.url,e.slug,e.entry_blueprint?.title,e.collection?.title].filter(Boolean).join(" ");return this.normalizeSearchText(t).includes(this.normalizedSearchQuery)},countSearchMatches(e){return e.reduce((t,i)=>{const s=this.nodeMatchesSearch(i)?1:0;return t+s+this.countSearchMatches(i.children||[])},0)},normalizeSearchText(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim()},findNode(e,t,i=null,s=1){for(let r=0;r<e.length;r++){const n=e[r];if(n.id===t)return{node:n,parent:i,siblings:e,index:r,depth:s};const u=this.findNode(n.children||[],t,n,s+1);if(u)return u}return null},findNodePath(e,t,i=[]){for(const s of e){const r=[...i,{node:s}];if(s.id===t)return r;const n=this.findNodePath(s.children||[],t,r);if(n.length)return n}return[]},removeNode(e,t){const i=this.findNode(e,t);return i?i.siblings.splice(i.index,1)[0]:null},containsNode(e,t){return(e.children||[]).some(i=>i.id===t||this.containsNode(i,t))},collectDescendantIds(e){return(e.children||[]).flatMap(t=>[t.id,...this.collectDescendantIds(t)])},subtreeDepth(e){return e.children?.length?1+Math.max(...e.children.map(t=>this.subtreeDepth(t))):1},clonePages(e){return JSON.parse(JSON.stringify(e))},defaultOpenIds(e,t=1){return e.flatMap(i=>!i.children?.length||t>1?[]:[i.id,...this.defaultOpenIds(i.children,t+1)])},filterExistingIds(e,t){const i=new Set,s=r=>r.forEach(n=>{i.add(n.id),s(n.children||[])});return s(t),e.filter(r=>i.has(r))},storageKey(){return`${De}.${this.collectionHandle}.${this.site||"default"}`},filterStorageKey(){return`${Ae}.${this.collectionHandle}.${this.site||"default"}`},pagesCacheKey(){return`${Oe}.${this.collectionHandle}.${this.site||"default"}.${this.pageAccessCacheKey}`},restorePagesCache(){try{const e=window.sessionStorage.getItem(this.pagesCacheKey());return e?JSON.parse(e):null}catch{return null}},persistPagesCache(){try{window.sessionStorage.setItem(this.pagesCacheKey(),JSON.stringify(this.pages))}catch{}},restoreOpenIds(){try{const e=window.localStorage.getItem(this.storageKey());return e===null?null:JSON.parse(e)}catch{return null}},persistOpenIds(){window.localStorage.setItem(this.storageKey(),JSON.stringify(this.openIds))},restoreFilterNode(){try{return window.localStorage.getItem(this.filterStorageKey())}catch{return null}},persistFilterNode(){if(this.filterNodeId){window.localStorage.setItem(this.filterStorageKey(),this.filterNodeId);return}window.localStorage.removeItem(this.filterStorageKey())}}},Me={class:"statamic-cp-tree__header-main"},Le={class:"statamic-cp-tree__tools"},Be={key:0,class:"statamic-cp-tree__filter-breadcrumb"},Ve={class:"statamic-cp-tree__filter-path"},$e=["onClick"],qe={key:1,class:"statamic-cp-tree__state"},ze={key:2,class:"statamic-cp-tree__state statamic-cp-tree__state--error"},He={key:3,class:"statamic-cp-tree__state"},Ke={key:4,class:"statamic-cp-tree__list",role:"tree"};function je(e,t,i,s,r,n){const u=l("Button"),x=l("Input"),E=l("PanelHeader"),P=l("Icon"),U=l("TreeNode"),I=l("Panel"),k=l("ConfirmationModal");return a(),d(b,null,[o(I,{class:"statamic-cp-tree","aria-label":"Seitenbaum"},{default:m(()=>[o(E,{class:"statamic-cp-tree__header"},{default:m(()=>[h("div",Me,[n.hideRootUrl?f("",!0):(a(),y(u,{key:0,class:"statamic-cp-tree__root-url",href:n.rootUrl,target:"_blank",icon:"web",text:n.rootUrlLabel},null,8,["href","text"])),o(x,{class:"statamic-cp-tree__search",modelValue:r.searchQuery,"onUpdate:modelValue":t[0]||(t[0]=g=>r.searchQuery=g),"icon-prepend":"magnifying-glass",placeholder:"Suchen",clearable:"",append:n.searchAppendText},null,8,["modelValue","append"])]),h("div",Le,[r.dirty?(a(),y(u,{key:0,size:"sm",text:"Verwerfen",onClick:n.discard},null,8,["onClick"])):f("",!0),r.dirty?(a(),y(u,{key:1,size:"sm",variant:"primary",loading:r.saving,disabled:r.saving,text:r.saving?"Speichere...":"Änderungen speichern",onClick:n.save},null,8,["loading","disabled","text","onClick"])):f("",!0),o(u,{size:"sm",icon:"tree-collapse",text:"Alle schließen",onClick:n.collapseAll},null,8,["onClick"]),o(u,{size:"sm",icon:"tree-expand",text:"Alle öffnen",onClick:n.expandAll},null,8,["onClick"])])]),_:1}),n.filterPath.length?(a(),d("div",Be,[h("div",Ve,[o(P,{name:"filter",class:"statamic-cp-tree__filter-icon","aria-hidden":"true"}),h("button",{type:"button",class:"statamic-cp-tree__filter-link",onClick:t[1]||(t[1]=(...g)=>n.clearNodeFilter&&n.clearNodeFilter(...g))}," Alle Seiten "),o(P,{name:"chevron-right",class:"statamic-cp-tree__filter-separator","aria-hidden":"true"}),(a(!0),d(b,null,F(n.filterPath,(g,T)=>(a(),d(b,{key:g.node.id},[h("button",{type:"button",class:le(["statamic-cp-tree__filter-link",{"is-current":T===n.filterPath.length-1}]),onClick:B=>n.setFilterNode(g.node)},v(n.nodeLabel(g.node)),11,$e),T<n.filterPath.length-1?(a(),y(P,{key:0,name:"chevron-right",class:"statamic-cp-tree__filter-separator","aria-hidden":"true"})):f("",!0)],64))),128))]),o(u,{class:"statamic-cp-tree__filter-clear",size:"xs",variant:"ghost",icon:"x","icon-only":"","aria-label":"Filter zurücksetzen",onClick:n.clearNodeFilter},null,8,["onClick"])])):f("",!0),r.loading?(a(),d("div",qe,"Lade Seitenbaum...")):r.error?(a(),d("div",ze,v(r.error),1)):n.isSearching&&!n.displayPages.length?(a(),d("div",He,"Keine Treffer.")):(a(),d("ul",Ke,[(a(!0),d(b,null,F(n.displayPages,g=>(a(),y(U,{key:g.id,node:g,depth:1,"max-depth":n.maxDepth,blueprints:n.blueprints,"create-url":n.createUrl,"open-ids":n.treeOpenIds,editable:n.treeEditable&&!n.isSearching,"entries-action-url":n.entriesActionUrl,"expects-root":n.expectsRoot,"root-id":n.rootId,"dragging-id":r.draggingId,"cut-node-id":r.cutNodeId,"filter-node-id":r.filterNodeId,"drop-target":r.dropTarget,"allowed-paste-position":n.allowedPastePosition,onToggle:n.toggle,onDuplicateNode:n.duplicateNode,onDeleteNode:n.deleteNode,onCopyNodeUrl:n.copyNodeUrl,onCutNode:n.cutNode,onPasteNode:n.pasteNode,onFilterNode:n.toggleFilterNode,onDragStart:n.startDrag,onDragOver:n.dragOver,onDragEnd:n.finishDrag,onDropNode:n.dropNode,onDropClear:n.clearDropTarget},null,8,["node","max-depth","blueprints","create-url","open-ids","editable","entries-action-url","expects-root","root-id","dragging-id","cut-node-id","filter-node-id","drop-target","allowed-paste-position","onToggle","onDuplicateNode","onDeleteNode","onCopyNodeUrl","onCutNode","onPasteNode","onFilterNode","onDragStart","onDragOver","onDragEnd","onDropNode","onDropClear"]))),128))]))]),_:1}),o(k,{open:!!r.nodePendingDelete,title:"Seite löschen","body-text":n.deleteConfirmationText,"button-text":"Löschen",danger:"",onConfirm:n.confirmDeleteNode,onCancel:t[2]||(t[2]=g=>r.nodePendingDelete=null)},null,8,["open","body-text","onConfirm"])],64)}const Qe=J(Fe,[["render",je]]);let $=!1,p=null,_=null,S=null,w=null,D=!1,A=null;const N=new Map;function Ge(){$||($=!0,Xe(),document.addEventListener("inertia:navigate",()=>C(50)),document.addEventListener("inertia:finish",()=>C(50)),C(0),C(250),C(750))}function W(){return Statamic.$config.get("statamicCpTree")||{}}function Je(){return W().collections||[]}function Y(e){return Je().includes(e)}function We(){const e=String(Statamic.$config.get("cpRoot")||"/cp").replace(/^\/|\/$/g,""),t=window.location.pathname.split("/").filter(Boolean),i=t.indexOf(e);return i===-1?null:t[i+1]==="collections"&&t.length===i+3?t[i+2]:null}function L(){const e=We();return e?Y(e):!1}function Ye(){const e=L();if(document.documentElement.classList.toggle("statamic-cp-tree-view",e),e){tt(),X();return}it(),O()}function Xe(){const e=Statamic.$app?.config.globalProperties?.$axios;if(!e||e.get.__statamicCpTreeDedupe)return;const t=e.get.bind(e);e.get=(i,s)=>{if(!Ze(i))return t(i,s);const r=String(i);if(N.has(r))return N.get(r);const n=t(i,s).finally(()=>{N.delete(r)});return N.set(r,n),n},e.get.__statamicCpTreeDedupe=!0}function Ze(e){try{const t=String(Statamic.$config.get("cpRoot")||"/cp").replace(/^\/|\/$/g,""),i=new URL(e,window.location.origin).pathname.split("/").filter(Boolean),s=i.indexOf(t);return s!==-1&&i[s+1]==="collections"&&i[s+3]==="tree"}catch{return!1}}function et(){const e=document.getElementById("statamic"),t=JSON.parse(e?.dataset.page||"{}");return window.history.state?.page?.props||window.history.state?.props||t?.props||{}}function C(e=0){window.clearTimeout(A),A=window.setTimeout(Ye,e)}function tt(){w||(w=new MutationObserver(()=>{D||(D=!0,requestAnimationFrame(()=>{D=!1,X()}))}),w.observe(document.body,{childList:!0,subtree:!0}))}function it(){w?.disconnect(),w=null,D=!1,window.clearTimeout(A),A=null}function X(){if(!L()){O();return}const e=et();if(!Y(e.handle)||!e.structurePagesUrl){O();return}if(nt(e)!=="tree"){O();return}const i=document.querySelector(".page-tree")?.closest("[data-ui-panel]");if(p&&!_?.isConnected&&at(),p){Z(i);return}const s=i||rt();s&&st(s,e,i)}function nt(e){return Statamic.$preferences?.get?.(`collections.${e.handle}.view`)||"tree"}function rt(){const e=document.querySelector("[data-ui-header]");return!e||!e.parentElement?null:e.nextElementSibling||null}function Z(e){!e||e===S||(e.hidden=!0,S=e)}function st(e,t,i=null){p||!L()||(_=document.createElement("div"),_.className="statamic-cp-tree-mount",e.before(_),Z(i),p=oe(Qe,{pageProps:t,addonConfig:W()}),Object.assign(p._context.components,Statamic.$app._context.components),Object.assign(p._context.directives,Statamic.$app._context.directives),Object.assign(p._context.provides,Statamic.$app._context.provides),Object.assign(p.config.globalProperties,Statamic.$app.config.globalProperties),p.mount(_))}function at(){p&&(p.unmount(),p=null),_=null,S?.isConnected&&(S.hidden=!1),S=null}function O(){p&&(p.unmount(),p=null),_?.remove(),_=null,S&&(S.hidden=!1,S=null)}const{Fieldtype:Sa,IndexFieldtype:Ia,FieldtypeMixin:ot,HasActionsMixin:va,HasInputOptionsMixin:Pa,HasPreferencesMixin:Ca,IndexFieldtypeMixin:ba,InlineEditForm:wa,DateFormatter:xa,NumberFormatter:ka,ItemActions:Ta,RelatedItem:Na,RestoreRevision:Da,RevisionHistory:Oa,RevisionPreview:Aa,SaveButtonOptions:Ra,SortableList:Ea,requireElevatedSession:Ua,requireElevatedSessionIf:Fa,clone:Ma,deepClone:La,resetValuesFromResponse:Ba}=__STATAMIC__.core,lt="statamic.cp_tree.page_link.open_ids",dt=150;function ct(e,t){let i=null;return(...s)=>{window.clearTimeout(i),i=window.setTimeout(()=>e(...s),t)}}const ht={name:"PageLinkTreeNode",components:{Icon:R,Radio:be,StatusIndicator:G},props:{node:{type:Object,required:!0},depth:{type:Number,required:!0},openIds:{type:Array,required:!0},selectedId:{type:String,default:null}},emits:["toggle-open","select-page"],computed:{entryId(){return this.node.entry||this.node.id},hasChildren(){return Array.isArray(this.node.children)&&this.node.children.length>0},isOpen(){return this.openIds.includes(this.node.id)},isSelected(){return this.entryId===this.selectedId},pageTitle(){return this.node.title||this.node.entry_title||this.node.url||this.node.id}},methods:{toggleOpen(){this.hasChildren&&this.$emit("toggle-open",this.node.id)},selectPage(){this.$emit("select-page",this.entryId)}},template:`
        <li
            class="statamic-cp-tree__item"
            :class="{
                'statamic-cp-tree__item--open': isOpen,
                'statamic-cp-tree__item--leaf': !hasChildren,
                'statamic-cp-tree__item--selected': isSelected,
                'statamic-cp-tree__item--search-match': node.search_match,
                'statamic-cp-tree__item--search-muted': node.search_muted,
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
                @click.stop="toggleOpen"
            >
                <span class="statamic-cp-tree__toggle-label" aria-hidden="true"></span>
            </button>
            <span v-else class="statamic-cp-tree__spacer" aria-hidden="true"></span>

            <div
                class="statamic-cp-tree__row page-link-fieldtype__row"
                role="button"
                tabindex="0"
                :aria-pressed="String(isSelected)"
                @click="selectPage"
                @keydown.enter.prevent="selectPage"
                @keydown.space.prevent="selectPage"
            >
                <Radio
                    class="page-link-fieldtype__radio"
                    :value="entryId"
                    :label="pageTitle"
                    @click.stop
                >
                    <StatusIndicator :status="node.status || 'draft'" :show-label="false" />
                    <span class="statamic-cp-tree__title">
                        <Icon v-if="depth === 1 && node.slug === 'home'" name="home" class="statamic-cp-tree__home" aria-hidden="true" />
                        {{ pageTitle }}
                    </span>
                </Radio>
            </div>

            <ul v-if="hasChildren && isOpen" class="statamic-cp-tree__children" role="group">
                <PageLinkTreeNode
                    v-for="child in node.children"
                    :key="child.id"
                    :node="child"
                    :depth="depth + 1"
                    :open-ids="openIds"
                    :selected-id="selectedId"
                    @toggle-open="$emit('toggle-open', $event)"
                    @select-page="$emit('select-page', $event)"
                />
            </ul>
        </li>
    `},pt={components:{Button:M,Dropdown:H,DropdownItem:K,DropdownMenu:j,Icon:R,Input:Q,PageLinkTreeNode:ht,RadioGroup:we,Select:xe,Stack:ke,StackContent:Ne,StackFooter:Te},mixins:[ot],provide:{isInLinkField:!0},data(){return{option:this.initialOption(),options:this.initialOptions(),urlValue:this.meta.initialUrl,selectedEntries:this.meta.initialSelectedEntries,selectedAssets:this.meta.initialSelectedAssets,metaChanging:!1,pages:[],pageTreeSite:"default",pageTreeLoading:!1,pageTreeError:null,pageSelectorOpen:!1,openIds:[],searchQuery:""}},computed:{entryValue(){return this.selectedEntries.length?`entry::${this.selectedEntries[0]}`:null},assetValue(){return this.selectedAssets.length?`asset::${this.selectedAssets[0]}`:null},selectedPageId(){return this.selectedEntries[0]||null},selectedPageNode(){return this.selectedPageId?this.findPageNode(this.pages,this.selectedPageId):null},selectedPageTitle(){return this.selectedPageNode?this.nodeLabel(this.selectedPageNode):null},selectedPageStatus(){return this.selectedPageNode?.status||null},isSearching(){return this.normalizedSearchQuery.length>0},normalizedSearchQuery(){return this.normalizeSearchText(this.searchQuery)},displayPages(){return this.isSearching?this.filterPagesForSearch(this.pages):this.pages},searchResultCount(){return this.countSearchMatches(this.displayPages)},searchAppendText(){return this.isSearching?String(this.searchResultCount):null},treeOpenIds(){if(!this.isSearching)return this.openIds;const e=[];return this.collectOpenIds(this.displayPages,e),e},replicatorPreview(){if(this.showFieldPreviews){switch(this.option){case"url":return this.urlValue;case"first-child":return __("First Child");case"page":return this.selectedPageTitle||this.entryValue;case"entry":return data_get(this.meta,"entry.meta.data.0.title",this.entryValue);case"asset":return data_get(this.meta,"asset.meta.data.0.basename",this.assetValue)}return this.value}}},watch:{option(e){this.metaChanging||(e===null?this.update(null):e==="url"?this.updateDebounced(this.urlValue):e==="first-child"?this.update("@child"):e==="page"?this.selectedPageNode?this.update(this.entryValue):this.openPageSelector():e==="entry"?this.entryValue?this.update(this.entryValue):setTimeout(()=>this.$refs.entries.linkExistingItem(),0):e==="asset"&&(this.assetValue?this.update(this.assetValue):setTimeout(()=>this.$refs.assets.openSelector(),0)),this.updateMeta({...this.meta,initialOption:e}))},urlValue(e){this.metaChanging||this.syncUrlDebounced(e)},meta(e,t){e!==t&&JSON.stringify(e)!==JSON.stringify(t)&&(this.metaChanging=!0,this.urlValue=e.initialUrl,this.option=this.initialOption(e.initialOption,e.initialSelectedEntries),this.selectedEntries=e.initialSelectedEntries,this.selectedAssets=e.initialSelectedAssets,this.$nextTick(()=>this.metaChanging=!1))}},created(){this.syncUrlDebounced=ct(e=>{this.update(e),this.updateMeta({...this.meta,initialUrl:e})},dt)},mounted(){this.loadPages()},methods:{initialOption(e=this.meta.initialOption,t=this.meta.initialSelectedEntries){return e==="page"||e==="entry"&&t?.[0]&&this.findPageNode(this.pages,t[0])?"page":e},initialOptions(){return[this.config.required?null:{label:__("None"),value:null},{label:__("URL"),value:"url"},this.meta.showFirstChildOption?{label:__("First Child"),value:"first-child"}:null,{label:"Seite",value:"page"},{label:__("Entry"),value:"entry"},this.meta.showAssetOption?{label:__("Asset"),value:"asset",maxFiles:1}:null].filter(e=>e)},async loadPages(){this.pageTreeLoading=!0,this.pageTreeError=null;try{const t=(Statamic.$config.get("statamicCpTree")||{}).pageLinkTreeUrl||cp_url("api/statamic-cp-tree/page-link-tree"),i=await this.$axios.get(t);this.pages=i.data.pages||[],this.pageTreeSite=i.data.site||"default",this.openIds=this.initialOpenIds(this.pages),this.option==="entry"&&this.selectedPageNode&&(this.metaChanging=!0,this.option="page",this.updateMeta({...this.meta,initialOption:"page"}),this.$nextTick(()=>this.metaChanging=!1)),this.pageSelectorOpen&&this.openSelectedPagePath()}catch{this.pageTreeError="Der Seitenbaum konnte nicht geladen werden."}finally{this.pageTreeLoading=!1}},openPageSelector(){this.isReadOnly||(this.openSelectedPagePath(),this.pageSelectorOpen=!0)},pageSelected(e){this.selectedEntries=[e],this.update(`entry::${e}`),this.updateMeta({...this.meta,initialOption:"page",initialSelectedEntries:[e]}),this.pageSelectorOpen=!1},clearLink(){const e=this.config.required?"page":null;this.metaChanging=!0,this.option=e,this.selectedEntries=[],this.update(null),this.updateMeta({...this.meta,initialOption:e,initialSelectedEntries:[]}),this.$nextTick(()=>this.metaChanging=!1)},entriesSelected(e){this.selectedEntries=e,this.update(this.entryValue),this.updateMeta({...this.meta,initialSelectedEntries:e})},assetsSelected(e){this.selectedAssets=e,this.update(this.assetValue),this.updateMeta({...this.meta,initialSelectedAssets:e})},toggleOpen(e){this.openIds=this.openIds.includes(e)?this.openIds.filter(t=>t!==e):[...this.openIds,e],this.persistOpenIds()},expandAll(){const e=[];this.collectOpenIds(this.pages,e),this.openIds=e,this.persistOpenIds()},collapseAll(){this.openIds=[],this.persistOpenIds()},initialOpenIds(e){const t=this.restoreOpenIds();return Array.isArray(t)?this.filterExistingIds(t,e):this.defaultOpenIds(e)},defaultOpenIds(e,t=1){return(e||[]).flatMap(i=>!i.children?.length||t>1?[]:[i.id,...this.defaultOpenIds(i.children,t+1)])},collectOpenIds(e,t){(e||[]).forEach(i=>{i.children?.length&&(t.push(i.id),this.collectOpenIds(i.children,t))})},filterExistingIds(e,t){const i=new Set,s=r=>(r||[]).forEach(n=>{i.add(n.id),s(n.children||[])});return s(t),e.filter(r=>i.has(r))},storageKey(){return`${lt}.${this.pageTreeSite||"default"}`},restoreOpenIds(){try{const e=window.localStorage.getItem(this.storageKey());return e===null?null:JSON.parse(e)}catch{return null}},persistOpenIds(){try{window.localStorage.setItem(this.storageKey(),JSON.stringify(this.openIds))}catch{}},openSelectedPagePath(){if(!this.selectedPageId||!this.pages.length)return;const e=this.findPageNodePath(this.pages,this.selectedPageId);if(!e.length)return;const t=e.slice(0,-1);this.openIds=[...new Set([...this.openIds,...t])]},findPageNode(e,t){for(const i of e||[]){if((i.entry||i.id)===t)return i;const s=this.findPageNode(i.children||[],t);if(s)return s}return null},findPageNodePath(e,t,i=[]){for(const s of e||[]){const r=[...i,s.id];if((s.entry||s.id)===t)return r;const n=this.findPageNodePath(s.children||[],t,r);if(n.length)return n}return[]},nodeLabel(e){return e.title||e.entry_title||e.url||e.id},normalizeSearchText(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim()},filterPagesForSearch(e){return(e||[]).flatMap(t=>{const i=this.filterPagesForSearch(t.children||[]),s=this.nodeMatchesSearch(t);return!s&&!i.length?[]:[{...t,search_match:s,search_muted:!s,children:i}]})},nodeMatchesSearch(e){return this.normalizeSearchText([e.title,e.entry_title,e.url,e.slug].filter(Boolean).join(" ")).includes(this.normalizedSearchQuery)},countSearchMatches(e){return(e||[]).reduce((t,i)=>t+(this.nodeMatchesSearch(i)?1:0)+this.countSearchMatches(i.children||[]),0)}}},ut={class:"page-link-fieldtype"},gt={class:"flex gap-2 sm:gap-3"},ft={class:"w-fit"},mt={class:"flex-1 flex min-w-0"},yt={key:2,class:"page-link-fieldtype__page-control"},_t={key:0,class:"page-link-fieldtype__selected related-item"},St={class:"flex flex-1 items-center line-clamp-1 text-sm text-gray-600 dark:text-gray-300"},It=["disabled"],vt={class:"flex flex-1 items-center justify-end"},Pt={key:0,class:"flex items-center"},Ct={key:1,class:"relationship-input-buttons @container relative"},bt={class:"flex flex-wrap items-center gap-2"},wt={class:"statamic-cp-tree page-link-fieldtype__tree"},xt={class:"page-node-access-fieldtype__header page-node-access-fieldtype__header--stack"},kt={class:"page-node-access-fieldtype__tools"},Tt={key:0,class:"statamic-cp-tree__state"},Nt={key:1,class:"statamic-cp-tree__state statamic-cp-tree__state--error"},Dt={key:2,class:"statamic-cp-tree__state"},Ot={key:3,class:"page-node-access-fieldtype__scroll page-node-access-fieldtype__scroll--stack"},At={class:"statamic-cp-tree__list page-link-fieldtype__list",role:"tree"};function Rt(e,t,i,s,r,n){const u=l("Select"),x=l("Input"),E=l("relationship-fieldtype"),P=l("StatusIndicator"),U=l("Icon"),I=l("Button"),k=l("DropdownItem"),g=l("DropdownMenu"),T=l("Dropdown"),B=l("assets-fieldtype"),ee=l("PageLinkTreeNode"),te=l("RadioGroup"),ie=l("StackContent"),ne=l("StackFooter"),re=l("Stack"),se=de("tooltip");return a(),d("div",ut,[h("div",gt,[h("div",ft,[o(u,{options:r.options,modelValue:r.option,"onUpdate:modelValue":t[0]||(t[0]=c=>r.option=c)},null,8,["options","modelValue"])]),h("div",mt,[r.option==="url"?(a(),y(x,{key:0,"read-only":e.isReadOnly,modelValue:r.urlValue,"onUpdate:modelValue":t[1]||(t[1]=c=>r.urlValue=c)},null,8,["read-only","modelValue"])):f("",!0),r.option==="entry"?(a(),y(E,{key:1,ref:"entries",handle:"entry","button-size":"base",config:e.meta.entry.config,meta:e.meta.entry.meta,value:r.selectedEntries,"onUpdate:meta":t[2]||(t[2]=c=>e.meta.entry.meta=c),"onUpdate:value":n.entriesSelected},null,8,["config","meta","value","onUpdate:value"])):f("",!0),r.option==="page"?(a(),d("div",yt,[n.selectedPageId?(a(),d("div",_t,[h("div",St,[n.selectedPageStatus?(a(),y(P,{key:0,status:n.selectedPageStatus,class:"me-2"},null,8,["status"])):f("",!0),ce((a(),d("button",{type:"button",class:"page-link-fieldtype__selected-title",disabled:e.isReadOnly,onClick:t[3]||(t[3]=(...c)=>n.openPageSelector&&n.openPageSelector(...c))},[V(v(n.selectedPageTitle||n.selectedPageId),1)],8,It)),[[se,n.selectedPageTitle]]),h("div",vt,[o(U,{name:"fieldtype-navigation",class:"page-link-fieldtype__selected-icon","aria-hidden":"true"}),e.isReadOnly?f("",!0):(a(),d("div",Pt,[o(T,null,{trigger:m(()=>[o(I,{icon:"dots",variant:"ghost",size:"xs","aria-label":e.__("Open dropdown menu")},null,8,["aria-label"])]),default:m(()=>[o(g,null,{default:m(()=>[o(k,{text:"Seite auswählen",icon:"fieldtype-navigation",onClick:n.openPageSelector},null,8,["onClick"]),o(k,{text:"Verknüpfung aufheben",variant:"destructive",onClick:n.clearLink},null,8,["onClick"])]),_:1})]),_:1})]))])])])):(a(),d("div",Ct,[h("div",bt,[o(I,{icon:"fieldtype-navigation",size:"base",text:"Seite verknüpfen",disabled:e.isReadOnly,onClick:he(n.openPageSelector,["prevent"])},null,8,["disabled","onClick"])])]))])):f("",!0),r.option==="asset"?(a(),y(B,{key:3,ref:"assets",handle:"asset",value:r.selectedAssets,config:e.meta.asset.config,meta:e.meta.asset.meta,"onUpdate:value":n.assetsSelected,"onUpdate:meta":t[4]||(t[4]=c=>e.meta.asset.meta=c)},null,8,["value","config","meta","onUpdate:value"])):f("",!0)])]),o(re,{open:r.pageSelectorOpen,"onUpdate:open":t[7]||(t[7]=c=>r.pageSelectorOpen=c),title:"Seite auswählen",icon:"fieldtype-navigation",size:"half"},{default:m(()=>[o(ie,{inset:""},{default:m(()=>[h("div",wt,[h("div",xt,[o(x,{class:"page-node-access-fieldtype__search",modelValue:r.searchQuery,"onUpdate:modelValue":t[5]||(t[5]=c=>r.searchQuery=c),"icon-prepend":"magnifying-glass",placeholder:"Seiten suchen",clearable:"",append:n.searchAppendText},null,8,["modelValue","append"]),h("div",kt,[o(I,{size:"sm",icon:"tree-collapse",text:"Alle schließen",onClick:n.collapseAll},null,8,["onClick"]),o(I,{size:"sm",icon:"tree-expand",text:"Alle öffnen",onClick:n.expandAll},null,8,["onClick"])])]),r.pageTreeLoading?(a(),d("div",Tt,"Lade Seitenbaum...")):r.pageTreeError?(a(),d("div",Nt,v(r.pageTreeError),1)):n.displayPages.length?(a(),d("div",Ot,[o(te,{class:"page-link-fieldtype__radio-group","model-value":n.selectedPageId,"onUpdate:modelValue":n.pageSelected},{default:m(()=>[h("ul",At,[(a(!0),d(b,null,F(n.displayPages,c=>(a(),y(ee,{key:c.id,node:c,depth:1,"open-ids":n.treeOpenIds,"selected-id":n.selectedPageId,onToggleOpen:n.toggleOpen,onSelectPage:n.pageSelected},null,8,["node","open-ids","selected-id","onToggleOpen","onSelectPage"]))),128))])]),_:1},8,["model-value","onUpdate:modelValue"])])):(a(),d("div",Dt,v(n.isSearching?"Keine Treffer.":"Keine Seiten gefunden."),1))])]),_:1}),o(ne,null,{start:m(()=>[V(v(n.selectedPageTitle||"Keine Seite ausgewählt"),1)]),end:m(()=>[o(I,{variant:"primary",text:"Fertig",onClick:t[6]||(t[6]=c=>r.pageSelectorOpen=!1)})]),_:1})]),_:1},8,["open"])])}const Et=J(pt,[["render",Rt]]);function q(){(Statamic.$config.get("statamicCpTree")||{}).pageLinkCollection&&Statamic.$components.register("link-fieldtype",Et)}function z(){Ge()}Statamic.$app?(q(),z()):(Statamic.booting(q),Statamic.booted(z));
