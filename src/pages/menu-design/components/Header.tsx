import { useEditor } from '@craftjs/core';
import { Box, Button, IconButton } from '@mui/material';
import React, { FC, useEffect } from 'react';
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import RedoRoundedIcon from '@mui/icons-material/RedoRounded';

import { VIEW_MODE } from '../MenuDesignPage';
import CustomTooltip from '@/components/common/CustomTooltip';

interface HeaderProps {
  viewMode: VIEW_MODE;
}
export const HEADER_HEIGHT = 56;

const Header: FC<HeaderProps> = ({ viewMode }) => {
  const { canUndo, canRedo, actions, enabled } = useEditor((state, query) => ({
    enabled: state.options.enabled,
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }));

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
      <Box sx={{ flex: 1 }}></Box>
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
