import { Styles } from "@ijstech/components";
const Theme = Styles.Theme.ThemeVars;

export const menuCardStyle = Styles.style({
  cursor: 'pointer',
  opacity: 1,
  transition: '0.3s',
  $nest: {
    '&:hover': {
      backgroundColor: "#b8e4f2"
    },
    'i-label': {
      overflow: 'hidden',
      // whiteSpace: 'nowrap',
      // textOverflow: 'ellipsis',
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
    '.focused-card': {
      color: "#0247bf !important",
      fontWeight: "600 !important"
    }
  }
})

export const iconButtonStyle = Styles.style({
  borderRadius: '10px',
  $nest: {
    '&:hover': {
      backgroundColor: '#abccd4 !important'
    }
  }
})

export const menuStyle = Styles.style({
  $nest: {
    '.active-drop-line': {
      background: 'rgb(66,133,244)',
      opacity: 1
    },
    '.inactive-drop-line': {
      background: 'rgb(0,0,0)',
      opacity: 0
    }
  }
})

export const modalStyle = Styles.style({
  $nest: {
    '.modal': {
      padding: 0,
      borderRadius: 4
    },
  }
})
