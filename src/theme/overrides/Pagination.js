export default function Pagination(theme, mode) {
  return {
    MuiPagination: {
      styleOverrides: {
        ul: {
          '& li button': {
            border: '1px solid rgba(145, 158, 171, 0.24)',
          },
        },
        MuiSelected: {
          border: `1px solid ${mode == 'light' ? `${theme.palette.primary.lighter}14` : theme.palette.primary.light}`,
        },
      },
    },
  };
}
