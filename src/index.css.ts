import { Styles } from "@ijstech/components";
const Theme = Styles.Theme.ThemeVars;

export const quizWrapperStyle = Styles.style({
  overflow: 'auto'
})

export const containerStyle = Styles.style({
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
            '.inner-container': {

            },
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
})

export const buttonStyle = Styles.style({
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
})

export const resultPnlStyle = Styles.style({
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
})
