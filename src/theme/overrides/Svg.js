// ----------------------------------------------------------------------

export default function Svg(theme, mode) {
  return {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          '&.svg-custom': {
            filter:
              mode === 'light'
                ? 'invert(0%) sepia(0%) saturate(7500%) hue-rotate(217deg) brightness(108%) contrast(108%)'
                : 'invert(100%) sepia(10%) saturate(555%) hue-rotate(194deg) brightness(117%) contrast(100%)',
          },
          '&.svg-sidebar-active': {
            filter: 'invert(55%) sepia(93%) saturate(6817%) hue-rotate(265deg) brightness(100%) contrast(103%)',
          },
          '&.secondary-custom-svg-active': {
            filter:
              mode === 'light'
                ? 'invert(14%) sepia(75%) saturate(4299%) hue-rotate(243deg) brightness(77%) contrast(139%)'
                : 'invert(61%) sepia(71%) saturate(734%) hue-rotate(195deg) brightness(101%) contrast(101%)',
          },
        },
      },
    },
  };
}
