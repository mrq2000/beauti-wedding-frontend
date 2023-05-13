import { Box, TextField, Button } from '@mui/material';
import React, { FC, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { yupResolver } from '@hookform/resolvers/yup';

import { InfoContext } from '../InfoContext';
import dayjs, { Dayjs } from 'dayjs';
import yup from '@/helpers/validator';

interface FormValues {
  groomName: string;
  groomMotherName?: string;
  groomFatherName?: string;
  brideName: string;
  brideMotherName?: string;
  brideFatherName?: string;
  location: string;
  time: string;
}

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

const FORM_TEXT_FIELDS: { key: keyof FormValues; label: string }[] = [
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
    label: 'Nơi tổ chức đám cưới',
  },
];

const InfoSetting: FC = () => {
  const { info, setInfo } = useContext(InfoContext);

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
  };

  return (
    <>
      <Box
        display="flex"
        flex={1}
        flexDirection="column"
        gap="16px"
        className="custom-scrollbar"
        sx={{ overflowY: 'auto', margin: '-16px', padding: '16px' }}
      >
        {FORM_TEXT_FIELDS.map((field) => (
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
        ))}

        <Box>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label="Ngày cưới"
              sx={{ width: '100%' }}
              format="DD/MM/YYYY"
              defaultValue={dayjs(info.time)}
              onChange={(date) => {
                setValue('time', dayjs(date as Dayjs).toISOString());
                console.log(dayjs(date as Dayjs).toISOString());
              }}
            />
          </DemoContainer>
        </Box>
      </Box>
      <Button sx={{ mt: 2 }} variant="contained" type="submit" onClick={handleSubmit(onSubmit)}>
        Update
      </Button>
    </>
  );
};

export default InfoSetting;
