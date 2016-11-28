import {
  cyan200,
  cyan500,
  grey100,
  grey300,
  grey500,
  orange500,
  white,
  darkBlack,
  fullBlack,
} from 'material-ui/styles/colors'
import { fade } from 'material-ui/utils/colorManipulator'

const font = {
  fontFamily: 'Helvetica Neue, Helvetica, sans-serif',
  fontSize: '13px',
}

const colors = {
  primary: 'rgba(68, 95, 127, 0.84)',
  text: '#767676',
}

const cyanTheme = {
  zDepthShadows: 'none',
  spacing: {
    iconSize: 24,
    desktopGutter: 24,
    desktopGutterMore: 32,
    desktopGutterLess: 16,
    desktopGutterMini: 8,
    desktopKeylineIncrement: 64,
    desktopDropDownMenuItemHeight: 32,
    desktopDropDownMenuFontSize: 15,
    desktopDrawerMenuItemHeight: 48,
    desktopSubheaderHeight: 48,
    desktopToolbarHeight: 56,
  },
  paper: {
    zDepthShadows: 'none',
  },
  button: {
    backgroundColor: 'grey',
  },
  componentStyles: {
    sideBarMenuItemStyle: {
      color: 'white',
      ...font,
    },
    sideBarMenuItemSelectedStyle: {
      backgroundColor: 'white',
    },
    drawerStyle: {
      backgroundColor: 'rgb(31, 39, 67)',
      boxShadow: 'none',
      overflowX: 'hidden',
    },
    navbarStyle: {
      backgroundColor: 'transparent',
      border: 'none',
      marginBottom: '10px',
      padding: '0px',
    },
    breadcrumbStyle: {
      backgroundColor: 'transparent',
      border: 'none',
      padding: '8px 0px',
      margin: 0,
      fontSize: '14px',
      fontFamily: font.fontFamily,
    },
    tabStyle: {
      backgroundColor: white,
      color: 'gray',
      fontSize: '12px',
      fontWeight: 700,
    },
    paperStyle: {
      boxShadow: 'none',
      border: '1px solid #eaeaea',
    },
    appBarStyle: {
      backgroundColor: 'white',
      height: '65px',
      paddingLeft: '10px',
      paddingRight: '10px',
      borderBottom: '1px solid #eeeeee',
    },
  },
  ...font,
  palette: {
    primary1Color: colors.primary,
    primary2Color: 'rgba(13, 133, 146, 0.74)',
    primary3Color: 'rgba(13, 133, 146, 0.38)',
    accent1Color: 'rgb(199, 166, 174)',
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: colors.text,
    menuColor: colors.text,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
    appBarBackgroundColor: 'white',
    link1Color: colors.text,
    link2Color: cyan200,
    tabsBackgroundColor: 'white',
    errorTextColor: orange500,
  },
  font: {
    normalFontSize: '12px',
    largeFontSize: '14px',
    color: '#34495e',
  },
}

export default cyanTheme
