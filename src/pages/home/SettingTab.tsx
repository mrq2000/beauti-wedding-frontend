import useMe from '@/data/useMe';
import { clearToken } from '@/helpers/api';
import { Box, Button, TextField, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';

const SettingTab: FC = () => {
  const client = useQueryClient();
  const navigate = useNavigate();
  const { data } = useMe();

  const handleSignOut = () => {
    clearToken();
    client.clear();
    navigate('/sign-in');
  };

  return (
    <Box py={4}>
      <Box display="flex" justifyContent="space-between">
        <Box mr={1}>
          <Typography variant="h3">Setting</Typography>
          <Typography variant="caption" fontSize={14}>
            Mọi thắc mắc liên quan đến tài khoản bạn có thể liên hệ với chúng tôi qua &nbsp;
            <Link to="" target="_blank">
              fanpage
            </Link>
          </Typography>
        </Box>

        <Button variant="contained" color="error" sx={{ height: 'fit-content', flexShrink: 0 }} onClick={handleSignOut}>
          Đăng xuất
        </Button>
      </Box>

      <Box mt={8} display="flex" alignItems="center" justifyContent="center" flexDirection="column" gap={2}>
        <TextField label="Email" value={data?.email} disabled />
        <TextField label="User name" value={data?.username} disabled />
      </Box>
    </Box>
  );
};

export default SettingTab;
