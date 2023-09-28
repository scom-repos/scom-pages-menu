import { Styles } from "@ijstech/components";
const Theme = Styles.Theme.ThemeVars;

export const menuCardStyle = Styles.style({
  cursor: 'pointer',
  opacity: 1,
  transition: '0.3s',
  $nest: {
    '&:hover': {
      backgroundColor: "#b8e4f2",
      $nest: {
        '&.dark': {
          backgroundColor: "#303030",

        }
      }
    },
    'i-label': {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      '-webkit-line-clamp': 2,
      WebkitBoxOrient: 'vertical',
      lineHeight: 1.25
    },
    '> i-image img': {
      width: 40,
      height: 40,
      objectFit: 'cover',
      borderRadius: 5
    },
    '&.dark .focused-card': {
      color: "var(--text-primary) !important"
    },
    '.focused-card': {
      color: "var(--text-primary) !important",
      fontWeight: "600 !important"
    }
  }
})

export const iconButtonStyle = Styles.style({
  borderRadius: '10px',
  $nest: {
    '&:hover': {
      backgroundColor: '#abccd4 !important',
      $nest: {
        '&.dark': {
          backgroundColor: "#303030 !important"
        }
      }
    }
  }
})

export const menuStyle = Styles.style({
  $nest: {
    '.active-drop-line': {
      background: '#4286f4',
      opacity: 1
    },
    '&.dark .active-drop-line': {
      background: "#ffffff !important"
    },
    '.inactive-drop-line': {
      background: '#fafafa',
      opacity: 0
    },
    '&.dark .inactive-drop-line': {
      background: "#303030 !important"
    },
  }
})

export const mainWrapperStyle = Styles.style({
  background: '#fafafa',
  $nest: {
    '&.dark': {
      background: "#303030 !important"
    }
  }
})
