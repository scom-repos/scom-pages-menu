/// <amd-module name="@scom/scom-pages-menu/index.css.ts" />
declare module "@scom/scom-pages-menu/index.css.ts" {
    export const menuCardStyle: string;
    export const iconButtonStyle: string;
    export const menuStyle: string;
    export const modalStyle: string;
}
/// <amd-module name="@scom/scom-pages-menu/interface.ts" />
declare module "@scom/scom-pages-menu/interface.ts" {
    export interface IPagesMenuItem {
        uuid: string;
        name: string;
        url: string;
        pages?: IPagesMenuItem[];
    }
    export interface IPagesMenu {
        pages: IPagesMenuItem[];
    }
}
/// <amd-module name="@scom/scom-pages-menu/store.ts" />
declare module "@scom/scom-pages-menu/store.ts" {
    import { IPagesMenuItem, IPagesMenu } from "@scom/scom-pages-menu/interface.ts";
    export class PagesObject {
        private _data;
        get data(): IPagesMenu;
        set data(value: IPagesMenu);
        getPage(uuid: string, currentPage?: IPagesMenuItem): IPagesMenuItem | undefined;
        setPage(uuid: string, newName?: string, newURL?: string, newCid?: string, newPages?: IPagesMenuItem[], currentPage?: IPagesMenuItem): boolean;
        addPage(newPage: IPagesMenuItem, parentId?: string, index?: number): boolean;
        deletePage(uuid: string, currentPage?: IPagesMenuItem, parent?: IPagesMenuItem): boolean;
        getParent(uuid: string): IPagesMenuItem;
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
    import { IPagesMenu, IPagesMenuItem } from "@scom/scom-pages-menu/interface.ts";
    export { IPagesMenu, IPagesMenuItem } from "@scom/scom-pages-menu/interface.ts";
    type OnChanged = (newPage: IPagesMenuItem, oldPage: IPagesMenuItem) => void;
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
        convertToUrl(inputString: string): string;
        private setCardData;
        private onClickRemoveBtn;
        private onClickRenameBtn;
        private onClickConfirmBtn;
        private onClickCancelBtn;
        private toggleRenameBtn;
        private toggleEditor;
        render(): any;
    }
}
