import { Typography, Fade, styled, Drawer as MuiDrawer, Theme, CSSObject, Box } from '@mui/material';
import React, { FC } from 'react';
import { HEADER_HEIGHT } from '../Header';
import { useEditor } from '@craftjs/core';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const openDrawerWidth = 360;
const closeDrawerWidth = 0;

const openedMixin = (theme: Theme): CSSObject => ({
  width: openDrawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  top: 'unset',
  maxHeight: 'unset',
  height: `calc(100% - ${HEADER_HEIGHT}px)`,
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `${closeDrawerWidth}px`,
  top: 'unset',
  maxHeight: 'unset',
  height: `calc(100% - ${HEADER_HEIGHT}px)`,
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: openDrawerWidth,
  flexShrink: 0,
  '& .MuiTabs-indicator': {
    display: 'none',
  },
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const SidebarElementSetting: FC = () => {
  const {
    actions: { selectNode },
    selectedNode,
  } = useEditor((state, query) => {
    const nodes = query.getNodes();
    const currentNodeId = query.getEvent('selected').last();
    const selectedNode = nodes[currentNodeId];
    return {
      selectedNode,
    };
  });

  const handleClose = () => {
    selectNode();
  };

  return (
    <Drawer
      variant="permanent"
      anchor="right"
      PaperProps={{
        style: {
          zIndex: 900,
        },
      }}
      open={!!selectedNode && !!selectedNode.related.settings}
    >
      <Box pt={2} display="flex" flexDirection="column" overflow="auto" height="100%">
        <Box px={2} justifyContent="space-between" width="100%" display="flex">
          <Typography variant="h4" component="div">
            {selectedNode?.data?.displayName}
          </Typography>
          <Box onClick={handleClose} sx={{ cursor: 'pointer' }}>
            <HighlightOffIcon color="action" />
          </Box>
        </Box>
        {selectedNode && (
          <Box
            px={2}
            py={2}
            display="flex"
            flexDirection="column"
            sx={{ overflowY: 'auto', overflowX: 'hidden', flex: 1 }}
          >
            {React.createElement(selectedNode.related.settings)}
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default SidebarElementSetting;
