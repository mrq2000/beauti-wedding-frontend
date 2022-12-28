export default function Pagination(theme, isLightMode) {
  return {
    MuiPagination: {
      styleOverrides: {
        ul: {
          '& li button': {
            border: '1px solid rgba(145, 158, 171, 0.24)',
          },
        },
        MuiSelected: {
          border: `1px solid ${isLightMode ? `${theme.palette.primary.lighter}14` : theme.palette.primary.light}`,
        },
      },
    },
  };
}
