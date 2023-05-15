import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Editor, Frame, useEditor } from '@craftjs/core';
import RenderNode from './setting/RenderNode';
import { Box, Button } from '@mui/material';
import { Page, Text, GroomAndBride, Time, Location } from '@/editor/components';
import Header, { HEADER_HEIGHT } from './components/Header';
import SidebarElementSetting from './components/SidebarElementSetting';
import MenuSidebar from './components/MenuSidebar';
import { DEMO_INFO, InfoContext } from './InfoContext';
import { InviteeName } from '@/editor/components/InviteeName';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { fakeData } from './data';
import ConfirmModal from '@/components/common/ConfirmModal';

export type VIEW_MODE = 'PREVIEW' | 'EDIT';
const MAX_PAGE = 3;

const EditDesign = () => {
  const elements = useRef<string[]>([fakeData, fakeData]);
  const [elementIndex, setElementIndex] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { connectors, query, actions, serializeElement } = useEditor((state, query) => ({
    enabled: state.options.enabled,
    serializeElement: query.serialize(),
  }));

  useEffect(() => {
    elements.current[elementIndex] = serializeElement;
  }, [serializeElement]);

  useLayoutEffect(() => {
    actions.deserialize(elements.current[elementIndex]);
    actions.history.clear();
  }, [elementIndex]);

  const handleChangeElement = (index: number) => {
    setElementIndex(index);
  };

  const handleAddPage = () => {
    const currentLength = elements.current.length;
    const lastElement = elements.current[currentLength - 1];
    elements.current.push(lastElement);
    setElementIndex(currentLength);
  };

  const handleDeletePage = () => {
    const isLastElement = elements.current.length - 1 == elementIndex;
    if (isLastElement) {
      setElementIndex(elementIndex - 1);
    } else {
      // elementIndex not updated so need call this func to rerender
      actions.deserialize(elements.current[elementIndex + 1]);
      actions.history.clear();
    }
    elements.current.splice(elementIndex, 1);
    setOpenDeleteDialog(false);
  };

  return (
    <Box
      id="editor-container"
      sx={{ overflowY: 'auto' }}
      display="flex"
      justifyContent="center"
      flex={1}
      flexDirection="column"
      position="relative"
    >
      <ConfirmModal
        title={`Xóa Trang ${elementIndex + 1}`}
        content={`Bạn có chắc chắn muốn xóa Trang này không?`}
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <Button
          sx={{ width: '120px' }}
          variant="contained"
          color="error"
          onClick={(e) => {
            handleDeletePage();
          }}
        >
          Xóa
        </Button>
      </ConfirmModal>
      <Box
        p="30px"
        display="flex"
        justifyContent="center"
        flex={1}
        ref={(ref: HTMLElement) => connectors.select(connectors.hover(ref, null), null)}
      >
        <Frame data={elements.current[elementIndex]}>
          <Page>
            {/* <Text />
            <GroomAndBride /> */}
            <Time />
            <InviteeName />
            <Location />
          </Page>
        </Frame>
      </Box>

      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        gap="16px"
        sx={{ position: 'absolute', bottom: 30, width: '100%' }}
      >
        {[...Array(elements.current.length).keys()].map((key) => {
          const isActive = key === elementIndex;
          return (
            <Box
              key={key}
              display="flex"
              justifyContent="center"
              alignItems="center"
              onClick={() => handleChangeElement(key)}
              position="relative"
              sx={{
                height: '120px',
                width: '80px',
                background: '#fff',
                borderRadius: '8px',
                boxShadow: '-2px 3px 5px #00000015',
                cursor: 'pointer',
                color: (theme) => (isActive ? theme.palette.primary.main : theme.palette.grey[400]),
                border: (theme) => `2px solid ${isActive ? theme.palette.primary.main : theme.palette.grey[400]}`,
                ...(!isActive
                  ? {
                      ':hover': {
                        color: (theme) => theme.palette.primary.light,
                        border: (theme) => `2px solid ${theme.palette.primary.light}`,
                      },
                    }
                  : {}),
              }}
            >
              {isActive && elements.current.length > 1 && (
                <Box
                  onClick={() => setOpenDeleteDialog(true)}
                  sx={{
                    cursor: 'pointer',
                    top: -8,
                    right: -8,
                    position: 'absolute',
                    background: 'white',
                    borderRadius: '100%',
                    height: '24px',
                    width: '24px',
                  }}
                >
                  <HighlightOffIcon color="error" sx={{ height: '100%', width: '100%' }} />
                </Box>
              )}
              Trang {key + 1}
            </Box>
          );
        })}

        {elements.current.length < MAX_PAGE && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            onClick={() => handleAddPage()}
            sx={{
              height: '120px',
              width: '80px',
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '-2px 3px 5px #00000015',
              cursor: 'pointer',
              color: (theme) => theme.palette.grey[400],
              border: (theme) => `2px dashed ${theme.palette.grey[400]}`,
              ':hover': {
                color: (theme) => theme.palette.primary.light,
                border: (theme) => `2px dashed ${theme.palette.primary.light}`,
              },
            }}
          >
            <AddRoundedIcon />
          </Box>
        )}
      </Box>
    </Box>
  );
};
const MenuDesignPage: FC = () => {
  const [viewMode, setViewMode] = useState<VIEW_MODE>('EDIT');
  const [info, setInfo] = useState(DEMO_INFO);

  return (
    <InfoContext.Provider
      value={{
        info,
        setInfo,
        inviteeName: 'Tên Người Nhận',
      }}
    >
      <Editor resolver={{ Text, Page, GroomAndBride, Time, InviteeName, Location }} onRender={RenderNode}>
        <Box flex={1} flexDirection="column" height="100%">
          <Header viewMode={viewMode} />
          <Box display="flex" flex={1} height="100%" sx={{ paddingTop: `${HEADER_HEIGHT}px` }} flexDirection="row">
            <MenuSidebar />
            <EditDesign />
            <SidebarElementSetting />
          </Box>
        </Box>
      </Editor>
    </InfoContext.Provider>
  );
};

export default MenuDesignPage;
