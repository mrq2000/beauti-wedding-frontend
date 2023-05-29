import React, { FC, useContext, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';

import yup from '@/helpers/validator';
import { CreateDesignContext } from '../CreateDesignContext';
import useCheckDomain from '@/data/useCheckDomain';
import { handleErrorMessage } from '@/helpers/error';

export const infoSchema = yup.object().shape({
  domain: yup
    .string()
    .required()
    .max(32)
    .matches(/^[^<>/\\]+$/, 'Vui lòng không nhập các ký tự đặc biệt trong đây <,>,/,\\'),
});

export interface FormValues {
  domain: string;
}

interface SettingStepProps {
  handleNextStep: () => void;
}

const SettingStep: FC<SettingStepProps> = ({ handleNextStep }) => {
  const { setting, setSetting } = useContext(CreateDesignContext);
  const { mutate: checkDomain, isLoading } = useCheckDomain();
  const [errorMessage, setErrorMessage] = React.useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: {
      domain: setting.domain,
    },
    resolver: yupResolver(infoSchema),
  });

  const { domain } = watch();

  useEffect(() => {
    if (errorMessage) {
      setErrorMessage('');
    }
  }, [domain]);

  const onSubmit = (data: FormValues) => {
    checkDomain(data.domain, {
      onError: (e) => {
        handleErrorMessage(e);
      },
      onSuccess: (res) => {
        if (res.isExist) {
          setErrorMessage('Domain đã tồn tại! Vui lòng nhạp giá trị khác');
          return;
        }
        setSetting({
          domain: data.domain,
        });
        handleNextStep();
      },
    });
  };

  return (
    <Box display="flex" flex={1} width="100%" alignItems="center" justifyContent="center">
      <Box
        flex={1}
        sx={{ gap: 2, display: 'flex', justifyContent: 'space-between', maxWidth: 500 }}
        flexDirection="column"
      >
        <Typography variant="h4">Domain</Typography>
        <Typography variant="caption" fontSize={16}>
          Tên hiện trên đường dẫn URL: {`${import.meta.env.VITE_APP_LIVE_DOMAIN}/${domain}`}
        </Typography>
        <TextField
          fullWidth
          helperText={(errors && errors['domain']?.message) || errorMessage}
          error={!!errors['domain'] || !!errorMessage}
          placeholder="dam-cuoi-lan-va-diep"
          InputProps={{
            ...register('domain'),
          }}
        />

        <Box width="100%" display="flex" flex={1} justifyContent="center" mt={2}>
          <LoadingButton
            size="large"
            variant="contained"
            loading={isLoading}
            sx={{ width: { xs: '100%', sm: '48%' } }}
            onClick={handleSubmit(onSubmit)}
          >
            Xác Nhận
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
};

export default SettingStep;
