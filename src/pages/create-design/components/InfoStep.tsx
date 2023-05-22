import React, { FC, useContext } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import yup from '@/helpers/validator';
import { CreateDesignContext } from '../CreateDesignContext';

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

export interface FormValues {
  groomName: string;
  groomMotherName?: string;
  groomFatherName?: string;
  brideName: string;
  brideMotherName?: string;
  brideFatherName?: string;
  location: string;
  time: string;
}

export const FORM_TEXT_FIELDS: { key: keyof FormValues; label: string }[] = [
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
  } = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: {
      groomName: info.groom.name,
      groomMotherName: info.groom.motherName,
      groomFatherName: info.groom.fartherName,
      brideName: info.bride.name,
      brideMotherName: info.bride.motherName,
      brideFatherName: info.bride.fartherName,
      location: info.location.name,
      time: info.time,
    },
    resolver: yupResolver(infoSchema),
  });

  const onSubmit = (data: FormValues) => {
    setInfo({
      groom: {
        name: data.groomName,
        fartherName: data.groomFatherName,
        motherName: data.groomMotherName,
      },
      bride: {
        name: data.brideName,
        fartherName: data.brideFatherName,
        motherName: data.brideMotherName,
      },
      location: {
        name: data.location,
      },
      time: data.time,
    });
    handleNextStep();
  };

  return (
    <Box display="flex" flex={1} width="100%" alignItems="center" justifyContent="center">
      <Box sx={{ gap: 2, display: 'flex', justifyContent: 'space-between', maxWidth: 800 }} flexWrap="wrap">
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
