/// <amd-module name="@scom/scom-pages-menu/index.css.ts" />
declare module "@scom/scom-pages-menu/index.css.ts" {
    export const pagesMenuStyle: string;
}
/// <amd-module name="@scom/scom-pages-menu/interface.ts" />
declare module "@scom/scom-pages-menu/interface.ts" {
    export interface IPageData {
        name: string;
        cid?: string;
        url?: string;
        pages?: IPageData[];
    }
    export interface IPagesMenu {
        pages: IPageData[];
    }
}
/// <amd-module name="@scom/scom-pages-menu" />
declare module "@scom/scom-pages-menu" {
    import { Module, ControlElement, Container, TreeNode } from '@ijstech/components';
    import { IPagesMenu, IPageData } from "@scom/scom-pages-menu/interface.ts";
    interface ScomPagesMenuElement extends ControlElement {
        data: IPagesMenu;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ["i-scom-pages-menu"]: ScomPagesMenuElement;
            }
        }
    }
    export default class ScomPagesMenu extends Module {
        private _data;
        private pnlPagesMenu;
        static create(options?: ScomPagesMenuElement, parent?: Container): Promise<ScomPagesMenu>;
        constructor(parent?: Container, options?: ScomPagesMenuElement);
        get data(): IPagesMenu;
        init(): void;
        onMenuClicked(cid: string): void;
        renderTreeNode(page: IPageData, node: TreeNode): void;
        renderTree(data: IPagesMenu): void;
        updateMenu(value: IPagesMenu): void;
        render(): any;
    }
}
