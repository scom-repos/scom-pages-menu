var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-pages-menu/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.menuStyle = exports.menuCardStyle = exports.menuBtnStyle = exports.pagesMenuStyle = void 0;
    const Theme = components_1.Styles.Theme.ThemeVars;
    exports.pagesMenuStyle = components_1.Styles.style({});
    exports.menuBtnStyle = components_1.Styles.style({
        $nest: {
            '.prevent-select': {
                userSelect: 'none'
            }
        }
    });
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
            },
            '.iconButton:hover': {
                backgroundColor: '#abccd4 !important'
            },
            '.iconButton': {
                borderRadius: '10px'
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
        getPage(id, currentPage) {
            if (!currentPage) {
                // Start the search from the top-level menu
                for (const page of this._data.pages) {
                    const result = this.getPage(id, page);
                    if (result) {
                        return result;
                    }
                }
            }
            else {
                // Check if the current page matches the ID
                if (currentPage.uuid === id) {
                    return currentPage;
                }
                // If the current page has sub-pages, search within them
                if (currentPage.pages) {
                    for (const subPage of currentPage.pages) {
                        const result = this.getPage(id, subPage);
                        if (result) {
                            return result;
                        }
                    }
                }
            }
            return undefined; // Page not found
        }
        setPage(id, newName, newCid, newPages, currentPage) {
            if (!currentPage) {
                // Start the search from the top-level menu
                for (const page of this._data.pages) {
                    if (this.setPage(id, newName, newCid, newPages, page)) {
                        return true; // Page found and updated
                    }
                }
            }
            else {
                // Check if the current page matches the ID
                if (currentPage.uuid === id) {
                    if (newName !== undefined) {
                        currentPage.name = newName;
                    }
                    if (newCid !== undefined) {
                        currentPage.cid = newCid;
                    }
                    if (newPages !== undefined) {
                        currentPage.pages = newPages;
                    }
                    return true; // Page found and updated
                }
                // If the current page has sub-pages, search within them
                if (currentPage.pages) {
                    for (const subPage of currentPage.pages) {
                        if (this.setPage(id, newName, newCid, newPages, subPage)) {
                            return true; // Page found and updated
                        }
                    }
                }
            }
            return false; // Page not found
        }
        addPage(parentId, newPage) {
            const parent = this.getPage(parentId);
            if (parent) {
                if (!parent.pages) {
                    parent.pages = [];
                }
                parent.pages.push(newPage);
                return true; // Page added to parent
            }
            return false; // Parent page not found
        }
        deletePage(id, currentPage, parent) {
            if (!currentPage) {
                // Start the search from the top-level menu
                for (let i = 0; i < this._data.pages.length; i++) {
                    if (this.deletePage(id, this._data.pages[i])) {
                        return true; // Page found and deleted
                    }
                }
            }
            else {
                // Check if the current page matches the ID
                if (currentPage.uuid === id) {
                    if (parent && parent.pages) {
                        const index = parent.pages.findIndex((page) => page.uuid === id);
                        if (index !== -1) {
                            parent.pages.splice(index, 1); // Remove the page from its parent
                            return true; // Page found and deleted
                        }
                    }
                }
                // If the current page has sub-pages, search within them
                if (currentPage.pages) {
                    for (let i = 0; i < currentPage.pages.length; i++) {
                        if (this.deletePage(id, currentPage.pages[i], currentPage)) {
                            return true; // Page found and deleted
                        }
                    }
                }
            }
            return false; // Page not found
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
define("@scom/scom-pages-menu", ["require", "exports", "@ijstech/components", "@scom/scom-pages-menu/index.css.ts", "@scom/scom-pages-menu/store.ts"], function (require, exports, components_2, index_css_1, store_1) {
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
            this.isEditing = false;
            this.noDataTxt = "No Pages";
        }
        get data() {
            return store_1.pagesObject.data;
        }
        init() {
            super.init();
            this.initEventBus();
            this.initEventListener();
            const data = this.getAttribute('data', true);
            store_1.pagesObject.data = data;
            this.renderMenu();
        }
        initEventBus() {
            // application.EventBus.register(this, EVENT.ON_UPDATE_MENU, async () => this.renderMenu());
        }
        initEventListener() {
            this.addEventListener('dragstart', (event) => {
                const eventTarget = event.target;
                if (!eventTarget || this.isEditing) {
                    event.preventDefault();
                    return;
                }
                this.draggingPageId = eventTarget.getAttribute('uuid');
            });
            this.addEventListener('dragend', (event) => {
                // remove all active drop line
                if (!this.draggingPageId) {
                    event.preventDefault();
                    return;
                }
                const activeLineIdx = this.getActiveDropLineIdx();
                if (activeLineIdx != -1)
                    this.reorderPage(this.draggingPageId, activeLineIdx);
                this.setfocusCard(this.focusedPageId);
                this.setActiveDropLine(-1);
                this.draggingPageId = undefined;
            });
            this.addEventListener('dragover', (event) => {
                event.preventDefault();
                if (!this.draggingPageId) {
                    event.preventDefault();
                    return;
                }
                this.showDropBox(event.clientX, event.clientY);
            });
            this.addEventListener('drop', (event) => {
                if (!this.draggingPageId) {
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
        getActiveDropLineIdx() {
            const dropLines = document.querySelectorAll('[id^="menuDropLine"]');
            for (let i = 0; i < dropLines.length; i++) {
                if (dropLines[i].classList.contains('active-drop-line')) {
                    return (i >= dropLines.length - 1) ? i - 1 : i;
                }
            }
            return -1;
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
                    this.setActiveDropLine((clientY < middleLine) ? i : i + 1);
                    return;
                }
            }
        }
        reorderPage(currentPageUUid, newPosition) {
        }
        setActiveDropLine(idx) {
            const dropLines = document.querySelectorAll('[id^="menuDropLine"]');
            for (const dropLine of dropLines) {
                dropLine.classList.remove('active-drop-line');
                dropLine.classList.remove('inactive-drop-line');
                if (dropLine.id == `menuDropLine-${idx}`) {
                    dropLine.classList.add('active-drop-line');
                }
                else {
                    dropLine.classList.add('inactive-drop-line');
                }
            }
        }
        renderChildren(parentUUid) {
            const parentElm = this.pnlMenu.querySelector(`[uuid="${parentUUid}"]`);
            const parentData = store_1.pagesObject.getPage(parentUUid);
            if (!parentData)
                return;
            const childrenList = parentData.pages;
            for (let i = childrenList.length - 1; i >= 0; i--) {
                const isExist = this.pnlMenu.querySelector(`[uuid="${childrenList[i].uuid}"]`);
                if (!isExist) {
                    const nextLevel = parseInt(parentElm.getAttribute('level'));
                    const childElm = this.renderMenuCard(childrenList[i].uuid, childrenList[i].name, childrenList[i].cid, false, nextLevel + 1);
                    childElm.setAttribute('parentUUid', parentUUid);
                    parentElm.parentElement.insertBefore(childElm, parentElm.nextSibling);
                }
            }
        }
        removeChildren(parentUUid) {
            const childrenElm = this.pnlMenu.querySelectorAll(`[parentUUid="${parentUUid}"]`);
            for (const childElm of childrenElm) {
                childElm.remove();
            }
        }
        renderMenu() {
            var _a;
            this.pnlMenu.clearInnerHTML();
            const items = store_1.pagesObject.data.pages.map((page) => {
                return {
                    caption: page.name || "Untitled Page",
                    cid: page.cid,
                    uuid: page.uuid
                };
            });
            if (!items.length) {
                const txt = (this.$render("i-hstack", { verticalAlignment: "center", horizontalAlignment: 'start', width: "100%", overflow: "hidden" },
                    this.$render("i-label", { caption: this.noDataTxt, font: { size: '16px', color: '#3b3838', weight: 530 }, padding: { top: 8, bottom: 8, left: 8, right: 8 }, maxHeight: 34, overflow: "hidden" })));
                this.pnlMenu.appendChild(txt);
                return;
            }
            const activeElm = document.querySelector('ide-toolbar.active') || document.querySelector('ide-row.active');
            const activePageId = (_a = activeElm === null || activeElm === void 0 ? void 0 : activeElm.closest('ide-row')) === null || _a === void 0 ? void 0 : _a.id.replace('row-', "");
            // set the titles here
            const dropLine = (this.$render("i-panel", { id: `menuDropLine-0`, width: '100%', height: '5px' }));
            this.pnlMenu.appendChild(dropLine);
            for (let i = 0; i < items.length; i++) {
                const isActive = activePageId == items[i].uuid;
                const menuCard = this.renderMenuCard(items[i].uuid, items[i].caption, items[i].cid, isActive, 0);
                this.pnlMenu.appendChild(menuCard);
                const dropLine = (this.$render("i-panel", { id: `menuDropLine-${i + 1}`, width: '100%', height: '5px' }));
                this.pnlMenu.appendChild(dropLine);
            }
        }
        renderMenuCard(uuid, name, cid, isActive, level) {
            const menuCard = (this.$render("i-hstack", { id: "menuCard", class: index_css_1.menuCardStyle, verticalAlignment: "center", horizontalAlignment: 'space-between', width: "100%", border: { radius: 5 }, overflow: "hidden", onClick: () => cid ? this.goToPage(cid) : this.handleChildren(uuid) },
                this.$render("i-hstack", { verticalAlignment: "center", horizontalAlignment: 'start' },
                    this.$render("i-label", { id: "cardDot", caption: "•", font: { size: '16px', color: '#3b3838', weight: 530 }, padding: { top: 8, bottom: 8, left: 8 + level * 8, right: 8 }, maxHeight: 34, overflow: "hidden", class: isActive ? "focused-card" : "" }),
                    this.$render("i-label", { id: "cardTitle", caption: name, font: { size: '16px', color: '#3b3838', weight: 530 }, padding: { top: 8, bottom: 8, left: 8, right: 8 }, maxHeight: 34, class: isActive ? "focused-card" : "", overflow: "hidden" }),
                    this.$render("i-input", { id: "cardInput", visible: false, width: '90%', height: '40px', padding: { left: '0.5rem', top: '0.5rem', bottom: '0.5rem', right: '0.5rem' } })),
                this.$render("i-icon", { id: "cardRenameBtn", name: 'pen', fill: 'var(--colors-primary-main)', width: 28, height: 28, padding: { top: 7, bottom: 7, left: 7, right: 7 }, margin: { right: 4 }, class: "pointer iconButton", visible: false, tooltip: { content: "Rename", placement: "top" }, onClick: () => this.onClickRenameBtn(uuid) }),
                this.$render("i-hstack", { id: "editBtnStack", verticalAlignment: "center", visible: false },
                    this.$render("i-icon", { name: 'times', width: 28, height: 28, fill: 'var(--colors-primary-main)', padding: { top: 7, bottom: 7, left: 7, right: 7 }, margin: { right: 4 }, class: "pointer iconButton", tooltip: { content: "Cancel", placement: "top" }, onClick: () => this.onClickCancelBtn(uuid) }),
                    this.$render("i-icon", { name: "check", width: 28, height: 28, fill: 'var(--colors-primary-main)', padding: { top: 7, bottom: 7, left: 7, right: 7 }, margin: { right: 4 }, class: "pointer iconButton", tooltip: { content: "Confirm", placement: "top" }, onClick: () => this.onClickConfirmBtn(uuid) }))));
            menuCard.setAttribute('uuid', uuid);
            menuCard.setAttribute('draggable', 'true');
            menuCard.setAttribute('cid', cid);
            menuCard.setAttribute('level', level);
            this.initMenuCardEventListener(menuCard);
            return menuCard;
        }
        handleChildren(uuid) {
            const isChildExist = this.pnlMenu.querySelector(`[parentUUid="${uuid}"]`);
            if (isChildExist) {
                this.removeChildren(uuid);
            }
            else {
                this.renderChildren(uuid);
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
            const cardRenameBtn = currCard.querySelector('#cardRenameBtn');
            cardRenameBtn.visible = toggle;
        }
        toggleEditor(uuid, toggle) {
            this.isEditing = toggle;
            const currCard = this.pnlMenu.querySelector(`[uuid="${uuid}"]`);
            const cardTitle = currCard.querySelector('#cardTitle');
            const cardInput = currCard.querySelector('#cardInput');
            const cardRenameBtn = currCard.querySelector('#cardRenameBtn');
            cardInput.value = cardTitle.caption;
            cardTitle.visible = !toggle;
            cardInput.visible = toggle;
            cardRenameBtn.visible = !toggle;
            const editBtnStack = currCard.querySelector('#editBtnStack');
            editBtnStack.visible = toggle;
        }
        goToPage(cid) {
            console.log(`Go to ${cid}`);
            // const parent = this.closest('#editor') || document;
            // const row = parent.querySelector(`#row-${uuid}`) as PageRow;
            // row.scrollIntoView();
            // row.showSection(uuid);
        }
        render() {
            return (this.$render("i-vstack", { id: "menuWrapper", gap: "0.5rem", class: index_css_1.menuBtnStyle, zIndex: 150 },
                this.$render("i-hstack", { gap: '1rem', verticalAlignment: 'center' },
                    this.$render("i-label", { caption: "Pages menu", font: { color: 'var(--colors-primary-main)', weight: 750, size: '18px' }, class: "prevent-select" })),
                this.$render("i-vstack", { id: "pnlMenuWrapper", width: 320 },
                    this.$render("i-vstack", { id: 'pnlMenu', class: index_css_1.menuStyle }))));
        }
    };
    ScomPagesMenu = __decorate([
        components_2.customModule,
        (0, components_2.customElements)('i-scom-pages-menu')
    ], ScomPagesMenu);
    exports.default = ScomPagesMenu;
});
