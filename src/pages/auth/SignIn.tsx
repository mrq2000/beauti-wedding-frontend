import React from 'react';
import { Typography, Box, TextField, IconButton, InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import LoadingButton from '@mui/lab/LoadingButton';

import { api, setToken } from '@/helpers/api';
import { Link, useNavigate } from 'react-router-dom';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import yup from '@/helpers/validator';

interface FormValues {
  username: string;
  password: string;
}

export const accountSchema = yup.object().shape({
  username: yup.string().required().max(16),
  password: yup.string().required().max(16),
});

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const {
    isLoading,
    error,
    data,
    mutate: signIn,
  } = useMutation(async (accessToken) => {
    const res = await api.post('/sign-in', {
      username: 'GOOGLE',
      password: accessToken,
    });
    return res.data;
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(accountSchema),
  });

  if (data && data.accessToken) {
    setToken(data.accessToken);
    navigate('/');
  }

  return (
    <Box display="flex" alignItems="center" flexDirection="column" gap="16px">
      <TextField
        label="Tên Đăng Nhập"
        fullWidth
        helperText={errors && errors['username']?.message}
        error={!!errors['username']}
        InputProps={{
          ...register('username'),
        }}
      />

      <TextField
        label="Mật Khẩu"
        fullWidth
        helperText={errors && errors['username']?.message}
        error={!!errors['username']}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          ...register('password'),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <LoadingButton fullWidth variant="contained" sx={{ mt: 2 }} size="large">
        Đăng nhập
      </LoadingButton>

      <Typography variant="caption">
        Chưa có tài khoản? <Link to="/sign-up">Đăng ký ngay</Link>
      </Typography>
    </Box>
  );
};

export default SignIn;
