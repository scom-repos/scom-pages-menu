import { Module, customModule, Container } from '@ijstech/components';
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
        this.menu.setData(data);
    }

    testFunction(newPage: any, oldPage: any) {
        console.log("newPage", newPage)
        console.log("oldPage", oldPage)
        console.log("data", this.menu.getData())
    }

    render() {
        return <i-panel>

            <i-scom-pages-menu id="menu" width="300px"
                display={'block'} mode={'viewer'}
                onChanged={this.testFunction}></i-scom-pages-menu>

        </i-panel>
    }
}