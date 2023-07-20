import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { FC } from 'react';
import Logo from '@/assets/logo.png';
import TKNH from '@/assets/tknh.jpg';

const BACKGROUND_IMG = 'https://taothiepcuoi.s3.ap-southeast-1.amazonaws.com/taothiepcuoi/background_v1.jpg';

const BuyCoffee: FC = () => {
  const navigate = useNavigate();

  return (
    <Box display="flex" flex={1} width="100%" height="100%" alignItems="center" justifyContent="center">
      <Box
        sx={{
          height: '100vh',
          backgroundImage: `url('${BACKGROUND_IMG}')`,
          backgroundSize: 'cover',
          width: '100vw',
          position: 'fixed',
          filter: 'contrast(0.9)',
        }}
      />
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        gap="16px"
        sx={{ maxWidth: 1200, padding: '16px', width: '100%', zIndex: 10 }}
        alignItems="center"
        justifyContent="center"
      >
        <Box display="flex" flex={1} justifyItems="center" alignItems="center">
          <Box
            component="img"
            src={TKNH}
            sx={{
              maxWidth: 400,
              width: '100%',
              boxShadow: '-11px 11px 8px #00000020',
              borderRadius: '16px',
            }}
          />
        </Box>
        <Box
          display="flex"
          flex={1}
          flexDirection="column"
          alignItems="center"
          height="fit-content"
          sx={{
            bgcolor: '#fff',
            paddingBottom: 5,
            boxShadow: '-11px 11px 8px #00000020',
            borderRadius: '16px',
            maxWidth: 500,
          }}
        >
          <Box component="img" src={Logo} sx={{ maxWidth: 400, width: '100%' }} />
          <Box
            display="flex"
            flex={1}
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
            sx={{ maxWidth: 400 }}
          >
            <Typography variant="h4" textAlign="center">
              💞 Ủng hộ chúng tôi bằng cốc coffee 💞
            </Typography>
            <Typography sx={{ mt: 2, fontSize: 16, lineHeight: '120%' }} textAlign="center" variant="caption">
              Nếu bạn thấy trang Web của chúng tôi hữu ích. Hãy ủng hộ chúng tôi 1 cốc coffee. Chúng tôi cần sự ủng hộ
              của bạn để duy trì trang Web.
            </Typography>
            <Typography sx={{ mt: 1, fontSize: 16 }} textAlign="center" variant="caption">
              Dev cần bạn, Designer cần bạn, Chúng tôi cần bạn 😍
            </Typography>
          </Box>

          <Button variant="contained" sx={{ px: '24px', borderRadius: '100px', mt: 3 }} onClick={() => navigate('/')}>
            Trở về trang chủ
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BuyCoffee;
