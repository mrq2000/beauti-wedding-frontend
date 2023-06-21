import { Box } from '@mui/material';

export const FOOTER_HEIGHT = 72;

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
