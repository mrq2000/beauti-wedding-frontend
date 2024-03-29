import React, { FC, useContext } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import yup from '@/helpers/validator';
import { CreateDesignContext } from '../CreateDesignContext';
import { Info } from '@/editor/interface/info';

export const infoSchema = yup.object().shape({
  groomName: yup.string().required().max(30),
  brideName: yup.string().required().max(30),
  groomMotherName: yup.string().max(30).nullable(),
  groomFatherName: yup.string().max(30).nullable(),
  brideMotherName: yup.string().max(30).nullable(),
  brideFatherName: yup.string().max(30).nullable(),
  location: yup.string().nullable().max(200),
  time: yup.string().required(),
});

export const FORM_TEXT_FIELDS: { key: keyof Info; label: string }[] = [
  {
    key: 'brideName',
    label: 'Tên cô dâu *',
  },
  {
    key: 'groomName',
    label: 'Tên chú rể *',
  },
  {
    key: 'brideFatherName',
    label: 'Tên bố cô dâu',
  },
  {
    key: 'brideMotherName',
    label: 'Tên mẹ cô dâu',
  },
  {
    key: 'groomFatherName',
    label: 'Tên bố chú rể',
  },
  {
    key: 'groomMotherName',
    label: 'Tên mẹ chú rể',
  },
  {
    key: 'location',
    label: 'Nơi tổ chức đám cưới *',
  },
];

interface InfoStepProps {
  handleNextStep: () => void;
}

const InfoStep: FC<InfoStepProps> = ({ handleNextStep }) => {
  const { info, setInfo } = useContext(CreateDesignContext);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Info>({
    mode: 'onSubmit',
    defaultValues: {
      ...info,
    },
    resolver: yupResolver(infoSchema),
  });

  const onSubmit = (data: Info) => {
    setInfo(data);
    handleNextStep();
  };

  return (
    <Box display="flex" width="100%" alignItems="center" justifyContent="center" flex={1}>
      <Box sx={{ gap: 2, display: 'flex', justifyContent: 'space-between', maxWidth: 800 }} flexWrap="wrap">
        <Box mb={4}>
          <Typography variant="h3" mb={1}>
            Thông tin chính
          </Typography>
          <Typography variant="caption" mb={4} fontSize={16}>
            Một vài thông tin sẽ không thể thay đổi sau khi public website.
          </Typography>
        </Box>
        {FORM_TEXT_FIELDS.map((field) => (
          <Box width={{ xs: '100%', sm: '48%' }} key={field.key}>
            <TextField
              key={field.key}
              label={field.label}
              fullWidth
              helperText={errors && errors[field.key]?.message}
              error={!!errors[field.key]}
              InputProps={{
                ...register(field.key),
              }}
            />
          </Box>
        ))}

        <Box width={{ xs: '100%', sm: '48%' }}>
          <DemoContainer components={['DatePicker']} sx={{ width: '100%' }}>
            <DatePicker
              label="Ngày cưới *"
              sx={{ width: '100%' }}
              format="DD/MM/YYYY"
              defaultValue={dayjs(info.time)}
              onChange={(date) => {
                setValue('time', dayjs(date as Dayjs).toISOString());
              }}
            />
          </DemoContainer>
        </Box>

        <Box width="100%" display="flex" flex={1} justifyContent="center" mt={2}>
          <Button
            size="large"
            variant="contained"
            sx={{ width: { xs: '100%', sm: '48%' } }}
            onClick={handleSubmit(onSubmit)}
          >
            Tiếp tục
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default InfoStep;
