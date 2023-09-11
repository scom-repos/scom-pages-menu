var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-pages-menu/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.resultPnlStyle = exports.buttonStyle = exports.containerStyle = exports.quizWrapperStyle = void 0;
    const Theme = components_1.Styles.Theme.ThemeVars;
    exports.quizWrapperStyle = components_1.Styles.style({
        overflow: 'auto'
    });
    exports.containerStyle = components_1.Styles.style({
        // overflow: 'hidden',
        margin: '0 auto',
        padding: '1rem 1rem',
        $nest: {
            '&.answer': {
                transition: 'filter 0.3s',
                cursor: 'pointer',
                $nest: {
                    '&:hover': {
                        filter: 'brightness(0.95)'
                    },
                    '.answer-label-inner': {
                        position: 'absolute',
                        top: '-14px',
                        opacity: 0,
                        border: `1.5px solid var(--colors-primary-main)`,
                        borderRadius: '0.25rem',
                        padding: '0.25rem 1.25rem !important'
                    },
                    '.answer-label-outer': {
                        position: 'absolute',
                        top: '-14px',
                        opacity: 0,
                        border: `1.5px solid var(--colors-primary-main)`,
                        borderRadius: '0.25rem',
                        padding: '0.25rem 1.25rem !important'
                    },
                    '&.selected': {
                        $nest: {
                            '.inner-container': {
                                border: `1.5px solid var(--colors-primary-main)`,
                                borderRadius: '0.25rem',
                                padding: '1rem 1rem !important'
                            },
                            '.answer-icon': {
                                opacity: 1
                            },
                            '.answer-label-inner': {
                                opacity: 1,
                                border: `1.5px solid var(--colors-primary-main)`,
                                // color: `var(--colors-primary-main) !important`
                            }
                        }
                    },
                    '&.selected-correct': {
                        $nest: {
                            '.inner-container': {
                                border: `1.5px solid var(--colors-success-main)`,
                                borderRadius: '0.25rem',
                                padding: '1rem 1rem !important'
                            },
                            '.answer-icon': {
                                opacity: 1
                            },
                            '.answer-label-inner': {
                                opacity: 1,
                                border: `1.5px solid var(--colors-success-main)`,
                                // color: `var(--colors-success-main) !important`
                            }
                        }
                    },
                    '&.selected-incorrect': {
                        $nest: {
                            '.inner-container': {
                                border: `1.5px solid var(--colors-error-main)`,
                                borderRadius: '0.25rem',
                                padding: '1rem 1rem !important'
                            },
                            '.answer-icon': {
                                opacity: 1
                            },
                            '.answer-label-inner': {
                                opacity: 1,
                                border: `1.5px solid var(--colors-error-main)`,
                                // color: `var(--colors-error-main) !important`
                            }
                        }
                    },
                    '&.show-correct': {
                        zIndex: 15,
                        border: `1.5px solid var(--colors-success-main)`,
                        borderRadius: '0.25rem',
                        padding: '1.5rem 1rem !important',
                        overflow: 'visible',
                        $nest: {
                            '.inner-container': {},
                            '.answer-icon': {
                                opacity: 1
                            },
                            '.answer-label-outer': {
                                opacity: 1,
                                border: `1.5px solid var(--colors-success-main)`,
                                // color: `var(--colors-error-main) !important`
                            }
                        }
                    }
                }
            },
            '.answer-icon': {
                opacity: 0,
                border: '1px solid #fff',
                borderRadius: '50%',
                transition: 'opacity 0.3s',
            },
            '&:hover': {
                $nest: {
                    '.answer-icon': {
                        opacity: 1
                    }
                }
            },
        }
    });
    exports.buttonStyle = components_1.Styles.style({
        padding: '1rem 0.5rem',
        border: '1px solid var(--divider)',
        $nest: {
            '&:hover': {
                filter: 'brightness(0.85)'
            },
            '> i-icon:hover': {
                fill: `${Theme.colors.primary.contrastText} !important`
            },
            '&.disabled-btn': {
                cursor: 'no-drop !important',
                filter: 'brightness(0.85)'
            }
        }
    });
    exports.resultPnlStyle = components_1.Styles.style({
        padding: '1rem 1.5rem',
        borderRadius: '0.25rem',
        $nest: {
            '&.unanswered': {
                border: '1px solid var(--divider)',
            },
            '&.correct': {
                border: '1px solid var(--colors-success-main)',
            },
            '&.incorrect': {
                border: '1px solid var(--colors-error-main)',
            }
        }
    });
});
define("@scom/scom-pages-menu", ["require", "exports", "@ijstech/components"], function (require, exports, components_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_2.Styles.Theme.ThemeVars;
    let ScomPagesMenu = class ScomPagesMenu extends components_2.Module {
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        constructor(parent, options) {
            super(parent, options);
        }
        init() {
            super.init();
        }
        render() {
            return (this.$render("i-vstack", { id: "pnlPagesMenu", minHeight: 25 },
                this.$render("i-label", { caption: "INIT" })));
        }
    };
    ScomPagesMenu = __decorate([
        components_2.customModule,
        (0, components_2.customElements)('i-scom-pages-menu')
    ], ScomPagesMenu);
    exports.default = ScomPagesMenu;
});
