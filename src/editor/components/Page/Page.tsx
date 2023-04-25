import { useEditor, useNode } from '@craftjs/core';
import ContentEditable from 'react-contenteditable';
import React, { useState, useEffect, PropsWithChildren } from 'react';
import PageSetting, { IPageSetting } from './PageSetting';
import { Box } from '@mui/material';
import { isNull } from 'util';

export const Page = ({ children }: PropsWithChildren<IPageSetting>) => {
  const {
    connectors: { connect, drag },
    selected,
  } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }));

  return (
    <Box
      sx={{ p: 2, height: 600, backgroundColor: '#fff', width: 400 }}
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
    >
      {children}
    </Box>
  );
};

export const PageDefaultProps: IPageSetting = {};

Page.craft = {
  displayName: 'Page',
  isCanvas: true,
  props: PageDefaultProps,
  related: {
    settings: PageSetting,
  },
};
