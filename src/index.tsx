import {
  Module,
  customModule,
  Styles,
  Panel,
  ControlElement,
  customElements,
  Container,
  IDataSchema,
  IUISchema,
  Button,
  Control,
  Label,
  Icon,
  VStack,
  Menu,
  IMenuItem,
  TreeView,
  TreeNode,
} from '@ijstech/components';
import { pagesMenuStyle } from './index.css';
import { IPagesMenu, IPageData } from './interface'
const Theme = Styles.Theme.ThemeVars;

interface ScomPagesMenuElement extends ControlElement {
  data: IPagesMenu
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

  private _data: IPagesMenu;
  private pnlPagesMenu: Panel;

  static async create(options?: ScomPagesMenuElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  constructor(parent?: Container, options?: ScomPagesMenuElement) {
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

  onMenuClicked(cid: string) {
    console.log(`clicked on ${cid}`)
  }

  renderTreeNode(page: IPageData, node: TreeNode) {
    node.caption = page.name;
    node.collapsible = true;

    if (page.cid) node.onClick = () => this.onMenuClicked(page.cid);

    if (page.pages) {
      page.pages.map((child: any) => {
        const newNode = new TreeNode();
        node.appendNode(newNode);
        this.renderTreeNode(child, newNode);
      });
    }
  }

  renderTree(data: IPagesMenu) {
    const treeElm = new TreeView(this.pnlPagesMenu);
    data.pages.map((page: IPageData) => {
      const node = treeElm.add();
      this.renderTreeNode(page, node);
    });
  }

  updateMenu(value: IPagesMenu) {
    this._data = value;
    this.renderTree(this._data)
  }

  render() {
    return (
      <i-panel id="pnlPagesMenu" minHeight={25}>
        <i-tree-view id="treeView"></i-tree-view>
      </i-panel>
    )
  }
}