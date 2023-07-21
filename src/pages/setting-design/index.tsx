import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';

import useGetDesignInfo from '@/data/design/useGetDesignInfo';
import CustomLoading from '@/components/common/CustomLoading';
import SomeThingError from '@/components/error-page/SomeThingError';
import { DEFAULT_IMAGE } from '../home/DesignTab';
import DisplayReceivers from './components/DisplayReceivers';

const SettingDesign: FC = () => {
  const { designId } = useParams();
  const { data: design, isLoading, error } = useGetDesignInfo(+(designId || ''));

  const navigate = useNavigate();

  if (isLoading) return <CustomLoading />;
  if (design)
    return (
      <Grid container spacing={{ xs: 2, sm: 4 }} sx={{ py: { xs: 2, sm: 4, lg: 6 } }}>
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
          <Box
            mt={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={{ xs: 'column', md: 'row' }}
          >
            <Typography
              sx={{ fontWeight: 600, fontSize: 22 }}
            >{`${design.brideName} - ${design.groomName}`}</Typography>

            <Box ml={2}>
              <Button
                variant="contained"
                sx={{ borderRadius: '50px' }}
                onClick={() => {
                  navigate(`/designs/${designId}`);
                }}
                endIcon={<EditNoteRoundedIcon />}
              >
                Chỉnh sửa
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={7}>
          <DisplayReceivers receivers={design.receivers} domain={design.domain} />
        </Grid>
      </Grid>
    );

  return <SomeThingError error={error} />;
};

export default SettingDesign;
