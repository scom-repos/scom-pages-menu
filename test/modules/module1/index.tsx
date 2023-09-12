import { Module, customModule, Container } from '@ijstech/components';
import assets from '@modules/assets';
import ScomPagesMenu from '@scom/scom-pages-menu'
import { data } from './data'

@customModule
export default class Module1 extends Module {

    private menu: ScomPagesMenu;

    constructor(parent?: Container, options?: any) {
        super(parent, options);
    }

    async init() {
        super.init();
    }

    render() {
        return <i-panel>

            <i-scom-pages-menu id="menu" data={data}></i-scom-pages-menu>

        </i-panel>
    }
}