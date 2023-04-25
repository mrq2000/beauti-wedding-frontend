import { useEditor } from '@craftjs/core';
import { Box, TextField, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface FormValues {
  broomName: string;
  broomMotherName?: string;
  broomFatherName?: string;
  brideName: string;
  brideMotherName?: string;
  brideFatherName?: string;
}
const InfoSetting: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditAddressForm>({
    mode: 'onSubmit',
  });

  return (
    <form>
      <Box display="flex" flex={1} flexDirection="column" gap="16px">
        <TextField label="Tên cô dâu *" variant="outlined" />
        <TextField label="Tên chú rể *" variant="outlined" />
        <TextField label="Tên bố chú rể" variant="outlined" />
        <TextField label="Tên mẹ chú rể" variant="outlined" />
        <TextField label="Tên bố cô dâu" variant="outlined" />
        <TextField label="Tên mẹ cô dâu" variant="outlined" />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker label="Ngày cưới" sx={{ width: '100%' }} />
          </DemoContainer>
        </LocalizationProvider>
      </Box>
    </form>
  );
};

export default InfoSetting;
