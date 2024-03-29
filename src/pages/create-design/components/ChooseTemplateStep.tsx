import React, { FC, useContext, useEffect, useState } from 'react';
import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import { useInView } from 'react-intersection-observer';

import CustomLoading from '@/components/common/CustomLoading';
import SomeThingError from '@/components/error-page/SomeThingError';
import useGetTemplates from '@/data/template/useGetTemplates';
import { CreateDesignContext } from '../CreateDesignContext';
import { Template } from '@/interface/template';
import { Link } from 'react-router-dom';

interface ChooseTemplateProps {
  handleNextStep: () => void;
}

const EndMessage = (
  <Grid gridColumn={{ xs: 'span 20' }} mt={4} mb={2} sx={{ textAlign: 'center' }}>
    <Typography variant="caption">
      {
        'Bạn đã xem hết tất cả Template. Chúng tôi đang tiếp tục tạo thêm những template tuyệt vời nữa trong tương lai <3.'
      }
    </Typography>
  </Grid>
);

const ChooseTemplate: FC<ChooseTemplateProps> = ({ handleNextStep }) => {
  const { data, isLoading, error, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetTemplates({ limit: 10 });
  const [templates, setTemplates] = useState<Template[]>([]);
  const { setTemplateId } = useContext(CreateDesignContext);
  const theme = useTheme();
  const { ref: scrollEl, inView } = useInView();

  const handleSelect = (id: number) => {
    setTemplateId(id);
    handleNextStep();
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    if (data) {
      const newTemplates: Template[] = [];
      data.pages.forEach((page) => {
        newTemplates.push(...page);
      });
      setTemplates(newTemplates);
    }
  }, [data]);

  if (isLoading) return <CustomLoading />;
  if (!data) return <SomeThingError error={error} />;

  return (
    <>
      <Typography variant="h3" mb={1}>
        Chọn Template
      </Typography>
      <Typography variant="caption" mb={4} fontSize={16}>
        Bạn có thể thay đổi Template bât cứ lúc nào trong khi chỉnh sửa
      </Typography>

      <Box display="grid" gridTemplateColumns="repeat(20, 1fr)" gap={3}>
        {templates.map((template) => (
          <Grid gridColumn={{ xs: 'span 20', sm: 'span 10', md: 'span 5', lg: 'span 4' }} key={template.id}>
            <Box
              sx={{
                width: '100%',
                aspectRatio: '12 / 17',
                borderRadius: '8px',
                backgroundImage: `url("${template.previewImgUrl}")`,
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
                  backgroundColor: '#66626273',
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

                <Link to={`/templates/${template.id}`} target="_blank" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    sx={{
                      width: 120,
                      borderRadius: '100px',
                      backgroundColor: '#fff',
                      color: '#333841',
                      '&:hover': { backgroundColor: '#E7E8EC' },
                    }}
                  >
                    Xem trước
                  </Button>
                </Link>
              </Box>
            </Box>
          </Grid>
        ))}
      </Box>

      <Box ref={scrollEl} width="100%">
        {isFetchingNextPage && (
          <Box mt={4}>
            <CustomLoading />
          </Box>
        )}
        {!hasNextPage && EndMessage}
      </Box>
    </>
  );
};

export default ChooseTemplate;
