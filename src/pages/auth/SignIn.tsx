import React, { useEffect } from 'react';
import { Typography, Box, TextField, IconButton, InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link, useNavigate } from 'react-router-dom';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';

import { api, setToken } from '@/helpers/api';
import yup from '@/helpers/validator';
import { getErrorMessage } from '@/helpers/error';

interface FormValues {
  username: string;
  password: string;
}

const accountSchema = yup.object().shape({
  username: yup.string().required().min(6).max(16),
  password: yup.string().required().min(6).max(16),
});

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const { isLoading, mutate: signIn } = useMutation(async (data: FormValues) => {
    const res = await api.post('/auth/sign-in', {
      username: data.username,
      password: data.password,
    });
    return res.data;
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(accountSchema),
  });

  const onSubmit = (data: FormValues) => {
    setErrorMessage('');
    signIn(data, {
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

  useEffect(() => {
    if (errorMessage) {
      setErrorMessage('');
    }
  }, [watch]);

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
        helperText={errors && errors['password']?.message}
        error={!!errors['password']}
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

      <Box width="100%" height="20px">
        <Typography color="error" variant="subtitle2">
          {errorMessage}
        </Typography>
      </Box>

      <LoadingButton fullWidth variant="contained" size="large" loading={isLoading} onClick={handleSubmit(onSubmit)}>
        Đăng nhập
      </LoadingButton>

      <Typography variant="caption">
        Chưa có tài khoản? <Link to="/sign-up">Đăng ký ngay</Link>
      </Typography>
    </Box>
  );
};

export default SignIn;
