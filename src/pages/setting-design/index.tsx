import React, { FC, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Chip, Grid, TextField, Typography } from '@mui/material';

import useGetDesignInfo from '@/data/design/useGetDesignInfo';
import CustomLoading from '@/components/common/CustomLoading';
import SomeThingError from '@/components/error-page/SomeThingError';
import { DEFAULT_IMAGE } from '../home/DesignTab';
import { LoadingButton } from '@mui/lab';
import useUpdateDesignReceivers from '@/data/design/useUpdateDesignReceivers';
import { handleErrorMessage } from '@/helpers/error';

type Receivers = Record<string, { name: string }>;

const SettingDesign: FC = () => {
  const { designId } = useParams();
  const [input, setInput] = useState('');
  const [newReceivers, setNewReceivers] = useState<Receivers>({});
  const { data: design, isLoading } = useGetDesignInfo(+(designId || ''));
  const { mutate: updateReceivers, isLoading: loadingUpdateReceivers } = useUpdateDesignReceivers(+(designId || ''));

  const navigate = useNavigate();

  const currentReceivers = useMemo((): Receivers => {
    if (design) {
      try {
        return JSON.parse(design.receivers || '{}');
      } catch (error) {
        return {};
      }
    }
    return {};
  }, [design]);

  const handleUpdateReceivers = () => {
    updateReceivers(
      {
        receivers: JSON.stringify({ ...currentReceivers, ...newReceivers }),
      },
      {
        onError: (e) => {
          handleErrorMessage(e);
        },
      },
    );
    setNewReceivers({});
  };

  if (isLoading) return <CustomLoading />;
  if (design)
    return (
      <Grid container spacing={{ xs: 2, sm: 4 }} sx={{ pt: { xs: 2, sm: 4, lg: 6 } }}>
        <Grid item xs={12} sm={6} lg={5}>
          <Box
            component="img"
            sx={{
              width: '100%',
              height: '600px',
              objectFit: 'cover',
              borderRadius: '12px',
              display: { xs: 'none', sm: 'block' },
            }}
            src={design.previewImgUrl || DEFAULT_IMAGE}
          />
          <Box mt={2} display="flex" justifyContent="space-between" alignItems="center" flexDirection="column">
            <Typography
              sx={{ fontWeight: 600, fontSize: 22 }}
            >{`${design.brideName} - ${design.groomName}`}</Typography>

            <Box mt={1}>
              <Button
                variant="outlined"
                sx={{ mr: 1 }}
                onClick={() => {
                  navigate(`/designs/${designId}`);
                }}
              >
                Chỉnh sửa
              </Button>
              <Button variant="contained">Xem trước</Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={7}>
          <Box width="100%" p={2} borderRadius="12px" bgcolor="#fff" sx={{ boxShadow: '-2px 3px 5px #00000015' }}>
            <Typography variant="h6" mb={1}>
              Thêm người nhận
            </Typography>
            <TextField
              placeholder="Enter để thêm"
              sx={{ display: 'flex', flex: 1 }}
              value={input}
              size="small"
              onChange={(e) => setInput(e.target.value)}
              disabled={loadingUpdateReceivers}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const date = new Date();
                  const key = date.getTime();
                  const clone = { ...newReceivers };
                  clone[key.toString()] = {
                    name: input,
                  };
                  setNewReceivers(clone);
                  setInput('');
                }
              }}
            />

            {!!Object.keys(newReceivers).length && (
              <Box
                display="flex"
                gap={{ xs: '12px', lg: '8px' }}
                alignItems="start"
                mt={2}
                justifyContent="space-between"
                flexDirection={{ xs: 'column', lg: 'row' }}
              >
                <Box gap="4px" display="flex" sx={{ flexWrap: 'wrap' }}>
                  {Object.keys(newReceivers).map((key) => (
                    <Chip
                      key={key}
                      label={newReceivers[key].name}
                      variant="outlined"
                      onDelete={() => {
                        const clone = { ...newReceivers };
                        delete clone[key];
                        setNewReceivers(clone);
                      }}
                    />
                  ))}
                </Box>

                <Box display="flex" width={{ xs: '100%', lg: 'auto' }}>
                  <LoadingButton
                    fullWidth
                    variant="contained"
                    sx={{ px: '16px' }}
                    loading={loadingUpdateReceivers}
                    onClick={() => handleUpdateReceivers()}
                  >
                    Thêm
                  </LoadingButton>
                </Box>
              </Box>
            )}

            <Box mt={2} width="100%">
              <Typography variant="h6" mb={1}>
                Danh sách người nhận đã thêm
              </Typography>
              {Object.keys(currentReceivers).length ? (
                <Box>
                  {[...Object.keys(currentReceivers)].reverse().map((key) => (
                    <Box key={key}>{currentReceivers[key].name}</Box>
                  ))}
                </Box>
              ) : (
                <Box fontSize={16} textAlign="center" py={4} color="#6F7581">
                  Hiện tại bạn chưa thêm người nhận nào.
                </Box>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    );

  return <SomeThingError />;
};

export default SettingDesign;
