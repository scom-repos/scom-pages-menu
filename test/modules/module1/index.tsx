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

    testOnChangedFunction(newPage: any, oldPage: any) {
        console.log("testOnChangedFunction")
        console.log("newPage", newPage)
        console.log("oldPage", oldPage)
    }

    testOnRenamedFunction(page: any) {
        console.log("testOnRenamedFunction")
        console.log("page", page)
    }

    testOnAddedPageFunction(page: any) {
        console.log("testOnAddedPageFunction")
        console.log("page", page)
    }

    testOnDeletedPageFunction(page: any) {
        console.log("testOnDeletedPageFunction")
        console.log("page", page)
    }

    render() {
        return <i-panel>

            <i-scom-pages-menu id="menu" width="300px"
                display={'block'} mode={'editor'}
                onChanged={this.testOnChangedFunction}
                onRenamed={this.testOnRenamedFunction}
                onAddedPage={this.testOnAddedPageFunction}
                onDeletedPage={this.testOnDeletedPageFunction}
            ></i-scom-pages-menu>
        </i-panel>
    }
}