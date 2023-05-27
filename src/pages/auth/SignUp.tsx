import React from 'react';
import { Typography, Box, TextField, IconButton, InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import LoadingButton from '@mui/lab/LoadingButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { VisibilityOff, Visibility } from '@mui/icons-material';

import yup from '@/helpers/validator';
import { api, setToken } from '@/helpers/api';
import { getErrorMessage } from '@/helpers/error';

interface FormValues {
  username: string;
  password: string;
  email: string;
}

const accountSchema = yup.object().shape({
  username: yup.string().required().max(16),
  password: yup.string().required().max(16),
  email: yup.string().email().required(),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const { isLoading, mutate: signUp } = useMutation(async (data: FormValues) => {
    const res = await api.post('/auth/sign-up', {
      username: data.username,
      password: data.password,
      email: data.email,
    });
    return res.data;
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: {
      username: '',
      password: '',
      email: '',
    },
    resolver: yupResolver(accountSchema),
  });

  const onSubmit = (data: FormValues) => {
    setErrorMessage('');
    signUp(data, {
      onSuccess: (data) => {
        if (data && data.accessToken) {
          setToken(data.accessToken);
          navigate('/');
        }
      },
      onError: (e) => {
        const errorMessage = getErrorMessage(e);
        setErrorMessage(errorMessage);
      },
    });
  };

  return (
    <Box display="flex" alignItems="center" flexDirection="column" gap="16px">
      <TextField
        label="Email"
        fullWidth
        helperText={errors && errors['email']?.message}
        error={!!errors['email']}
        placeholder="Email để  lấy lại mật khẩu"
        InputProps={{
          ...register('email'),
        }}
      />

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
          ...register('password', {
            required: 'Vui lòng không bỏ trống Mật Khẩu',
          }),
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

      <Box width="100%" height="20px">
        <Typography color="error" variant="subtitle2">
          {errorMessage}
        </Typography>
      </Box>

      <LoadingButton fullWidth variant="contained" size="large" loading={isLoading} onClick={handleSubmit(onSubmit)}>
        Đăng ký
      </LoadingButton>

      <Typography variant="caption">
        Bạn đã có tài khoản? <Link to="/sign-in">Đăng nhập ngay</Link>
      </Typography>
    </Box>
  );
};

export default SignUp;
