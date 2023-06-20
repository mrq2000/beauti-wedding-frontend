import { Box } from '@mui/material';
import BrushRoundedIcon from '@mui/icons-material/BrushRounded';

export const FOOTER_HEIGHT = 72;

const SETTINGS = [
  {
    title: 'Thiệp cưới',
    key: 'DESIGNS',
    icon: BrushRoundedIcon,
  },
  {
    title: 'Cài đặt tài khoản',
    key: 'SETTING',
    icon: BrushRoundedIcon,
  },
];

const Footer = () => {
  return (
    <Box
      sx={{
        height: FOOTER_HEIGHT,
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
      Footer
    </Box>
  );
};

export default Footer;
