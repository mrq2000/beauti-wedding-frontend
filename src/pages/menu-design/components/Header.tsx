import { useEditor } from '@craftjs/core';
import { Box, Button, IconButton } from '@mui/material';
import React, { FC } from 'react';
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import RedoRoundedIcon from '@mui/icons-material/RedoRounded';

import { VIEW_MODE } from '../MenuDesignPage';
import CustomTooltip from '@/components/common/CustomTooltip';

interface HeaderProps {
  viewMode: VIEW_MODE;
}
export const HEADER_HEIGHT = 56;

const Header: FC<HeaderProps> = ({ viewMode }) => {
  const { canUndo, canRedo, actions } = useEditor((state, query) => ({
    enabled: state.options.enabled,
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }));

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
      <Box sx={{ gap: '16px' }}>
        <CustomTooltip title="Undo">
          <IconButton component="label" disabled={!canUndo} onClick={() => actions.history.undo()} color="primary">
            <UndoRoundedIcon />
          </IconButton>
        </CustomTooltip>

        <CustomTooltip title="Redo">
          <IconButton component="label" disabled={!canRedo} onClick={() => actions.history.redo()} color="primary">
            <RedoRoundedIcon />
          </IconButton>
        </CustomTooltip>

        <Button variant="contained" sx={{ ml: 1 }}>Next Step</Button>
      </Box>
    </Box>
  );
};

export default Header;
