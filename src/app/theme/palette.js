import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';

const color = {
  mods: {
    500: "#D71440",
    900: "#999A28",
    100: "#04323F",
  }
}

export default {
  black,
  white,
  primary: {
    contrastText: white,
    dark: color.mods[900],
    main: color.mods[500],
    light: color.mods[100],
  },
  secondary: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue['A400'],
    light: colors.blue['A400']
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400]
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[600],
    link: colors.blue[600]
  },
  link: colors.blue[800],
  icon: colors.blueGrey[600],
  background: {
    default: '#F4F6F8',
    paper: white
  },
  divider: colors.grey[200]
};
