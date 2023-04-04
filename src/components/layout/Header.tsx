import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';

const Header = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        color: (theme) => theme.palette.primary.main,
        backdropFilter: 'blur(6px)',
        boxShadow: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        padding: {
          xs: '1rem 0.5rem',
          sm: '1.5rem 0.5rem',
        },
      }}
    >
      <Toolbar
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
          a: { textDecoration: 'none' },
          height: { lg: 88 },
          maxWidth: 1536,
          boxShadow: (theme) => theme.shadows[1],
          width: '100%',
          borderRadius: '5px',
        }}
      >
        HEADER
      </Toolbar>
    </AppBar>
  );
};

export default Header;
