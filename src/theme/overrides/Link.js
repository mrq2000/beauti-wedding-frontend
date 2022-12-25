// ----------------------------------------------------------------------

export default function Link(theme) {
  return {
    MuiLink: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
          textDecorationColor: theme.palette.text.primary,
        },
      },
    },
  };
}
