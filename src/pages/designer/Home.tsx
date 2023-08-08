import CustomLoading from '@/components/common/CustomLoading';
import useGetTemplates from '@/data/designer/useGetTemplates';
import React, { FC } from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import SomeThingError from '@/components/error-page/SomeThingError';
import dayjs from 'dayjs';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { DesignStatus, Template } from '@/interface/template';
import { useLocation, useNavigate } from 'react-router-dom';

const STATUS_LABEL = {
  [DesignStatus.ACTIVE]: {
    title: 'PUBLIC',
    color: '#A7ECEE',
  },
  [DesignStatus.EDITING]: {
    title: 'DRAFT',
    color: '#F0EDD4',
  },
  [DesignStatus.IN_REVIEW]: {
    title: 'REVIEW',
    color: '#EF7C8E',
  },
};

const Home: FC = () => {
  const { isLoading, data } = useGetTemplates();
  const location = useLocation();
  const theme = useTheme();
  console.log(location);

  const handleSelectTemplate = (template: Template) => {
    if (template.status == DesignStatus.ACTIVE) {
      window.open(`${window.location.protocol}//${window.location.host}/templates/${template.id}`, '_blank');
      return;
    }

    if (template.status == DesignStatus.EDITING) {
      return;
    }
  };

  if (isLoading) return <CustomLoading />;
  if (data)
    return (
      <>
        <Box mt={4} mb={{ xs: 2, sm: 5, lg: 6 }}>
          <Typography variant="h3">Danh sách templates của bạn</Typography>
          <Typography variant="caption" fontSize={14}>
            Chỉ có những templates ở trạng thái &quot;Draft&quot; mới có thể chỉnh sửa. Hãy liên hệ với admin nếu bạn
            muốn public hoặc xóa template.
          </Typography>
        </Box>

        <Box pb={2}>
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
              >
                <AddRoundedIcon fontSize="large" />
                <Box fontSize={16} fontWeight={600} mt={1}>
                  Tạo Mới
                </Box>
              </Box>
            </Grid>
            {data.map((template) => (
              <Grid key={template.id} item xs={12} sm={4} lg={2.4} onClick={() => handleSelectTemplate(template)}>
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
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      right: '10px',
                      top: '10px',
                      py: '5px',
                      px: '8px',
                      color: theme.palette.grey[800],
                      backgroundColor: STATUS_LABEL[template.status].color,
                      borderRadius: '6px',
                      lineHeight: '100%',
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    {STATUS_LABEL[template.status].title}
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
                    src={template.previewImgUrl}
                  />
                  <Box sx={{ p: 2 }} width="100%">
                    <Typography variant="caption" sx={{ fontSize: 14 }}>
                      {dayjs(template.updated_at).fromNow()}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </>
    );

  return <SomeThingError />;
};

export default Home;
