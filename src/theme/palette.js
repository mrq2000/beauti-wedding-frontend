import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

function createGradient(color1, color2) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS
const GREY = {
  0: '#FFFFFF',
  100: '#FFFFFF',
  200: '#F1F2F5',
  300: '#E7E8EC',
  400: '#D5D8DF',
  500: '#C5C8CF',
  600: '#A6A9AF',
  700: '#6F7581',
  800: '#333841',
  900: '#000000',
  500_8: alpha('#C5C8CF', 0.08),
  500_12: alpha('#C5C8CF', 0.12),
  500_16: alpha('#C5C8CF', 0.16),
  500_24: alpha('#C5C8CF', 0.24),
  500_32: alpha('#C5C8CF', 0.32),
  500_48: alpha('#C5C8CF', 0.48),
  500_56: alpha('#C5C8CF', 0.56),
  500_80: alpha('#C5C8CF', 0.8),
};

const PRIMARY = {
  lighter: '#C8FACD',
  light: '#5BE584',
  main: '#00AB55',
  dark: '#007B55',
  darker: '#005249',
  contrastText: '#fff',
};

const SECONDARY = {
  lighter: '#D6E4FF',
  light: '#84A9FF',
  main: '#3366FF',
  dark: '#1939B7',
  darker: '#091A7A',
  contrastText: '#fff',
};

const INFO = {
  lighter: '#C7E6FF',
  light: '#69C9FF',
  main: '#0888FF',
  dark: '#0041BE',
  darker: '#012B7C',
  contrastText: '#fff',
};

const SUCCESS = {
  lighter: '#CEFFC7',
  light: '#89FF7A',
  main: '#00D021',
  dark: '#0D8821',
  darker: '#086016',
  contrastText: GREY[800],
};

const WARNING = {
  lighter: '#FFF7CB',
  light: '#FFE588',
  main: '#FFBA07',
  dark: '#C28E08',
  darker: '#935205',
  contrastText: GREY[800],
};

const ERROR = {
  lighter: '#FFE4E1',
  light: '#FCA79C',
  main: '#F03D3D',
  dark: '#AB0321',
  darker: '#6B1020',
  contrastText: '#fff',
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
};

const CHART_COLORS = {
  violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
  blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
  green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
  yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
  red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4'],
};

const getPalette = (isLightMode) => ({
  common: { black: '#000', white: '#fff' },
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR },
  grey: GREY,
  gradients: GRADIENTS,
  chart: CHART_COLORS,
  divider: isLightMode ? GREY[400] : GREY[700],
  text: isLightMode
    ? { primary: '#000000', secondary: GREY[700], disabled: GREY[500] }
    : {
        primary: '#fff',
        secondary: GREY[400],
        disabled: GREY[600],
      },
  background: isLightMode
    ? { paper: '#ffffff', default: '#F6F6F8', neutral: GREY[200] }
    : { paper: '#333841', default: '#2D3139', neutral: GREY[200] },
  action: {
    active: GREY[600],
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
});

export default getPalette;
