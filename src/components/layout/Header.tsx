import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';

const Header = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        color: (theme) => theme.palette.primary.main,
        backdropFilter: 'blur(6px)',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ a: { textDecoration: 'none' }, height: { lg: 88 } }}>HEADER</Toolbar>
    </AppBar>
  );
};

export default Header;
