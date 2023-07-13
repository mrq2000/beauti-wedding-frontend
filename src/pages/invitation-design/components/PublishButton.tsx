import usePublishDesign from '@/data/design/usePublishDesign';
import { handleErrorMessage } from '@/helpers/error';
import { LoadingButton } from '@mui/lab';
import { Dialog, Box, Typography, Button } from '@mui/material';
import React, { FC, useState } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SuccessPublishImg from '@/assets/success_publish_img.png';
import { Link, useNavigate } from 'react-router-dom';

interface PublishButtonProps {
  designId: number;
}
const PublishButton: FC<PublishButtonProps> = ({ designId }) => {
  const { mutate: publishDesign, isLoading } = usePublishDesign();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const handlePublishDesign = () => {
    publishDesign(designId, {
      onError: (e) => {
        handleErrorMessage(e);
      },
      onSuccess: () => {
        setOpenModal(true);
      },
    });
  };

  const onClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <LoadingButton
        onClick={() => handlePublishDesign()}
        variant="contained"
        loading={isLoading}
        sx={{ borderRadius: '100px', px: '20px' }}
      >
        Publish
      </LoadingButton>

      <Dialog
        onClose={onClose}
        PaperProps={{
          style: {
            width: 450,
            borderRadius: 16,
          },
        }}
        open={openModal}
      >
        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box mt={3} width="50%" component="img" src={SuccessPublishImg} />
          <Box onClick={onClose} sx={{ cursor: 'pointer', position: 'absolute', right: 20, top: 20 }}>
            <HighlightOffIcon />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: '0px 40px 24px 40px', alignItems: 'center' }}>
          <Typography textAlign="center" variant="h5">
            Publish thiệp cưới thành công!
          </Typography>

          <Typography mt={1} textAlign="center" variant="caption">
            Nếu bạn cảm thấy hài lòng về sản phẩm, ngại gì ủng hộ chúng tôi &nbsp;
            <Link style={{ color: 'inherit' }} to="/buy-coffee" target="_blank">
              cốc coffee
            </Link>
          </Typography>
          <Box mt={2}>
            <Button
              variant="contained"
              sx={{ px: '24px', borderRadius: '100px' }}
              onClick={() => navigate(`/design-setting/${designId}`)}
            >
              Đi chia sẻ ngay
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default PublishButton;
