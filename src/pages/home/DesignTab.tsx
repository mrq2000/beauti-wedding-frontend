import { Box, Grid, Typography, useTheme } from '@mui/material';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import CustomLoading from '@/components/common/CustomLoading';
import SomeThingError from '@/components/error-page/SomeThingError';
import useGetDesignList from '@/data/design/useGetDesignList';
import dayjs from '@/helpers/date';

const DesignTab: FC = () => {
  const { data, isLoading, error } = useGetDesignList();
  const theme = useTheme();
  const navigate = useNavigate();

  if (isLoading) return <CustomLoading />;
  if (data)
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} lg={2.4}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            sx={{
              height: '100%',
              width: '100%',
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '-2px 3px 5px #00000015',
              cursor: 'pointer',
              transition: 'all 0.2s ease-in',
              color: theme.palette.grey[400],
              minHeight: '300px',
              border: `2px dashed ${theme.palette.grey[400]}`,
              ':hover': {
                color: theme.palette.primary.light,
                border: `2px dashed ${theme.palette.primary.light}`,
              },
            }}
            onClick={() => {
              navigate(`/get-started`);
            }}
          >
            <AddRoundedIcon fontSize="large" />
            <Box fontSize={16} fontWeight={600} mt={1}>
              Tạo Mới
            </Box>
          </Box>
        </Grid>
        {data.map((design) => (
          <Grid key={design.id} item xs={12} sm={4} lg={2.4}>
            <Box
              width="100%"
              display="flex"
              flexDirection="column"
              sx={{
                borderRadius: '12px',
                boxShadow: '-2px 3px 5px #00000015',
                position: 'relative',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: '5px 6px 8px #00000020',
                },
                backgroundColor: '#fff',
              }}
              onClick={() => {
                if (!design.designPublic) {
                  navigate(`/designs/${design.id}`);
                } else {
                  navigate(`/design-setting/${design.id}`);
                }
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  right: '10px',
                  top: '10px',
                  py: '5px',
                  px: '8px',
                  color: theme.palette.grey[800],
                  backgroundColor: design.designPublic ? '#A7ECEE' : '#F0EDD4',
                  borderRadius: '6px',
                  lineHeight: '100%',
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {design.designPublic ? 'LIVE' : 'DRAFT'}
              </Box>
              <Box
                component="img"
                sx={{
                  width: '100%',
                  height: '250px',
                  objectFit: 'cover',
                  borderTopLeftRadius: '12px',
                  borderTopRightRadius: '12px',
                }}
                src={design.previewImgUrl}
              />
              <Box sx={{ p: 2 }} width="100%">
                <Typography
                  sx={{ fontWeight: 600, fontSize: 14 }}
                >{`${design.brideName} - ${design.groomName}`}</Typography>
                <Typography variant="caption" sx={{ fontSize: 14 }}>
                  {dayjs(design.updated_at).fromNow()}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  return <SomeThingError error={error} />;
};

export default DesignTab;
