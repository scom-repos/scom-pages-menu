/// <amd-module name="@scom/scom-pages-menu/index.css.ts" />
declare module "@scom/scom-pages-menu/index.css.ts" {
    export const quizWrapperStyle: string;
    export const containerStyle: string;
    export const buttonStyle: string;
    export const resultPnlStyle: string;
}
/// <amd-module name="@scom/scom-pages-menu" />
declare module "@scom/scom-pages-menu" {
    import { Module, ControlElement, Container } from '@ijstech/components';
    interface ScomPagesMenuElement extends ControlElement {
        data: any;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ["i-scom-pages-menu"]: ScomPagesMenuElement;
            }
        }
    }
    export default class ScomPagesMenu extends Module {
        static create(options?: ScomPagesMenuElement, parent?: Container): Promise<ScomPagesMenu>;
        constructor(parent?: Container, options?: ScomPagesMenuElement);
        init(): void;
        render(): any;
    }
}
