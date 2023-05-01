import { useEditor, useNode } from '@craftjs/core';
import React, { useState, useEffect, PropsWithChildren } from 'react';
import PageSetting, { IPageSetting } from './PageSetting';
import { Box } from '@mui/material';
import { genPaddingSpacing } from '@/utils/spacing';

export const Page = ({ children, style }: PropsWithChildren<IPageSetting>) => {
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

export const PageDefaultProps: IPageSetting = {
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

Page.craft = {
  displayName: 'Page',
  isCanvas: true,
  props: PageDefaultProps,
  related: {
    settings: PageSetting,
  },
};
