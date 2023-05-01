import PropTypes from 'prop-types';
import { useMemo } from 'react';
// material
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
//
import getPalette from './palette';
import typography from './typography';
import componentsOverride from './overrides';
import { customShadows } from './shadows';

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default function ThemeProvider({ children, mode }) {
  const themeOptions = useMemo(
    () => ({
      palette: getPalette(mode == 'light'),
      shape: { borderRadius: 8 },
      typography,
      customShadows,
    }),
    [mode],
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme, mode == 'light');

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
