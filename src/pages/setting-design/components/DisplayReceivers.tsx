import React, { FC, useEffect, useRef, useState } from 'react';
import { Box, Typography, TextField, Collapse, CircularProgress, Chip, useTheme, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';
import cloneDeep from 'lodash.clonedeep';
import { enqueueSnackbar } from 'notistack';

import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import useUpdateDesignReceivers from '@/data/design/useUpdateDesignReceivers';
import { useDebounce } from 'react-use';
import CustomTooltip from '@/components/common/CustomTooltip';
import ConfirmModal from '@/components/common/ConfirmModal';

type Receiver = { name: string; id: string };

interface DisplayReceiversProps {
  receivers?: string;
  domain: string;
}

const DisplayReceivers: FC<DisplayReceiversProps> = ({ receivers, domain }) => {
  const { designId } = useParams();
  const [currentReceivers, setCurrentReceivers] = useState<Receiver[]>(JSON.parse(receivers || '[]'));
  const [input, setInput] = useState('');
  const [startApi, setStartApi] = useState(false);
  const [receiverDelete, setReceiverDelete] = useState<null | Receiver>(null);
  const [copyId, setCopyId] = useState('');

  const theme = useTheme();

  const receiverAbortController = useRef<AbortController>();

  const {
    mutate: updateReceivers,
    isLoading: loadingUpdateReceivers,
    isError,
  } = useUpdateDesignReceivers(+(designId || ''));
  const receiverString = JSON.stringify(currentReceivers);

  const handleDeletePage = () => {
    if (!receiverDelete) return;
    let newReceiver = cloneDeep(currentReceivers);
    newReceiver = newReceiver.filter((receiver) => receiver.id !== receiverDelete.id);
    setReceiverDelete(null);
    setCurrentReceivers(newReceiver);
  };

  useEffect(() => {
    let timeout: any;
    if (copyId) {
      timeout = setTimeout(() => {
        setCopyId('');
      }, 2000);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [copyId]);

  const handleCopy = (link: string, receiverId: string) => {
    setCopyId(receiverId);
    navigator.clipboard.writeText(link);
    enqueueSnackbar({
      variant: 'info',
      message: 'Đã sao chép link',
      anchorOrigin: {
        horizontal: 'right',
        vertical: 'bottom',
      },
    });
  };

  useDebounce(
    async () => {
      if (receivers == receiverString) {
        return;
      }

      if (receiverAbortController.current) {
        receiverAbortController.current.abort();
      }

      receiverAbortController.current = new window.AbortController();
      updateReceivers({
        receivers: receiverString,
      });
      if (!startApi) setStartApi(true);
    },
    2000,
    [receiverString],
  );

  return (
    <Box
      width="100%"
      p={{ xs: 2, lg: 2.5 }}
      borderRadius="12px"
      bgcolor="#fff"
      sx={{ boxShadow: '-2px 3px 5px #00000015' }}
    >
      <Box display="flex" alignItems="center" mb={1} justifyContent="space-between">
        <Typography variant="h6" mb={1}>
          Thêm người nhận
        </Typography>

        {startApi && (
          <Typography variant="caption">
            {loadingUpdateReceivers ? (
              <>
                <CircularProgress size={10} sx={{ mr: 0.5 }} />
                Đang lưu...
              </>
            ) : isError ? (
              <Chip size="small" label="Lưu bị lỗi!" color="error" sx={{ fontSize: 11 }} />
            ) : (
              <Chip size="small" label="Đã lưu!" color="primary" sx={{ fontSize: 11 }} />
            )}
          </Typography>
        )}
      </Box>

      <TextField
        placeholder="Enter để thêm"
        sx={{ display: 'flex', flex: 1 }}
        value={input}
        size="small"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            const randomId = uuidv4().substr(0, 6);
            const clone = [
              {
                name: input,
                id: randomId,
              },
              ...currentReceivers,
            ];

            setCurrentReceivers(clone);
            setInput('');
          }
        }}
      />

      <Box mt={2} width="100%">
        <Typography variant="h6">Danh sách người nhận</Typography>

        {Object.keys(currentReceivers).length ? (
          <Box component={TransitionGroup} sx={{ display: 'flex', flexDirection: 'column' }}>
            {currentReceivers.map((receiver) => (
              <Collapse key={receiver.id}>
                <Box
                  sx={{
                    '&:hover': { background: theme.palette.grey[200] },
                    marginX: '-8px',
                    p: '4px 8px',
                    borderRadius: '4px',
                    lineHeight: 1,
                  }}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography sx={{ fontSize: 16 }}>{receiver.name}</Typography>
                  <Box display="flex" alignItems="center">
                    <Typography variant="caption" sx={{ fontSize: 14, ml: 1, display: { xs: 'none', md: 'block' } }}>
                      {`${import.meta.env.VITE_APP_LIVE_DOMAIN}/${domain}/${receiver.id}`}
                    </Typography>

                    {receiver.id == copyId ? (
                      <Box sx={{ ml: 1 }}>
                        <DoneRoundedIcon fontSize="small" color="success" />
                      </Box>
                    ) : (
                      <CustomTooltip title="Sao chép link" placement="top">
                        <Box
                          sx={{ cursor: 'pointer', ml: 1 }}
                          onClick={() =>
                            handleCopy(`${import.meta.env.VITE_APP_LIVE_DOMAIN}/${domain}/${receiver.id}`, receiver.id)
                          }
                        >
                          <ContentCopyRoundedIcon fontSize="small" htmlColor="#3E6D9C" />
                        </Box>
                      </CustomTooltip>
                    )}

                    <CustomTooltip title="Xóa" placement="top">
                      <Box sx={{ cursor: 'pointer', ml: 1 }} onClick={() => setReceiverDelete({ ...receiver })}>
                        <DeleteRoundedIcon fontSize="small" htmlColor="#CD1818" />
                      </Box>
                    </CustomTooltip>
                  </Box>
                </Box>
              </Collapse>
            ))}

            <ConfirmModal
              title={`Xóa người nhận`}
              content={
                <>
                  Bạn có chắc chắn muốn xóa <b>{receiverDelete?.name}</b> không? Link dành cho người nhận này sẽ bị vô
                  hiêu hóa.
                </>
              }
              open={receiverDelete !== null}
              onClose={() => setReceiverDelete(null)}
            >
              <Button
                sx={{ width: '120px' }}
                variant="contained"
                color="error"
                onClick={() => {
                  handleDeletePage();
                }}
              >
                Xóa
              </Button>
            </ConfirmModal>
          </Box>
        ) : (
          <Box fontSize={16} textAlign="center" py={4} color="#6F7581">
            Hiện tại bạn chưa thêm người nhận nào.
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DisplayReceivers;
