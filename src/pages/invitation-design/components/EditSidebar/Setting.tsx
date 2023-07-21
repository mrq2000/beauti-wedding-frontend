import React, { FC, useContext, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useParams } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { Alert, Box, TextField, Typography } from '@mui/material';

import { InfoContext } from '@/editor/InfoContext';
import useUpdateDesignDomain from '@/data/design/useUpdateDesignDomain';
import { handleErrorMessage } from '@/helpers/error';


const Setting: FC = () => {
  const { info, isPublic } = useContext(InfoContext);
  const { designId } = useParams();
  const [inputVal, serCurrentInputVal] = useState(info.domain);
  const { mutate: updateDomain, isLoading } = useUpdateDesignDomain(+(designId || 0));

  const handleUpdateDomain = () => {
    updateDomain(
      { domain: inputVal },
      {
        onError: (e) => {
          handleErrorMessage(e);
        },
        onSuccess: () => {
          enqueueSnackbar({
            variant: 'success',
            message: 'Cập nhật domain thành công!',
          });
        }
      },
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '16px',
        flexDirection: 'column',
      }}
    >
      <Box width="100%">
        <Typography fontWeight={600} mb={1}>
          Domain
        </Typography>
        <TextField fullWidth value={inputVal} onChange={(e) => serCurrentInputVal(e.target.value)} />
      </Box>

      <Alert severity="info" sx={{ fontSize: 12 }}>
        Tên hiện trên đường dẫn URL: {`${import.meta.env.VITE_APP_LIVE_DOMAIN}/${inputVal}`}
      </Alert>
      {isPublic && (
        <Alert severity="warning" sx={{ fontSize: 12 }}>
          Design đã public. Khi bạn thay đổi domain các link cũ sẽ không còn hiệu lực.
        </Alert>
      )}

      <LoadingButton
        loading={isLoading}
        onClick={handleUpdateDomain}
        variant="contained"
        disabled={inputVal == info.domain || !inputVal}
      >
        Update
      </LoadingButton>
    </Box>
  );
};

export default Setting;
