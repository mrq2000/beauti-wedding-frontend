import { useEditor } from '@craftjs/core';
import { Box, Button, IconButton, Typography } from '@mui/material';
import React, { FC, useContext, useEffect, useMemo, useRef, useState } from 'react';
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import RedoRoundedIcon from '@mui/icons-material/RedoRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';

import { VIEW_MODE } from '../InvitationDesignPage';
import CustomTooltip from '@/components/common/CustomTooltip';
import { useNavigate, useParams } from 'react-router-dom';
import useUpdateDraftData from '@/data/design/useUpdateDraftData';
import { ElementContext } from '../ElementWarp';
import { useDebounce } from 'react-use';
import { handleErrorMessage } from '@/helpers/error';

interface HeaderProps {
  viewMode: VIEW_MODE;
}
export const HEADER_HEIGHT = 56;

const Header: FC<HeaderProps> = ({ viewMode }) => {
  const { id } = useParams();
  const [init, setInit] = useState(false);
  const [startApi, setStartApi] = useState(false);
  const { mutate: updateDraftData, isLoading, isError } = useUpdateDraftData();
  const { elements } = useContext(ElementContext);
  const draftDataAbortController = useRef<AbortController>();

  const { canUndo, canRedo, actions, enabled, serializeElement } = useEditor((state, query) => ({
    enabled: state.options.enabled,
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
    serializeElement: query.serialize(),
  }));

  const navigate = useNavigate();

  useEffect(() => {
    if (!enabled) return;
    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'z' && canUndo) {
        actions.history.undo();
      }
      if (event.ctrlKey && event.key === 'y' && canRedo) {
        actions.history.redo();
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => {
      window.removeEventListener('keydown', handleKeyboard);
    };
  }, [enabled, canUndo, canRedo]);

  const elementString = useMemo(() => {
    return JSON.stringify(elements);
  }, [elements, serializeElement]);

  useDebounce(
    async () => {
      if (!init) {
        setInit(true);
        return;
      }
      if (enabled && id) {
        if (draftDataAbortController.current) {
          draftDataAbortController.current.abort();
        }

        draftDataAbortController.current = new window.AbortController();
        updateDraftData({
          data: JSON.stringify(elements),
          designId: +id,
        });
        if (!startApi) setStartApi(true);
      }
    },
    3000,
    [elementString, enabled],
  );

  return (
    <Box
      sx={{
        height: HEADER_HEIGHT,
        zIndex: 1000,
        paddingX: '24px',
        background: 'white',
        position: 'fixed',
        width: '100%',
        borderBottom: '1px solid #D5D8DF',
        display: 'flex',
        alignItems: 'center',
        flex: 1,
      }}
    >
      <Box
        sx={{ flex: 1, color: '#383b3f', cursor: 'pointer', alignItems: 'center', display: 'flex' }}
        onClick={() => navigate('/')}
      >
        <ArrowBackIosNewRoundedIcon sx={{ color: '#383b3f', mr: 0.5, fontSize: 14 }} /> Dashboard
        {startApi && (
          <Typography variant="caption" sx={{ ml: 3 }}>
            {isLoading ? (
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
      <Box sx={{ gap: '16px', display: 'flex' }}>
        <Box
          sx={{
            padding: '4px 16px',
            borderRadius: '20px',
            background: '#edf2fa',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <CustomTooltip title="Hoàn tác (Ctrl + Z)">
            <IconButton
              size="small"
              component="label"
              disabled={!canUndo}
              onClick={() => actions.history.undo()}
              color="primary"
              sx={{
                '&.Mui-disabled': {
                  pointerEvents: 'auto',
                },
              }}
            >
              <UndoRoundedIcon />
            </IconButton>
          </CustomTooltip>

          <CustomTooltip title="Làm lại (Ctrl + Y)">
            <IconButton
              size="small"
              component="label"
              disabled={!canRedo}
              onClick={() => actions.history.redo()}
              color="primary"
              sx={{
                '&.Mui-disabled': {
                  pointerEvents: 'auto',
                },
              }}
            >
              <RedoRoundedIcon />
            </IconButton>
          </CustomTooltip>
        </Box>

        <Button variant="contained" sx={{ ml: 1 }}>
          Tiếp tục
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
