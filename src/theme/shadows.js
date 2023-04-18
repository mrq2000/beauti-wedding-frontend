// material
import { alpha } from '@mui/material/styles';
import getPalette from './palette';

// ----------------------------------------------------------------------

const palette = getPalette();
const LIGHT_MODE = palette.grey[500];

const createShadow = () => {
  return [
    'none',
    '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  ];
};

const createCustomShadow = (color) => {
  const transparent = alpha(color, 0.24);

  return {
    down: `0 1px 2px 0 ${transparent}`,
    up: `0 8px 16px 0 ${transparent}`,
    primary: `-5px -5px 9px rgba(255,255,255,0.45), 5px 5px 9px rgba(94,104,121,0.3)`,
    secondary: `0 8px 16px 0 ${alpha(palette.secondary.main, 0.24)}`,
    info: `0 8px 16px 0 ${alpha(palette.info.main, 0.24)}`,
    success: `0 8px 16px 0 ${alpha(palette.success.main, 0.24)}`,
    warning: `0 8px 16px 0 ${alpha(palette.warning.main, 0.24)}`,
    error: `0 8px 16px 0 ${alpha(palette.error.main, 0.24)}`,
  };
};

export const customShadows = createCustomShadow(LIGHT_MODE);

const shadows = createShadow(LIGHT_MODE);

export default shadows;
