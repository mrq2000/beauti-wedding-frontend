import ConfirmModal from '@/components/common/ConfirmModal';
import CustomLoading from '@/components/common/CustomLoading';
import useGetTemplates from '@/data/template/useGetTemplates';
import { Template } from '@/interface/template';
import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import React, { FC, useContext, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import { ElementContext } from '../../ElementWarp';

const EndMessage = (
  <Grid gridColumn={{ xs: 'span 20' }} mt={4} mb={2} sx={{ textAlign: 'center' }}>
    <Typography variant="caption">
      {
        'Bạn đã xem hết tất cả Template. Chúng tôi đang tiếp tục tạo thêm những template tuyệt vời nữa trong tương lai <3.'
      }
    </Typography>
  </Grid>
);

const TemplateSetting: FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const { data, fetchNextPage, hasNextPage, isLoading } = useGetTemplates({ limit: 10 });
  const theme = useTheme();
  const { setElements } = useContext(ElementContext);
  const [openConfirmId, setOpenConfirmId] = useState<null | number>(null);

  useEffect(() => {
    if (data) {
      const newTemplates: Template[] = [];
      data.pages.forEach((post) => {
        newTemplates.push(...post);
      });
      setTemplates(newTemplates);
    }
  }, [data]);

  const handleSelect = (template: Template) => {
    setElements(JSON.parse(template.data));
  };

  if (isLoading) return <CustomLoading />;

  return (
    <Box
      display="flex"
      flex={1}
      flexDirection="column"
      gap="16px"
      sx={{ overflowY: 'auto', margin: '-16px', padding: '16px', gap: '8px' }}
      id="template-list"
    >
      <InfiniteScroll
        dataLength={templates.length}
        hasMore={!!hasNextPage}
        scrollableTarget="template-list"
        next={fetchNextPage}
        endMessage={EndMessage}
        inverse
        loader={
          <Grid gridColumn={{ xs: 'span 20' }} my={3}>
            <CustomLoading />
          </Grid>
        }
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(20, 1fr)',
        }}
      >
        {templates.map((template) => (
          <Grid gridColumn={{ xs: 'span 10' }} key={template.id} sx={{ p: 0.5 }}>
            <ConfirmModal
              title="Thay đổi Template"
              content="Bạn có chắc chắn thay đổi sang template này không? Bạn sẽ mất toàn bộ design hiện tại?"
              open={openConfirmId === template.id}
              onClose={() => setOpenConfirmId(null)}
            >
              <Button
                sx={{ width: '120px' }}
                variant="contained"
                color="primary"
                onClick={() => {
                  handleSelect(template);
                  setOpenConfirmId(null);
                }}
              >
                Xác nhận
              </Button>
            </ConfirmModal>
            <Box
              sx={{
                width: '100%',
                aspectRatio: '12 / 17',
                borderRadius: '8px',
                backgroundImage: `url("${template.preview_img_url}")`,
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
                  fontSize: 12,
                  opacity: openConfirmId == template.id ? 1 : 0,
                  '&:hover': { opacity: 1 },
                }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
              >
                <Button
                  variant="contained"
                  size="small"
                  sx={{ width: 100, mb: 2, borderRadius: '100px', fontSize: 12 }}
                  onClick={() => setOpenConfirmId(template.id)}
                >
                  Chọn
                </Button>

                <Link to={`/templates/${template.id}`} target="_blank" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      width: 100,
                      borderRadius: '100px',
                      fontSize: 12,
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
      </InfiniteScroll>
    </Box>
  );
};

export default TemplateSetting;
