import { useNode, useEditor } from '@craftjs/core';
import { Box, Button, styled, useTheme } from '@mui/material';
import React, { useEffect, useRef, useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DragHandleRoundedIcon from '@mui/icons-material/DragHandleRounded';
import { CSSTransition } from 'react-transition-group';
import { HEADER_HEIGHT } from '../components/Header';
import CustomTooltip from '@/components/common/CustomTooltip';
import ConfirmModal from '@/components/common/ConfirmModal';

const FadeBox = styled(Box)(() => ({
  opacity: 0,
  '&.fade-enter': {
    opacity: 0,
  },

  '&.fade-enter-active': {
    opacity: 1,
    transition: 'opacity 0.2s ease-in',
  },

  '&.fade-enter-done': {
    opacity: 1,
  },

  // '&.fade-exit': {
  //   opacity: 1,
  // },

  '&.fade-exit-active': {
    opacity: 0,
    transition: 'opacity 0.2s ease-in',
  },
}));

const LABEL_HEIGHT = 24;
const RenderNode = ({ render }: any) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { id } = useNode();
  const theme = useTheme();
  const { actions, query, isActive } = useEditor((_, query) => ({
    isActive: query.getEvent('selected').contains(id),
  }));

  const {
    isHover,
    dom,
    name,
    deletable,
    connectors: { drag },
    moveable,
  } = useNode((node) => ({
    isHover: node.events.hovered,
    dom: node.dom,
    name: node.data.custom.displayName || node.data.displayName,
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    parent: node.data.parent,
    props: node.data.props,
  }));

  const currentRef = useRef<HTMLDivElement>();
  const fadeRef = useRef<HTMLDivElement>();

  const getPos = useCallback((dom: HTMLElement) => {
    const { top, left } = dom
      ? {
          top: dom.getBoundingClientRect().top,
          left: dom.getBoundingClientRect().left,
        }
      : { top: 0, left: 0 };
    return {
      top: `${top > HEADER_HEIGHT + LABEL_HEIGHT ? top - LABEL_HEIGHT : HEADER_HEIGHT}px`,
      left: `${left - 2}px`,
    };
  }, []);

  const scroll = useCallback(() => {
    if (!dom) return;
    const { current: currentDOM } = currentRef;

    if (!currentDOM) return;
    const { top, left } = getPos(dom);
    currentDOM.style.top = top;
    currentDOM.style.left = left;
  }, [dom, getPos]);

  const craftjsContainer = document.querySelector('#editor-container');

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      scroll();
    });

    if (craftjsContainer) {
      resizeObserver.observe(craftjsContainer);
      craftjsContainer?.addEventListener('scroll', scroll);
    }

    return () => {
      if (craftjsContainer) {
        resizeObserver.unobserve(craftjsContainer);
        craftjsContainer.addEventListener('scroll', scroll);
      }
    };
  }, [scroll, craftjsContainer, dom]);

  useEffect(() => {
    if (dom) {
      if (isActive || isHover) {
        dom.style.outlineWidth = '2px';
        dom.style.outlineStyle = 'dashed';
        dom.style.outlineColor = isActive ? theme.palette.primary.main : theme.palette.primary.light;
      } else {
        dom.style.outlineColor = 'transparent';
      }
    }
  }, [dom, isActive, isHover]);

  return (
    <>
      {dom && craftjsContainer
        ? ReactDOM.createPortal(
            <CSSTransition nodeRef={fadeRef} in={isHover || isActive} classNames={'fade'} unmountOnExit timeout={200}>
              <FadeBox ref={fadeRef}>
                <Box
                  ref={currentRef}
                  display="flex"
                  flex={1}
                  alignItems="center"
                  sx={{
                    left: getPos(dom).left,
                    top: getPos(dom).top,
                    zIndex: 999,
                    height: `${LABEL_HEIGHT}px`,
                    paddingX: '4px',
                    color: '#fff',
                    position: 'fixed',
                    backgroundColor: (theme) => (isActive ? theme.palette.primary.main : theme.palette.primary.light),
                    borderTopLeftRadius: '4px',
                    fontSize: '14px',
                  }}
                >
                  <Box sx={{ mr: '4px' }}>{name}</Box>
                  {moveable ? (
                    <CustomTooltip title="Move" placement="top">
                      <Box display="flex" sx={{ mr: '2px', cursor: 'move' }} ref={drag}>
                        <DragHandleRoundedIcon sx={{ fontSize: '14px', mr: '2px', cursor: 'move' }} />
                      </Box>
                    </CustomTooltip>
                  ) : null}

                  {deletable ? (
                    <CustomTooltip title="Delete" placement="top">
                      <Box
                        display="flex"
                        sx={{ cursor: 'pointer' }}
                        onMouseDown={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          setOpenDeleteModal(true);
                        }}
                      >
                        <DeleteRoundedIcon sx={{ fontSize: '14px' }} />
                      </Box>
                    </CustomTooltip>
                  ) : null}

                  <ConfirmModal
                    title={`Delete ${name} Block`}
                    content={`Are you sure to delete this ${name}?`}
                    open={openDeleteModal}
                    onClose={() => setOpenDeleteModal(false)}
                  >
                    <Button
                      sx={{ width: '120px' }}
                      variant="contained"
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        actions.delete(id);
                      }}
                    >
                      Delete
                    </Button>
                  </ConfirmModal>
                </Box>
              </FadeBox>
            </CSSTransition>,
            craftjsContainer,
          )
        : null}
      {render}
    </>
  );
};

export default RenderNode;
