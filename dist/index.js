var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-pages-menu/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.menuStyle = exports.iconButtonStyle = exports.menuCardStyle = void 0;
    const Theme = components_1.Styles.Theme.ThemeVars;
    exports.menuCardStyle = components_1.Styles.style({
        cursor: 'pointer',
        opacity: 1,
        transition: '0.3s',
        $nest: {
            '&:hover': {
                backgroundColor: "#b8e4f2"
            },
            'i-label': {
                overflow: 'hidden',
                // whiteSpace: 'nowrap',
                // textOverflow: 'ellipsis',
                display: '-webkit-box',
                '-webkit-line-clamp': 2,
                WebkitBoxOrient: 'vertical',
                lineHeight: 1.25
            },
            '> i-image img': {
                width: 40,
                height: 40,
                objectFit: 'cover',
                borderRadius: 5
            },
            '.focused-card': {
                color: "#0247bf !important",
                fontWeight: "600 !important"
            }
        }
    });
    exports.iconButtonStyle = components_1.Styles.style({
        borderRadius: '10px',
        $nest: {
            '&:hover': {
                backgroundColor: '#abccd4 !important'
            }
        }
    });
    exports.menuStyle = components_1.Styles.style({
        $nest: {
            '.active-drop-line': {
                background: 'rgb(66,133,244)',
                opacity: 1
            },
            '.inactive-drop-line': {
                background: 'rgb(0,0,0)',
                opacity: 0
            }
        }
    });
});
define("@scom/scom-pages-menu/interface.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/scom-pages-menu/store.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.pagesObject = exports.PagesObject = void 0;
    class PagesObject {
        constructor() {
            this._data = {
                pages: []
            };
        }
        get data() {
            return this._data;
        }
        set data(value) {
            this._data = value;
        }
        getPage(uuid, currentPage) {
            if (!currentPage) {
                // Start the search from the top-level menu
                for (const page of this._data.pages) {
                    const result = this.getPage(uuid, page);
                    if (result) {
                        return result;
                    }
                }
            }
            else {
                // Check if the current page matches the ID
                if (currentPage.uuid === uuid) {
                    return currentPage;
                }
                // If the current page has sub-pages, search within them
                if (currentPage.pages) {
                    for (const subPage of currentPage.pages) {
                        const result = this.getPage(uuid, subPage);
                        if (result) {
                            return result;
                        }
                    }
                }
            }
            return undefined; // Page not found
        }
        setPage(uuid, newName, newCid, newPages, currentPage) {
            if (!currentPage) {
                // Start the search from the top-level menu
                for (const page of this._data.pages) {
                    if (this.setPage(uuid, newName, newCid, newPages, page)) {
                        return true; // Page found and updated
                    }
                }
            }
            else {
                // Check if the current page matches the ID
                if (currentPage.uuid === uuid) {
                    if (newName !== undefined) {
                        currentPage.name = newName;
                    }
                    if (newPages !== undefined) {
                        currentPage.pages = newPages;
                    }
                    return true; // Page found and updated
                }
                // If the current page has sub-pages, search within them
                if (currentPage.pages) {
                    for (const subPage of currentPage.pages) {
                        if (this.setPage(uuid, newName, newCid, newPages, subPage)) {
                            return true; // Page found and updated
                        }
                    }
                }
            }
            return false; // Page not found
        }
        addPage(newPage, parentId, index) {
            if (parentId) {
                const parent = this.getPage(parentId);
                if (parent) {
                    if (!parent.pages) {
                        parent.pages = [];
                    }
                    if (index !== undefined && index >= 0 && index <= this._data.pages.length)
                        parent.pages.splice(index, 0, newPage);
                    else
                        parent.pages.push(newPage);
                    return true; // Page added to parent
                }
                else {
                    return false; // Page not found
                }
            }
            else {
                if (index !== undefined && index >= 0 && index <= this._data.pages.length)
                    this._data.pages.splice(index, 0, newPage);
                else
                    this._data.pages.push(newPage);
                return true; // Page added to parent
            }
        }
        deletePage(uuid, currentPage, parent) {
            if (!currentPage) {
                // Start the search from the top-level menu
                for (let i = 0; i < this._data.pages.length; i++) {
                    if (this.deletePage(uuid, this._data.pages[i])) {
                        return true; // Page found and deleted
                    }
                }
            }
            else {
                // Check if the current page matches the ID
                if (currentPage.uuid === uuid) {
                    if (parent && parent.pages) {
                        const index = parent.pages.findIndex((page) => page.uuid === uuid);
                        if (index !== -1) {
                            parent.pages.splice(index, 1); // Remove the page from its parent
                            return true; // Page found and deleted
                        }
                    }
                    else if (!parent) {
                        // If there is no parent, it means we are deleting a top-level page
                        const index = this._data.pages.findIndex((page) => page.uuid === uuid);
                        if (index !== -1) {
                            this._data.pages.splice(index, 1); // Remove the top-level page
                            return true; // Page found and deleted
                        }
                    }
                }
                // If the current page has sub-pages, search within them
                if (currentPage.pages) {
                    for (let i = 0; i < currentPage.pages.length; i++) {
                        if (this.deletePage(uuid, currentPage.pages[i], currentPage)) {
                            return true; // Page found and deleted
                        }
                    }
                }
            }
            return false; // Page not found
        }
        getParent(uuid) {
            for (const page of this._data.pages) {
                if (page.uuid === uuid) {
                    return undefined; // The given id represents a page in the first hierarchy
                }
                if (page.pages) {
                    const subParent = this.findParent(page, uuid);
                    if (subParent) {
                        return subParent;
                    }
                }
            }
            return undefined;
        }
        findParent(page, uuid) {
            for (const _page of page.pages) {
                if (_page.uuid === uuid) {
                    return page;
                }
                if (_page.pages) {
                    const subParent = this.findParent(_page, uuid);
                    if (subParent) {
                        return subParent;
                    }
                }
            }
            return undefined; // No parent found
        }
    }
    exports.PagesObject = PagesObject;
    exports.pagesObject = new PagesObject();
});
define("@scom/scom-pages-menu/utils.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.generateUUID = void 0;
    ///<amd-module name='@scom/scom-pages-menu/utils.ts'/> 
    const generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    exports.generateUUID = generateUUID;
});
define("@scom/scom-pages-menu", ["require", "exports", "@ijstech/components", "@scom/scom-pages-menu/index.css.ts", "@scom/scom-pages-menu/store.ts", "@scom/scom-pages-menu/utils.ts"], function (require, exports, components_2, index_css_1, store_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_2.Styles.Theme.ThemeVars;
    let ScomPagesMenu = class ScomPagesMenu extends components_2.Module {
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
            this.expandedMenuItem = [];
            this.isEditing = false;
            this.noDataTxt = "No Pages";
        }
        get data() {
            return store_1.pagesObject.data;
        }
        set data(value) {
            store_1.pagesObject.data = value;
            this.renderMenu();
        }
        get activePageUuid() {
            return this._activePageUuid;
        }
        set activePageUuid(value) {
            this._activePageUuid = value;
        }
        init() {
            super.init();
            this.initEventBus();
            this.initEventListener();
            const data = this.getAttribute('data', true);
            this._activePageUuid = this.getAttribute('activePageUuid', true);
            this.onChangedPage = this.getAttribute('onChangedPage', true);
            store_1.pagesObject.data = data;
            if (!this._activePageUuid)
                this._activePageUuid = store_1.pagesObject.data.pages ? store_1.pagesObject.data.pages[0].uuid : undefined;
            this.renderMenu(true);
        }
        initEventBus() { }
        initEventListener() {
            this.addEventListener('dragstart', (event) => {
                const eventTarget = event.target;
                if (!eventTarget || this.isEditing) {
                    event.preventDefault();
                    return;
                }
                this.draggingPageUUid = eventTarget.getAttribute('uuid');
            });
            this.addEventListener('dragend', (event) => {
                // remove all active drop line
                if (!this.draggingPageUUid) {
                    event.preventDefault();
                    return;
                }
                // const activeLineIdx = this.getActiveDropLineIdx();
                // if (activeLineIdx != -1)
                const dropPageUuid = this.getActiveDropLineUuid();
                this.reorderPage(this.draggingPageUUid, dropPageUuid);
                this.setfocusCard(this.focusedPageId);
                this.setActiveDropLine(undefined);
                this.draggingPageUUid = undefined;
            });
            this.addEventListener('dragover', (event) => {
                event.preventDefault();
                if (!this.draggingPageUUid) {
                    event.preventDefault();
                    return;
                }
                this.showDropBox(event.clientX, event.clientY);
            });
            this.addEventListener('drop', (event) => {
                if (!this.draggingPageUUid) {
                    event.preventDefault();
                    return;
                }
            });
        }
        initMenuCardEventListener(card) {
            card.addEventListener('mouseenter', (event) => {
                if (this.isEditing)
                    return;
                this.toggleRenameBtn(card.getAttribute('uuid'), true);
            });
            card.addEventListener('mouseleave', (event) => {
                if (this.isEditing)
                    return;
                this.toggleRenameBtn(card.getAttribute('uuid'), false);
            });
        }
        setfocusCard(uuid) {
            this.focusedPageId = uuid;
            const menuCards = this.pnlMenu.querySelectorAll('#menuCard');
            for (let i = 0; i < menuCards.length; i++) {
                const cardDot = menuCards[i].querySelector('#cardDot');
                const cardTitle = menuCards[i].querySelector('#cardTitle');
                cardDot.classList.remove("focused-card");
                cardTitle.classList.remove("focused-card");
                if (menuCards[i].getAttribute('uuid') == uuid) {
                    cardDot.classList.add("focused-card");
                    cardTitle.classList.add("focused-card");
                }
            }
        }
        getActiveDropLineUuid() {
            const dropLines = document.querySelectorAll('[id^="menuDropLine"]');
            for (let i = 0; i < dropLines.length; i++) {
                if (dropLines[i].classList.contains('active-drop-line')) {
                    return dropLines[i].id.replace('menuDropLine-', '');
                }
            }
            return undefined;
        }
        showDropBox(clientX, clientY) {
            const menuRect = this.pnlMenu.getBoundingClientRect();
            if (clientX < menuRect.left || clientX > menuRect.right)
                return;
            const menuCards = this.pnlMenu.querySelectorAll('#menuCard');
            for (let i = 0; i < menuCards.length; i++) {
                const menuCardRect = menuCards[i].getBoundingClientRect();
                if (clientY >= menuCardRect.top && clientY <= menuCardRect.bottom) {
                    const middleLine = menuCardRect.top + menuCardRect.height / 2;
                    // decide show top/bottom box
                    let uuid;
                    if (clientY < middleLine) {
                        if (i == 0)
                            uuid = 'start';
                        else
                            uuid = menuCards[i - 1].getAttribute('uuid');
                    }
                    else {
                        uuid = menuCards[i].getAttribute('uuid');
                    }
                    this.setActiveDropLine(uuid);
                    return;
                }
            }
        }
        reorderPage(dragPageUUid, dropPageUUid) {
            const dragPage = store_1.pagesObject.getPage(dragPageUUid);
            const deletePage = store_1.pagesObject.deletePage(dragPageUUid);
            if (!deletePage)
                console.error(`Fail to delete the page with uuid: ${dragPageUUid}`);
            if (dropPageUUid == "start") {
                store_1.pagesObject.addPage(dragPage, undefined, 0);
            }
            else {
                // drop on a leef node, append to the back of this leef node
                const dropPageParent = store_1.pagesObject.getParent(dropPageUUid);
                if (dropPageParent) {
                    // drop on non first hierarchy 
                    const dropPageIdx = dropPageParent.pages.findIndex(p => p.uuid == dropPageUUid);
                    store_1.pagesObject.addPage(dragPage, dropPageParent.uuid, dropPageIdx + 1);
                    const dragMenuCard = this.pnlMenu.querySelector(`[uuid="${dragPageUUid}"]`).closest("#menuCardWrapper");
                    dragMenuCard.setAttribute('parentUUid', dropPageUUid);
                }
                else {
                    // drop on first hierarchy
                    const dropPageIdx = store_1.pagesObject.data.pages.findIndex(p => p.uuid == dropPageUUid);
                    store_1.pagesObject.addPage(dragPage, undefined, dropPageIdx + 1);
                }
            }
            this.renderMenu();
        }
        setActiveDropLine(uuid) {
            const dropLines = document.querySelectorAll('[id^="menuDropLine"]');
            for (const dropLine of dropLines) {
                dropLine.classList.remove('active-drop-line');
                dropLine.classList.remove('inactive-drop-line');
                if (dropLine.id == `menuDropLine-${uuid}`) {
                    dropLine.classList.add('active-drop-line');
                }
                else {
                    dropLine.classList.add('inactive-drop-line');
                }
            }
        }
        renderChildren(parentUUid) {
            if (!parentUUid)
                return;
            const parentElm = this.pnlMenu.querySelector(`[uuid="${parentUUid}"]`);
            const parentElmWrapper = parentElm.parentElement;
            const parentData = store_1.pagesObject.getPage(parentUUid);
            if (!parentData)
                return;
            if (!this.expandedMenuItem.includes(parentUUid))
                this.expandedMenuItem = this.expandedMenuItem.filter(item => item !== parentUUid);
            const childrenList = parentData.pages;
            for (let i = childrenList.length - 1; i >= 0; i--) {
                const isExist = this.pnlMenu.querySelector(`[uuid="${childrenList[i].uuid}"]`);
                if (!isExist) {
                    const nextLevel = parseInt(parentElm.getAttribute('level'));
                    const childElm = this.renderMenuCard(childrenList[i].uuid, nextLevel + 1);
                    childElm.setAttribute('parentUUid', parentUUid);
                    parentElmWrapper.parentElement.insertBefore(childElm, parentElmWrapper.nextSibling);
                    if (this.expandedMenuItem.includes(childrenList[i].uuid))
                        this.renderChildren(childrenList[i].uuid);
                }
            }
        }
        removeChildren(parentUUid) {
            const childElms = this.pnlMenu.querySelectorAll(`[parentuuid="${parentUUid}"]`);
            if (this.expandedMenuItem.includes(parentUUid))
                this.expandedMenuItem.push(parentUUid);
            for (const childElm of childElms) {
                const grandChildElmExist = this.pnlMenu.querySelector(`[parentuuid="${childElm.querySelector('#menuCard').getAttribute('uuid')}"]`);
                if (grandChildElmExist)
                    this.removeChildren(childElm.querySelector('#menuCard').getAttribute('uuid'));
                childElm.remove();
            }
        }
        renderMenu(firstHierarichyExpand = false) {
            this.pnlMenu.clearInnerHTML();
            if (firstHierarichyExpand) {
                const firstHierarichyPages = store_1.pagesObject.data.pages.map(p => p.uuid);
                firstHierarichyPages.forEach(i => {
                    if (!this.expandedMenuItem.includes(i))
                        this.expandedMenuItem.push(i);
                });
            }
            const items = store_1.pagesObject.data.pages.map((page) => {
                return {
                    caption: page.name || "Untitled Page",
                    uuid: page.uuid,
                    children: page.pages
                };
            });
            if (!items.length) {
                const txt = (this.$render("i-hstack", { verticalAlignment: "center", horizontalAlignment: 'start', width: "100%", overflow: "hidden" },
                    this.$render("i-label", { caption: this.noDataTxt, font: { size: '16px', color: '#3b3838', weight: 530 }, padding: { top: 8, bottom: 8, left: 8, right: 8 }, maxHeight: 34, overflow: "hidden" })));
                this.pnlMenu.appendChild(txt);
                return;
            }
            const firstDropLine = this.renderDropLine('start');
            this.pnlMenu.appendChild(firstDropLine);
            for (let i = 0; i < items.length; i++) {
                // const isActive = this.activePageUUid == items[i].uuid;
                const menuCardWrapper = this.renderMenuCard(items[i].uuid, 0);
                this.pnlMenu.appendChild(menuCardWrapper);
                if (items[i].children && items[i].children.length > 0 &&
                    this.expandedMenuItem.includes(items[i].uuid))
                    this.renderChildren(items[i].uuid);
            }
        }
        renderDropLine(uuid) {
            return this.$render("i-panel", { id: `menuDropLine-${uuid}`, width: '100%', height: '5px' });
        }
        onClickAddChildBtn(parentUuid) {
            store_1.pagesObject.addPage({
                uuid: (0, utils_1.generateUUID)(),
                name: 'Untitled page',
            }, parentUuid);
            this.expandedMenuItem.push(parentUuid);
            this.renderMenu();
        }
        onClickMenuCard(uuid) {
            const page = store_1.pagesObject.getPage(uuid);
            const currPage = store_1.pagesObject.getPage(this._activePageUuid);
            this._activePageUuid = uuid;
            if (this.onChangedPage)
                this.onChangedPage(page, currPage);
            if (page.pages)
                this.changeChildrenVisibility(uuid);
            this.renderMenu();
        }
        renderMenuCard(uuid, level) {
            const page = store_1.pagesObject.getPage(uuid);
            const isActive = uuid == this._activePageUuid;
            const hasChildren = page.pages && page.pages.length && page.pages.length > 0;
            const expanded = this.expandedMenuItem.includes(uuid);
            const iconName = !hasChildren ? 'circle' : expanded ? 'angle-down' : 'angle-right';
            const iconHeight = !hasChildren ? '5px' : '15px';
            const marginLeft = (level * 1).toString() + 'rem';
            const menuCard = (this.$render("i-hstack", { id: "menuCard", class: index_css_1.menuCardStyle, verticalAlignment: "center", horizontalAlignment: 'space-between', width: "100%", border: { radius: 5 }, overflow: "hidden", onClick: () => this.onClickMenuCard(uuid) },
                this.$render("i-hstack", { verticalAlignment: "center", horizontalAlignment: 'start', overflow: 'hidden' },
                    this.$render("i-icon", { id: "cardIcon", name: iconName, width: '15px', height: iconHeight, margin: { left: marginLeft }, maxHeight: 34, overflow: "hidden", fill: '#3b3838', class: isActive ? "focused-card" : "" }),
                    this.$render("i-label", { id: "cardTitle", caption: page.name, font: { size: '16px', color: '#3b3838', weight: 530 }, padding: { top: 8, bottom: 8, left: 8, right: 8 }, maxHeight: 34, class: isActive ? "focused-card" : "", overflow: "hidden" }),
                    this.$render("i-input", { id: "cardInput", visible: false, width: '90%', height: '40px', padding: { left: '0.5rem', top: '0.5rem', bottom: '0.5rem', right: '0.5rem' } })),
                this.$render("i-hstack", { id: "actionBtnStack", verticalAlignment: "center", visible: false },
                    this.$render("i-icon", { id: "cardAddChildBtn", name: 'plus', fill: 'var(--colors-primary-main)', width: 28, height: 28, padding: { top: 7, bottom: 7, left: 7, right: 7 }, margin: { right: 4 }, class: `pointer ${index_css_1.iconButtonStyle}`, tooltip: { content: "Add page", placement: "top" }, onClick: () => this.onClickAddChildBtn(uuid) }),
                    this.$render("i-icon", { id: "cardRenameBtn", name: 'pen', fill: 'var(--colors-primary-main)', width: 28, height: 28, padding: { top: 7, bottom: 7, left: 7, right: 7 }, margin: { right: 4 }, class: `pointer ${index_css_1.iconButtonStyle}`, tooltip: { content: "Rename", placement: "top" }, onClick: () => this.onClickRenameBtn(uuid) }),
                    this.$render("i-icon", { id: "cardRemoveBtn", name: 'trash', fill: 'var(--colors-primary-main)', width: 28, height: 28, padding: { top: 7, bottom: 7, left: 7, right: 7 }, margin: { right: 4 }, class: `pointer ${index_css_1.iconButtonStyle}`, tooltip: { content: "Remove", placement: "top" }, onClick: () => this.onClickRemoveBtn(uuid) })),
                this.$render("i-hstack", { id: "editBtnStack", verticalAlignment: "center", visible: false },
                    this.$render("i-icon", { name: 'times', width: 28, height: 28, fill: 'var(--colors-primary-main)', padding: { top: 7, bottom: 7, left: 7, right: 7 }, margin: { right: 4 }, class: `pointer ${index_css_1.iconButtonStyle}`, tooltip: { content: "Cancel", placement: "top" }, onClick: () => this.onClickCancelBtn(uuid) }),
                    this.$render("i-icon", { name: "check", width: 28, height: 28, fill: 'var(--colors-primary-main)', padding: { top: 7, bottom: 7, left: 7, right: 7 }, margin: { right: 4 }, class: `pointer ${index_css_1.iconButtonStyle}`, tooltip: { content: "Confirm", placement: "top" }, onClick: () => this.onClickConfirmBtn(uuid) }))));
            menuCard.setAttribute('uuid', uuid);
            menuCard.setAttribute('draggable', 'true');
            menuCard.setAttribute('level', level);
            this.initMenuCardEventListener(menuCard);
            const dropLine = this.renderDropLine(uuid);
            const menuWrapper = (this.$render("i-vstack", { id: "menuCardWrapper" },
                menuCard,
                dropLine));
            return menuWrapper;
        }
        changeChildrenVisibility(uuid) {
            const isChildExist = this.pnlMenu.querySelector(`[parentUUid="${uuid}"]`);
            if (isChildExist) {
                this.expandedMenuItem = this.expandedMenuItem.filter(e => e !== uuid);
            }
            else {
                this.expandedMenuItem.push(uuid);
            }
        }
        setCardTitle(uuid) {
            const currCard = this.pnlMenu.querySelector(`[uuid="${uuid}"]`);
            const cardInput = currCard.querySelector('#cardInput');
            const caption = cardInput.value;
            // change data
            store_1.pagesObject.setPage(uuid, caption);
            // change UI on-the-fly
            const cardTitle = currCard.querySelector('#cardTitle');
            cardTitle.caption = caption;
        }
        onClickRemoveBtn(uuid) {
            store_1.pagesObject.deletePage(uuid);
            this.renderMenu();
        }
        onClickRenameBtn(uuid) {
            this.toggleEditor(uuid, true);
        }
        onClickConfirmBtn(uuid) {
            this.setCardTitle(uuid);
            this.toggleEditor(uuid, false);
        }
        onClickCancelBtn(uuid) {
            this.toggleEditor(uuid, false);
        }
        toggleRenameBtn(uuid, toggle) {
            const currCard = this.pnlMenu.querySelector(`[uuid="${uuid}"]`);
            const actionBtnStack = currCard.querySelector('#actionBtnStack');
            actionBtnStack.visible = toggle;
        }
        toggleEditor(uuid, toggle) {
            this.isEditing = toggle;
            const currCard = this.pnlMenu.querySelector(`[uuid="${uuid}"]`);
            const cardTitle = currCard.querySelector('#cardTitle');
            const cardInput = currCard.querySelector('#cardInput');
            const actionBtnStack = currCard.querySelector('#actionBtnStack');
            cardInput.value = cardTitle.caption;
            cardTitle.visible = !toggle;
            cardInput.visible = toggle;
            actionBtnStack.visible = !toggle;
            const editBtnStack = currCard.querySelector('#editBtnStack');
            editBtnStack.visible = toggle;
        }
        render() {
            return (this.$render("i-vstack", { gap: "0.5rem", background: { color: "#FAFAFA" }, height: "100%", padding: { top: '1.5rem', left: '1.5rem', right: '1.5rem', bottom: '1.5rem' } },
                this.$render("i-hstack", { gap: '1rem', verticalAlignment: 'center', horizontalAlignment: 'space-between' },
                    this.$render("i-label", { caption: "Pages menu", font: { color: 'var(--colors-primary-main)', weight: 750, size: '18px' }, class: "prevent-select" }),
                    this.$render("i-icon", { name: 'plus', fill: 'var(--colors-primary-main)', width: 28, height: 28, padding: { top: 7, bottom: 7, left: 7, right: 7 }, margin: { right: 4 }, class: `pointer ${index_css_1.iconButtonStyle}`, tooltip: { content: "Add page", placement: "top" }, onClick: () => this.onClickAddChildBtn(null) })),
                this.$render("i-vstack", { id: "pnlMenuWrapper", width: "100%" },
                    this.$render("i-vstack", { id: 'pnlMenu', class: index_css_1.menuStyle }))));
        }
    };
    ScomPagesMenu = __decorate([
        components_2.customModule,
        (0, components_2.customElements)('i-scom-pages-menu')
    ], ScomPagesMenu);
    exports.default = ScomPagesMenu;
});
