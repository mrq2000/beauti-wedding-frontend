import React, { FC, useState, Fragment } from 'react';
import {
  Box,
  CSSObject,
  Drawer as MuiDrawer,
  IconButton,
  styled,
  Theme,
  DrawerProps,
  useTheme,
  Typography,
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CustomTooltip from '@/components/common/CustomTooltip';

import { HEADER_HEIGHT } from './Header';

const contentWidth = 388;
const iconDrawer = 56;

interface TabInfo {
  id: string;
  icon: React.ReactElement;
  tooltipTitle: string;
  element: JSX.Element;
}

const ICON_SIDE_BAR_INDEX = 900;

const openTransition = (theme: Theme, type = 'width') => ({
  transition: theme.transitions.create(type, {
    easing: theme.transitions.easing.sharp,
    duration: '0.4s',
  }),
});
const openedMixin = (): CSSObject => ({
  maxHeight: 'unset',
  zIndex: ICON_SIDE_BAR_INDEX,
});

const closeTransition = (theme: Theme, type = 'width') => ({
  transition: theme.transitions.create(type, {
    easing: theme.transitions.easing.sharp,
    duration: '0.4s',
  }),
});
const closedMixin = (): CSSObject => ({
  maxHeight: 'unset',
  overflow: 'hidden',
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<DrawerProps>(({ open }) => ({
  width: `${iconDrawer}px`,
  flexShrink: 0,
  '& .MuiTabs-indicator': {
    display: 'none',
  },
  zIndex: ICON_SIDE_BAR_INDEX,
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(),
    '& .MuiDrawer-paper': openedMixin(),
  }),
  ...(!open && {
    ...closedMixin(),
    '& .MuiDrawer-paper': closedMixin(),
  }),
  position: 'absolute',
}));

interface SidebarProps {
  tabs: TabInfo[];
}

const Sidebar: FC<SidebarProps> = ({ tabs }) => {
  const theme = useTheme();
  const [open, setOpen] = useState<null | string>(tabs[0].id);

  return (
    <Fragment>
      <Drawer
        variant="permanent"
        anchor="left"
        open={!!open}
        PaperProps={{ sx: { paddingTop: `${HEADER_HEIGHT}px`, borderRight: `1px solid ${theme.palette.grey[300]}` } }}
      >
        <Box
          pt={2}
          display="flex"
          alignItems="center"
          flexDirection="column"
          width={`${iconDrawer}px`}
          sx={{ backgroundColor: '#fff', flexGrow: 1 }}
        >
          {tabs.map((tab) => {
            const isActive = tab.id == open;

            return (
              <CustomTooltip title={tab.tooltipTitle} arrow placement="right" key={tab.id}>
                <IconButton
                  sx={{
                    color: isActive ? theme.palette.grey[100] : theme.palette.grey[500],
                    backgroundColor: isActive ? theme.palette.primary.main : 'inherit',
                    height: '36px',
                    width: '36px',
                    borderRadius: '8px',
                    fontSize: '19px',
                    mb: 2,
                    '&:hover': {
                      backgroundColor: isActive ? theme.palette.primary.main : '#0000000a',
                    },
                  }}
                  onClick={() => setOpen(tab.id)}
                >
                  {tab.icon}
                </IconButton>
              </CustomTooltip>
            );
          })}
        </Box>
      </Drawer>

      {tabs.map((tab) => {
        const isActive = tab.id == open;

        return (
          <Box
            key={tab.id}
            className="flex flex-col flex-auto overflow-y-auto border-r border-primary-40"
            sx={{
              position: 'absolute',
              top: HEADER_HEIGHT,
              left: iconDrawer,
              transform: `translateX(${isActive ? 0 : '-100%'})`,
              backgroundColor: '#fff',
              zIndex: isActive ? ICON_SIDE_BAR_INDEX - 1 : ICON_SIDE_BAR_INDEX - 2,
              borderRight: '1px solid #E7E8EC',
              ...(isActive ? openTransition(theme, 'transform') : closeTransition(theme, 'transform')),
            }}
            height={`calc(100% - ${HEADER_HEIGHT}px)`}
            width={`${contentWidth - iconDrawer}px`}
          >
            <Box display="flex" flex={1} flexDirection="column" overflow="auto" padding="20px 16px" height="100%">
              <Box justifyContent="space-between" width="100%" display="flex" mb="20px">
                <Typography variant="h4" component="div">
                  {tab.tooltipTitle}
                </Typography>
                <Box onClick={() => setOpen(null)} sx={{ cursor: 'pointer' }}>
                  <HighlightOffIcon color="action" />
                </Box>
              </Box>
              {tab.element}
            </Box>
          </Box>
        );
      })}
      <Box width={open ? contentWidth : iconDrawer} sx={open ? openTransition(theme) : closeTransition(theme)} />
    </Fragment>
  );
};

export default Sidebar;
