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
  VStack
} from '@ijstech/components';
import { containerStyle, buttonStyle, resultPnlStyle, quizWrapperStyle } from './index.css';
const Theme = Styles.Theme.ThemeVars;

interface ScomPagesMenuElement extends ControlElement {
  data: any
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

  static async create(options?: ScomPagesMenuElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  constructor(parent?: Container, options?: ScomPagesMenuElement) {
    super(parent, options);
  }


  init() {
    super.init();
  }

  render() {
    return (
      <i-vstack id="pnlPagesMenu" minHeight={25}>
        <i-label caption="INIT"></i-label>
      </i-vstack>
    )
  }
}