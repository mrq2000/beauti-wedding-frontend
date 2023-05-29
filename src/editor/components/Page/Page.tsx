import { useEditor, useNode } from '@craftjs/core';
import React, { useState, useEffect, PropsWithChildren } from 'react';
import PageSetting, { IPageSetting } from './PageSetting';
import { Box } from '@mui/material';
import { genPaddingSpacing } from '@/utils/spacing';
import demo from '@/assets/demo.jpg';

export const Page = ({ children, style, backgroundUrl }: PropsWithChildren<IPageSetting>) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <Box
      sx={{
        ...genPaddingSpacing(style.padding),
        height: 680,
        backgroundColor: '#fff',
        width: 480,
        borderRadius: `${style.borderRadius}px`,
        overflow: 'hidden',
        backgroundSize: 'cover',
        backgroundImage: `url(${backgroundUrl})`,
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
    borderRadius: 8,
  },
  backgroundUrl: `url(${demo})`,
};

Page.craft = {
  displayName: 'Page',
  isCanvas: true,
  props: PageDefaultProps,
  related: {
    settings: PageSetting,
  },
};
