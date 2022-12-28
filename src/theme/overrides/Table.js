export default function Table(theme, isLightMode) {
  return {
    MuiTable: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& tr': {
            borderBottom: 'none',
            '& th': {
              backgroundColor: isLightMode ? theme.palette.grey[200] : `${theme.palette.grey[700]}4D`,
            },
          },
          '& th:first-of-type': {
            borderTopLeftRadius: '8px',
            borderBottomLeftRadius: '8px',
          },
          '& th:last-child': {
            borderTopRightRadius: '8px',
            borderBottomRightRadius: '8px',
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          borderBottom: `0.5px solid ${isLightMode ? theme.palette.grey[400] : theme.palette.grey[700]}`,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: 'none',
        },
      },
    },
  };
}
