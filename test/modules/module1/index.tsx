import { Module, customModule, Container } from '@ijstech/components';
import assets from '@modules/assets';

@customModule
export default class Module1 extends Module {

    constructor(parent?: Container, options?: any) {
        super(parent, options);
    }

    async init() {
        super.init();
    }

    render() {
        return <i-vstack margin={{ left: '1rem', top: '1rem' }} horizontalAlignment='center' position='relative'>
            
        </i-vstack>
    }
}