import React, { FC } from 'react';
import { Box, Button, Dialog, Typography } from '@mui/material';

interface ReviewTemplateInfoModalProps {
  onClose: () => void;
  open: boolean;
}

const ReviewTemplateInfoModal: FC<ReviewTemplateInfoModalProps> = ({ onClose, open }) => {
  return (
    <Dialog
      onClose={onClose}
      PaperProps={{
        style: {
          width: 450,
          padding: '16px 24px',
          borderRadius: 16,
        },
      }}
      open={open}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Template đang trong trạng thái Review</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box mt={2}>
          ADMIN đang xem xét template của bạn. Vui lòng liên lạc với ADMIN để có thể chuyển trạng thái của Template!
        </Box>
        <Box sx={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
          <Button
            sx={{
              width: '100%',
              mr: 2,
              borderRadius: '50px',
            }}
            variant="contained"
            onClick={onClose}
          >
            OK
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default ReviewTemplateInfoModal;
