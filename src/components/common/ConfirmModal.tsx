import { Box, Button, Dialog, DialogProps, IconButton, Typography } from '@mui/material';
import React, { FC, PropsWithChildren } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface ConfirmModalProps extends DialogProps {
  content: any;
  onClose: () => void;
  title: string;
}

const ConfirmModal: FC<PropsWithChildren<ConfirmModalProps>> = ({ content, onClose, title, children, ...props }) => {
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
      {...props}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">{title}</Typography>
        <Box onClick={onClose} sx={{ cursor: 'pointer' }}>
          <HighlightOffIcon />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box mt={2}>{content}</Box>
        <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            sx={{
              width: '120px',
              mr: 2,
              borderColor: (theme) => theme.palette.grey[500],
              color: (theme) => theme.palette.grey[800],
            }}
            variant="outlined"
            onClick={onClose}
          >
            Hủy
          </Button>
          {children}
        </Box>
      </Box>
    </Dialog>
  );
};

export default ConfirmModal;
