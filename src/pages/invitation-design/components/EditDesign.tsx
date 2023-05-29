import { useEditor, Frame } from '@craftjs/core';
import { Box, Button } from '@mui/material';
import { useRef, useState, useEffect, useLayoutEffect, FC, useContext, useMemo } from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import ConfirmModal from '@/components/common/ConfirmModal';
import { Page, Time } from '@/editor/components';
import { InviteeName } from '@/editor/components/InviteeName';
import { genNewPage } from '@/utils/editor';
import { ElementContext } from '../ElementWarp';

const MAX_PAGE = 3;

const EditDesign: FC = () => {
  const { elements, setElements } = useContext(ElementContext);
  const [elementIndex, setElementIndex] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [hiddenPage, setHiddenPage] = useState(false);

  const { connectors, rootNode, actions, serializeElement } = useEditor((state, query) => ({
    enabled: state.options.enabled,
    serializeElement: query.serialize(),
    rootNode: query.getNodes()['ROOT'],
  }));

  useEffect(() => {
    elements[elementIndex] = serializeElement;
  }, [serializeElement]);

  useLayoutEffect(() => {
    actions.deserialize(elements[elementIndex]);
    actions.history.clear();
  }, [elementIndex, elements]);

  const handleChangeElement = (index: number) => {
    setElementIndex(index);
  };

  const handleAddPage = () => {
    const currentLength = elements.length;
    const newElement = genNewPage(rootNode.data.props?.backgroundUrl);
    elements.push(newElement);
    setElementIndex(currentLength);
  };

  const handleDeletePage = () => {
    const isLastElement = elements.length - 1 == elementIndex;
    if (isLastElement) {
      setElementIndex(elementIndex - 1);
    } else {
      // elementIndex not updated so need call this func to rerender
      actions.deserialize(elements[elementIndex + 1]);
      actions.history.clear();
    }
    elements.splice(elementIndex, 1);
    setOpenDeleteDialog(false);
  };

  const currentMemo = useMemo(() => {
    if (!elements[elementIndex]) {
      setElementIndex(0);
    }
    return elements[elementIndex] || elements[0];
  }, [elements[elementIndex], elementIndex]);

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
        pb="46px"
        display="flex"
        justifyContent="center"
        flex={1}
        ref={(ref: HTMLElement) => connectors.select(connectors.hover(ref, null), null)}
      >
        <Frame data={currentMemo}>
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
        alignItems="center"
        justifyContent="flex-end"
        gap="16px"
        sx={{ position: 'sticky', bottom: 30, width: '100%', pr: 2 }}
      >
        {[...Array(elements.length).keys()].map((key) => {
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
                transition: 'all 0.2s ease-in',
                opacity: hiddenPage ? 0 : 1,
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
              {isActive && elements.length > 1 && (
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

        {elements.length < MAX_PAGE && (
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
              transition: 'all 0.2s ease-in',
              opacity: hiddenPage ? 0 : 1,
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

        <ExpandCircleDownOutlinedIcon
          fontSize="medium"
          onClick={() => setHiddenPage(!hiddenPage)}
          sx={{ cursor: 'pointer', transform: `rotate(${hiddenPage ? 90 : 270}deg)`, transition: 'all 0.2s ease-in' }}
        />
      </Box>
    </Box>
  );
};

export default EditDesign;
