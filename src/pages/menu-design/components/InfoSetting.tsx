import { Box, TextField, Button } from '@mui/material';
import React, { FC, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { InfoContext } from '../InfoContext';

interface FormValues {
  broomName: string;
  broomMotherName?: string;
  broomFatherName?: string;
  brideName: string;
  brideMotherName?: string;
  brideFatherName?: string;
  location: string;
}

const FORM_TEXT_FIELDS: { key: keyof FormValues; label: string }[] = [
  {
    key: 'brideName',
    label: 'Tên cô dâu *',
  },
  {
    key: 'broomName',
    label: 'Tên cô dâu *',
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
    key: 'broomFatherName',
    label: 'Tên bố chú rể',
  },
  {
    key: 'broomMotherName',
    label: 'Tên mẹ chú rể',
  },
  {
    key: 'location',
    label: 'Nơi tổ chức đám cưới',
  },
];

const InfoSetting: FC = () => {
  const info = useContext(InfoContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: {
      broomName: info.broom.name,
      broomMotherName: info.broom.motherName,
      broomFatherName: info.broom.fartherName,
      brideName: info.bride.name,
      brideMotherName: info.bride.motherName,
      brideFatherName: info.bride.fartherName,
    },
  });

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
            InputProps={{
              ...register(field.key),
            }}
          />
        ))}

        <Box>
          <DemoContainer components={['DatePicker']}>
            <DatePicker label="Ngày cưới" sx={{ width: '100%' }} format="DD/MM/YYYY" />
          </DemoContainer>
        </Box>
      </Box>
      <Button sx={{ mt: 2 }} variant="contained">
        Update
      </Button>
    </>
  );
};

export default InfoSetting;
