import { Box, Button, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import NotFoundImg from '@/assets/not_found_img.png';

interface Page {
  message?: string;
}
const Page404: FC<Page> = ({ message }) => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/');
  };
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flex={1}
      height="100%"
      width="100%"
      flexDirection="column"
    >
      <Box maxWidth={500} p={4} width="100%">
        <Box width="100%" component="img" src={NotFoundImg} />
      </Box>

      <Typography variant="h4" fontSize={24}>
        {message || 'Đường dẫn không tồn tại!'}
      </Typography>
      <Button variant="contained" size="large" sx={{ mt: 4, borderRadius: '100px' }} onClick={handleBackHome}>
        Trở về trang chủ
      </Button>
    </Box>
  );
};

export default Page404;
