var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-pages-menu/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.pagesMenuStyle = void 0;
    const Theme = components_1.Styles.Theme.ThemeVars;
    exports.pagesMenuStyle = components_1.Styles.style({});
});
define("@scom/scom-pages-menu/interface.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/scom-pages-menu", ["require", "exports", "@ijstech/components"], function (require, exports, components_2) {
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
        }
        get data() {
            return this._data;
        }
        init() {
            super.init();
            const data = this.getAttribute('data', true);
            this._data = data;
            this.updateMenu(this._data);
        }
        onMenuClicked(cid) {
            console.log(`clicked on ${cid}`);
        }
        renderTreeNode(page, node) {
            node.caption = page.name;
            node.collapsible = true;
            if (page.cid)
                node.onClick = () => this.onMenuClicked(page.cid);
            if (page.pages) {
                page.pages.map((child) => {
                    const newNode = new components_2.TreeNode();
                    node.appendNode(newNode);
                    this.renderTreeNode(child, newNode);
                });
            }
        }
        renderTree(data) {
            const treeElm = new components_2.TreeView(this.pnlPagesMenu);
            data.pages.map((page) => {
                const node = treeElm.add();
                this.renderTreeNode(page, node);
            });
        }
        updateMenu(value) {
            this._data = value;
            this.renderTree(this._data);
        }
        render() {
            return (this.$render("i-panel", { id: "pnlPagesMenu", minHeight: 25 },
                this.$render("i-tree-view", { id: "treeView" })));
        }
    };
    ScomPagesMenu = __decorate([
        components_2.customModule,
        (0, components_2.customElements)('i-scom-pages-menu')
    ], ScomPagesMenu);
    exports.default = ScomPagesMenu;
});
