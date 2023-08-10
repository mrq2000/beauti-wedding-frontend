import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

export const FOOTER_HEIGHT = 56;

const FOOTER_TABS = [
  {
    path: '/designer',
    icon: HomeRoundedIcon,
    title: 'Home',
  },
  {
    path: '/designer/setting',
    icon: SettingsRoundedIcon,
    title: 'Setting',
  },
];
const Footer = () => {
  const location = useLocation();
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: { xs: FOOTER_HEIGHT, lg: 72 },
        paddingX: '24px',
        paddingY: '8px',
        background: 'white',
        width: '100%',
        borderTop: '1px solid #E7E8EC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack direction="row" spacing={{ xs: 3, md: 5 }}>
        {FOOTER_TABS.map((tab) => (
          <Box
            key={tab.path}
            display="flex"
            alignItems="center"
            flexDirection="column"
            onClick={() => navigate(tab.path)}
            sx={{
              color: location.pathname == tab.path ? theme.palette.primary.main : theme.palette.grey[600],
              cursor: 'pointer',

              '&:hover': {
                color: location.pathname == tab.path ? theme.palette.primary.main : theme.palette.grey[700],
              },
            }}
          >
            {<tab.icon fontSize="small" />}
            <Typography sx={{ fontSize: { xs: 12, lg: 14 }, fontWeight: location.pathname == tab.path ? 600 : 400 }}>
              {tab.title}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Footer;
