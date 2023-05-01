import { useEditor, useNode } from '@craftjs/core';
import React, { useState, useEffect, PropsWithChildren } from 'react';
import BroomAndBrideSetting, { IBroomAndBrideSetting } from './BroomAndBrideSetting';
import { Box } from '@mui/material';
import { genPaddingSpacing } from '@/utils/spacing';

export const BroomAndBride = ({ children, style }: PropsWithChildren<IBroomAndBrideSetting>) => {
  const {
    connectors: { connect, drag },
  } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }));

  return (
    <Box
      sx={{
        ...genPaddingSpacing(style.padding),
        height: 700,
        backgroundColor: '#fff',
        width: 450,
        borderRadius: `${style.borderRadius}px`,
        overflow: 'hidden',
        backgroundSize: 'cover',
      }}
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
    >
      {children}
    </Box>
  );
};

export const BroomAndBrideDefaultProps: IBroomAndBrideSetting = {
  style: {
    padding: {
      top: 16,
      bottom: 16,
      left: 16,
      right: 16,
    },
    borderRadius: 0,
  },
};

BroomAndBride.craft = {
  displayName: 'Broom And Bride',
  isCanvas: true,
  props: BroomAndBrideDefaultProps,
  related: {
    settings: BroomAndBrideSetting,
  },
};
