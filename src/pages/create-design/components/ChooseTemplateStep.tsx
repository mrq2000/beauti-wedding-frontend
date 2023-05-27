import React, { FC, useContext } from 'react';
import { Box, Button, Grid, Typography, useTheme } from '@mui/material';

import CustomLoading from '@/components/common/CustomLoading';
import SomeThingError from '@/components/error-page/SomeThingError';
import useGetTemplate from '@/data/useGetTemplate';
import { CreateDesignContext } from '../CreateDesignContext';

interface ChooseTemplateProps {
  handleNextStep: () => void;
}

const ChooseTemplate: FC<ChooseTemplateProps> = ({ handleNextStep }) => {
  const { data, isLoading } = useGetTemplate({ offset: 0, limit: 100 });
  const { setTemplateId } = useContext(CreateDesignContext);
  const theme = useTheme();
  const handleSelect = (id: number) => {
    setTemplateId(id);
    handleNextStep();
  };

  if (isLoading) return <CustomLoading />;
  if (!data) return <SomeThingError />;

  return (
    <>
      <Typography variant="h3" mb={1}>
        Chọn Template
      </Typography>
      <Typography variant="caption" mb={4} fontSize={16}>
        Bạn có thể thay đổi Template bât cứ lúc nào trong khi chỉnh sửa
      </Typography>

      <Box display="grid" gridTemplateColumns="repeat(20, 1fr)" gap={3}>
        {data.map((template) => (
          <Grid gridColumn={{ xs: 'span 20', sm: 'span 10', md: 'span 5', lg: 'span 4' }} key={template.id}>
            <Box
              sx={{
                width: '100%',
                aspectRatio: '12 / 17',
                borderRadius: '8px',
                backgroundImage: `url(${template.preview_img_url})`,
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                boxShadow: theme.shadows[1],
                '&:hover': {
                  outline: `2px solid ${theme.palette.primary.light}`,
                },
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#80808073',
                  borderRadius: '8px',
                  opacity: 0,
                  '&:hover': { opacity: 1 },
                }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
              >
                <Button
                  variant="contained"
                  sx={{ width: 120, mb: 2, borderRadius: '100px' }}
                  onClick={() => handleSelect(template.id)}
                >
                  Chọn
                </Button>
                <Button
                  variant="text"
                  sx={{
                    width: 120,
                    borderRadius: '100px',
                    backgroundColor: '#fff',
                    '&:hover': { backgroundColor: '#f7f1f1' },
                  }}
                >
                  Xem trước
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Box>
    </>
  );
};

export default ChooseTemplate;
