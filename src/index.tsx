import {
  Module,
  customModule,
  Styles,
  Panel,
  ControlElement,
  customElements,
  Container,
  Button,
  Control,
  Label,
  Icon,
  VStack,
  Input,
  HStack
} from '@ijstech/components';
import { pagesMenuStyle, menuCardStyle, menuStyle } from './index.css';
import { IPagesMenu, IPageData } from './interface'
import { pagesObject } from './store'
import { generateUUID } from './utils'
const Theme = Styles.Theme.ThemeVars;

type RedirectByCid = (cid: string) => void;

interface ScomPagesMenuElement extends ControlElement {
  data: IPagesMenu,
  redirectByCid: RedirectByCid
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["i-scom-pages-menu"]: ScomPagesMenuElement;
    }
  }
}

@customModule
@customElements('i-scom-pages-menu')
export default class ScomPagesMenu extends Module {
  private redirectByCid: RedirectByCid;

  static async create(options?: ScomPagesMenuElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  constructor(parent?: Container, options?: ScomPagesMenuElement) {
    super(parent, options);
  }

  get data() {
    return pagesObject.data;
  }

  set data(value: IPagesMenu) {
    pagesObject.data = value;
    this.renderMenu();
  }

  private pnlMenu: VStack;
  private draggingPageUUid: string;
  private isEditing: boolean = false;
  private focusedPageId: string;
  private activePageUUid: string;

  private noDataTxt = "No Pages";

  init() {
    super.init();
    this.initEventBus();
    this.initEventListener();
    const data = this.getAttribute('data', true);
    this.redirectByCid = this.getAttribute('redirectByCid', true);
    pagesObject.data = data;
    this.renderMenu();
  }

  private initEventBus() {

  }

  private initEventListener() {
    this.addEventListener('dragstart', (event) => {
      const eventTarget = event.target as HTMLElement;
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

  private initMenuCardEventListener(card: Control) {
    card.addEventListener('mouseenter', (event) => {
      if (this.isEditing) return;
      this.toggleRenameBtn(card.getAttribute('uuid'), true);
    });
    card.addEventListener('mouseleave', (event) => {
      if (this.isEditing) return;
      this.toggleRenameBtn(card.getAttribute('uuid'), false);
    });
  }

  setfocusCard(uuid: string) {
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

  private getActiveDropLineUuid(): string {
    const dropLines = document.querySelectorAll('[id^="menuDropLine"]');
    for (let i = 0; i < dropLines.length; i++) {
      if (dropLines[i].classList.contains('active-drop-line')) {
        return dropLines[i].id.replace('menuDropLine-', '')
      }
    }
    return undefined;
  }

  private showDropBox(clientX: number, clientY: number) {
    const menuRect = this.pnlMenu.getBoundingClientRect();
    if (clientX < menuRect.left || clientX > menuRect.right) return;
    const menuCards = this.pnlMenu.querySelectorAll('#menuCard');
    for (let i = 0; i < menuCards.length; i++) {
      const menuCardRect = menuCards[i].getBoundingClientRect();
      if (clientY >= menuCardRect.top && clientY <= menuCardRect.bottom) {
        const middleLine = menuCardRect.top + menuCardRect.height / 2;
        // decide show top/bottom box
        let uuid: string;
        if (clientY < middleLine) {
          if (i == 0) uuid = 'start';
          else uuid = menuCards[i - 1].getAttribute('uuid');
        } else {
          uuid = menuCards[i].getAttribute('uuid');
        }
        this.setActiveDropLine(uuid);
        return;
      }
    }
  }

  private reorderPage(dragPageUUid: string, dropPageUUid: string) {
    const dragPage = pagesObject.getPage(dragPageUUid);
    const deletePage = pagesObject.deletePage(dragPageUUid);
    if (!deletePage) console.error(`Fail to delete the page with uuid: ${dragPageUUid}`);

    if (dropPageUUid == "start") {
      pagesObject.addPage(dragPage, undefined, 0)
    } else {
      // drop on a leef node, append to the back of this leef node
      const dropPageParent = pagesObject.getParent(dropPageUUid)
      if (dropPageParent) {
        // drop on non first hierarchy 
        const dropPageIdx = dropPageParent.pages.findIndex(p => p.uuid == dropPageUUid);
        pagesObject.addPage(dragPage, dropPageParent.uuid, dropPageIdx + 1);
        const dragMenuCard = this.pnlMenu.querySelector(`[uuid="${dragPageUUid}"]`).closest("#menuCardWrapper");
        dragMenuCard.setAttribute('parentUUid', dropPageUUid);
      } else {
        // drop on first hierarchy
        const dropPageIdx = pagesObject.data.pages.findIndex(p => p.uuid == dropPageUUid);
        pagesObject.addPage(dragPage, undefined, dropPageIdx + 1);
      }
    }
    this.renderMenu();
  }

  private setActiveDropLine(uuid: string) {
    const dropLines = document.querySelectorAll('[id^="menuDropLine"]');
    for (const dropLine of dropLines) {
      dropLine.classList.remove('active-drop-line');
      dropLine.classList.remove('inactive-drop-line');
      if (dropLine.id == `menuDropLine-${uuid}`) {
        dropLine.classList.add('active-drop-line');
      } else {
        dropLine.classList.add('inactive-drop-line');
      }
    }
  }

  renderChildren(parentUUid: string) {
    const parentElm = this.pnlMenu.querySelector(`[uuid="${parentUUid}"]`);
    const parentElmWrapper = parentElm.parentElement;
    const parentData = pagesObject.getPage(parentUUid);
    if (!parentData) return;

    const childrenList = parentData.pages;
    for (let i = childrenList.length - 1; i >= 0; i--) {
      const isExist = this.pnlMenu.querySelector(`[uuid="${childrenList[i].uuid}"]`);
      if (!isExist) {
        const nextLevel = parseInt(parentElm.getAttribute('level'));
        const childElm = this.renderMenuCard(childrenList[i].uuid, childrenList[i].name, childrenList[i].cid, false, nextLevel + 1);
        childElm.setAttribute('parentUUid', parentUUid);
        parentElmWrapper.parentElement.insertBefore(childElm, parentElmWrapper.nextSibling);
      }
    }
  }

  removeChildren(parentUUid: string) {
    const childElms = this.pnlMenu.querySelectorAll(`[parentuuid="${parentUUid}"]`);
    for (const childElm of childElms) {
      const grandChildElmExist = this.pnlMenu.querySelector(`[parentuuid="${childElm.querySelector('#menuCard').getAttribute('uuid')}"]`);
      if (grandChildElmExist) this.removeChildren(childElm.querySelector('#menuCard').getAttribute('uuid'));
      childElm.remove();
    }
  }

  renderMenu() {
    this.pnlMenu.clearInnerHTML();
    const items = pagesObject.data.pages.map((page: IPageData) => {
      return {
        caption: page.name || "Untitled Page",
        cid: page.cid,
        uuid: page.uuid,
        children: page.pages
      };
    })
    if (!items.length) {
      const txt = (
        <i-hstack
          verticalAlignment="center"
          horizontalAlignment='start'
          width="100%"
          overflow="hidden"
        >
          <i-label
            caption={this.noDataTxt}
            font={{ size: '16px', color: '#3b3838', weight: 530 }}
            padding={{ top: 8, bottom: 8, left: 8, right: 8 }}
            maxHeight={34}
            overflow={"hidden"}
          ></i-label>
        </i-hstack>);
      this.pnlMenu.appendChild(txt);
      return;
    }

    // set the titles here
    const firstDropLine = this.renderDropLine('start');
    this.pnlMenu.appendChild(firstDropLine);

    for (let i = 0; i < items.length; i++) {
      const isActive = this.activePageUUid == items[i].uuid;
      const menuCardWrapper = this.renderMenuCard(items[i].uuid, items[i].caption, items[i].cid, isActive, 0)
      this.pnlMenu.appendChild(menuCardWrapper);
      if (items[i].children && items[i].children.length > 0) this.renderChildren(items[i].uuid);
    }
  }

  renderDropLine(uuid: string) {
    return <i-panel id={`menuDropLine-${uuid}`} width={'100%'} height={'5px'}></i-panel>
  }

  onClickAddChildBtn(parentUuid: string) {
    pagesObject.addPage({
      uuid: generateUUID(),
      name: 'Untitled page',
      cid: '',
      url: ''
    }, parentUuid)
    this.renderMenu();
  }

  renderMenuCard(uuid: string, name: string, cid: string, isActive: boolean, level: number) {
    const menuCard = (
      <i-hstack
        id="menuCard"
        class={menuCardStyle}
        verticalAlignment="center"
        horizontalAlignment='space-between'
        width="100%"
        border={{ radius: 5 }}
        overflow="hidden"
        onClick={() => cid ? this.goToPage(uuid, cid) : this.handleChildren(uuid)}
      >
        <i-hstack verticalAlignment="center" horizontalAlignment='start'>
          <i-label
            id="cardDot"
            caption={"•"}
            font={{ size: '16px', color: '#3b3838', weight: 530 }}
            padding={{ top: 8, bottom: 8, left: 8 + level * 8, right: 8 }}
            maxHeight={34}
            overflow={"hidden"}
            class={isActive ? "focused-card" : ""}
          ></i-label>
          <i-label
            id="cardTitle"
            caption={name}
            font={{ size: '16px', color: '#3b3838', weight: 530 }}
            padding={{ top: 8, bottom: 8, left: 8, right: 8 }}
            maxHeight={34}
            class={isActive ? "focused-card" : ""}
            overflow={"hidden"}
          ></i-label>
          <i-input
            id="cardInput"
            visible={false}
            width='90%'
            height='40px'
            padding={{ left: '0.5rem', top: '0.5rem', bottom: '0.5rem', right: '0.5rem' }}
          ></i-input>
        </i-hstack>
        <i-hstack id="actionBtnStack" verticalAlignment="center" visible={false}>
          <i-icon
            id="cardAddChildBtn"
            name='plus'
            fill={'var(--colors-primary-main)'}
            width={28} height={28}
            padding={{ top: 7, bottom: 7, left: 7, right: 7 }}
            margin={{ right: 4 }}
            class="pointer iconButton"
            // visible={false}
            tooltip={{ content: "Add child", placement: "top" }}
            onClick={() => this.onClickAddChildBtn(uuid)}
          ></i-icon>
          <i-icon
            id="cardRenameBtn"
            name='pen'
            fill={'var(--colors-primary-main)'}
            width={28} height={28}
            padding={{ top: 7, bottom: 7, left: 7, right: 7 }}
            margin={{ right: 4 }}
            class="pointer iconButton"
            // visible={false}
            tooltip={{ content: "Rename", placement: "top" }}
            onClick={() => this.onClickRenameBtn(uuid)}
          ></i-icon>
        </i-hstack>
        <i-hstack id="editBtnStack" verticalAlignment="center" visible={false}>
          <i-icon
            name='times'
            width={28} height={28}
            fill={'var(--colors-primary-main)'}
            padding={{ top: 7, bottom: 7, left: 7, right: 7 }}
            margin={{ right: 4 }}
            class="pointer iconButton"
            tooltip={{ content: "Cancel", placement: "top" }}
            onClick={() => this.onClickCancelBtn(uuid)}
          ></i-icon>
          <i-icon
            name="check"
            width={28} height={28}
            fill={'var(--colors-primary-main)'}
            padding={{ top: 7, bottom: 7, left: 7, right: 7 }}
            margin={{ right: 4 }}
            class="pointer iconButton"
            tooltip={{ content: "Confirm", placement: "top" }}
            onClick={() => this.onClickConfirmBtn(uuid)}
          ></i-icon>
        </i-hstack>
      </i-hstack>
    );
    menuCard.setAttribute('uuid', uuid);
    menuCard.setAttribute('draggable', 'true');
    menuCard.setAttribute('cid', cid);
    menuCard.setAttribute('level', level);
    this.initMenuCardEventListener(menuCard);

    const dropLine = this.renderDropLine(uuid);

    const menuWrapper = (<i-vstack id="menuCardWrapper">
      {menuCard}
      {dropLine}
    </i-vstack>)

    return menuWrapper;
  }

  handleChildren(uuid: string) {
    const isChildExist = this.pnlMenu.querySelector(`[parentUUid="${uuid}"]`);
    if (isChildExist) {
      this.removeChildren(uuid);
    } else {
      this.renderChildren(uuid);
    }
  }

  private setCardTitle(uuid: string) {
    const currCard = this.pnlMenu.querySelector(`[uuid="${uuid}"]`) as HTMLElement;
    const cardInput = currCard.querySelector('#cardInput') as Input;
    const caption = cardInput.value;

    // change data
    pagesObject.setPage(uuid, caption);

    // change UI on-the-fly
    const cardTitle = currCard.querySelector('#cardTitle');
    (cardTitle as Label).caption = caption;
  }

  private onClickRenameBtn(uuid: string) {
    this.toggleEditor(uuid, true);
  }

  private onClickConfirmBtn(uuid: string) {
    this.setCardTitle(uuid);
    this.toggleEditor(uuid, false);
  }

  private onClickCancelBtn(uuid: string) {
    this.toggleEditor(uuid, false);
  }

  private toggleRenameBtn(uuid: string, toggle: boolean) {
    const currCard = this.pnlMenu.querySelector(`[uuid="${uuid}"]`) as HTMLElement;
    const actionBtnStack = currCard.querySelector('#actionBtnStack');
    (actionBtnStack as HStack).visible = toggle;
  }

  private toggleEditor(uuid: string, toggle: boolean) {
    this.isEditing = toggle;

    const currCard = this.pnlMenu.querySelector(`[uuid="${uuid}"]`) as HTMLElement;
    const cardTitle = currCard.querySelector('#cardTitle');
    const cardInput = currCard.querySelector('#cardInput');
    const actionBtnStack = currCard.querySelector('#actionBtnStack');

    (cardInput as Input).value = (cardTitle as Label).caption;
    (cardTitle as Label).visible = !toggle;
    (cardInput as Input).visible = toggle;
    (actionBtnStack as HStack).visible = !toggle;
    const editBtnStack = currCard.querySelector('#editBtnStack') as HStack;
    editBtnStack.visible = toggle;
  }

  private goToPage(uuid: string, cid: string) {
    this.activePageUUid = uuid;
    if (this.redirectByCid) this.redirectByCid(cid);
  }

  render() {
    return (
      <i-vstack gap={"0.5rem"} background={{ color: "#FAFAFA" }} height={"100%"}
        padding={{ top: '1.5rem', left: '1.5rem', right: '1.5rem', bottom: '1.5rem' }}>
        <i-hstack gap={'1rem'} verticalAlignment='center'>
          <i-label caption={"Pages menu"} font={{ color: 'var(--colors-primary-main)', weight: 750, size: '18px' }}
            class="prevent-select"></i-label>
        </i-hstack>
        <i-vstack id="pnlMenuWrapper" width={"100%"}>
          <i-vstack id='pnlMenu' class={menuStyle}></i-vstack>
        </i-vstack>
      </i-vstack>
    )
  }
}