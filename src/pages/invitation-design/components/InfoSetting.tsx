import { Box, TextField, Button } from '@mui/material';
import React, { FC, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { yupResolver } from '@hookform/resolvers/yup';

import { InfoContext } from '@/editor/InfoContext';
import dayjs, { Dayjs } from 'dayjs';
import { FORM_TEXT_FIELDS, infoSchema } from '@/pages/create-design/components/InfoStep';
import { Info } from '@/editor/interface/info';

const InfoSetting: FC = () => {
  const { info, setInfo } = useContext(InfoContext);

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
  };

  return (
    <>
      <Box
        display="flex"
        flex={1}
        flexDirection="column"
        gap="16px"
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
