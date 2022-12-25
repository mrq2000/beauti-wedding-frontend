// ----------------------------------------------------------------------

export default function Dialog() {
  return {
    MuiDialog: {
      defaultProps: {
        elevation: 0,
      },

      styleOverrides: {
        paper: {
          boxShadow: 'none',
          margin: '16px',
        },
      },
    },
  };
}
