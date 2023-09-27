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
    import { IPagesMenu, IPageData } from "@scom/scom-pages-menu/interface.ts";
    export { IPagesMenu, IPageData } from "@scom/scom-pages-menu/interface.ts";
    type OnChanged = (newPage: IPageData, oldPage: IPageData) => void;
    type MenuMode = 'editor' | 'viewer';
    interface ScomPagesMenuElement extends ControlElement {
        data?: IPagesMenu;
        activePageUuid?: string;
        mode?: MenuMode;
        onChanged: OnChanged;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ["i-scom-pages-menu"]: ScomPagesMenuElement;
            }
        }
    }
    export default class ScomPagesMenu extends Module {
        private onChanged;
        private expandedMenuItem;
        private pnlMenu;
        private draggingPageUUid;
        private isEditing;
        private focusedPageId;
        private _activePageUuid;
        private _mode;
        private btnAddRootPage;
        static create(options?: ScomPagesMenuElement, parent?: Container): Promise<ScomPagesMenu>;
        constructor(parent?: Container, options?: ScomPagesMenuElement);
        getData(): IPagesMenu;
        setData(value: IPagesMenu): void;
        get mode(): MenuMode;
        set mode(value: MenuMode);
        get activePageUuid(): string;
        set activePageUuid(value: string);
        private noDataTxt;
        init(): void;
        private initEventBus;
        private initEventListener;
        private initMenuCardEventListener;
        private setfocusCard;
        private getActiveDropLineUuid;
        private showDropBox;
        private reorderPage;
        private setActiveDropLine;
        private renderChildren;
        private removeChildren;
        renderMenu(firstHierarichyExpand?: boolean): void;
        private renderDropLine;
        private onClickAddChildBtn;
        private onClickMenuCard;
        private renderMenuCard;
        private changeChildrenVisibility;
        private setCardTitle;
        private onClickRemoveBtn;
        private onClickRenameBtn;
        private onClickConfirmBtn;
        private onClickCancelBtn;
        private toggleRenameBtn;
        private toggleEditor;
        render(): any;
    }
}
