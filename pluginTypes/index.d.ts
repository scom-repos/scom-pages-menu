/// <amd-module name="@scom/scom-pages-menu/index.css.ts" />
declare module "@scom/scom-pages-menu/index.css.ts" {
    export const menuCardStyle: string;
    export const iconButtonStyle: string;
    export const menuStyle: string;
}
/// <amd-module name="@scom/scom-pages-menu/interface.ts" />
declare module "@scom/scom-pages-menu/interface.ts" {
    export interface IPageData {
        uuid: string;
        name: string;
        cid?: string;
        url?: string;
        pages?: IPageData[];
    }
    export interface IPagesMenu {
        pages: IPageData[];
    }
}
/// <amd-module name="@scom/scom-pages-menu/store.ts" />
declare module "@scom/scom-pages-menu/store.ts" {
    import { IPageData, IPagesMenu } from "@scom/scom-pages-menu/interface.ts";
    export class PagesObject {
        private _data;
        get data(): IPagesMenu;
        set data(value: IPagesMenu);
        getPage(uuid: string, currentPage?: IPageData): IPageData | undefined;
        setPage(uuid: string, newName?: string, newCid?: string, newPages?: IPageData[], currentPage?: IPageData): boolean;
        addPage(newPage: IPageData, parentId?: string, index?: number): boolean;
        deletePage(uuid: string, currentPage?: IPageData, parent?: IPageData): boolean;
        getParent(uuid: string): IPageData;
        private findParent;
    }
    export const pagesObject: PagesObject;
}
/// <amd-module name="@scom/scom-pages-menu/utils.ts" />
declare module "@scom/scom-pages-menu/utils.ts" {
    export const generateUUID: () => string;
}
/// <amd-module name="@scom/scom-pages-menu" />
declare module "@scom/scom-pages-menu" {
    import { Module, ControlElement, Container } from '@ijstech/components';
    import { IPagesMenu } from "@scom/scom-pages-menu/interface.ts";
    type RedirectByCid = (cid: string) => void;
    interface ScomPagesMenuElement extends ControlElement {
        data: IPagesMenu;
        redirectByCid: RedirectByCid;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ["i-scom-pages-menu"]: ScomPagesMenuElement;
            }
        }
    }
    export default class ScomPagesMenu extends Module {
        private redirectByCid;
        static create(options?: ScomPagesMenuElement, parent?: Container): Promise<ScomPagesMenu>;
        constructor(parent?: Container, options?: ScomPagesMenuElement);
        get data(): IPagesMenu;
        set data(value: IPagesMenu);
        private pnlMenu;
        private draggingPageUUid;
        private isEditing;
        private focusedPageId;
        private activePageUUid;
        private noDataTxt;
        init(): void;
        private initEventBus;
        private initEventListener;
        private initMenuCardEventListener;
        setfocusCard(uuid: string): void;
        private getActiveDropLineUuid;
        private showDropBox;
        private reorderPage;
        private setActiveDropLine;
        renderChildren(parentUUid: string): void;
        removeChildren(parentUUid: string): void;
        renderMenu(): void;
        renderDropLine(uuid: string): any;
        onClickAddChildBtn(parentUuid: string): void;
        onClickMenuCard(uuid: string): void;
        renderMenuCard(uuid: string, name: string, cid: string, isActive: boolean, level: number): any;
        changeChildrenVisibility(uuid: string): void;
        private setCardTitle;
        private onClickRemoveBtn;
        private onClickRenameBtn;
        private onClickConfirmBtn;
        private onClickCancelBtn;
        private toggleRenameBtn;
        private toggleEditor;
        private redirect;
        render(): any;
    }
}
