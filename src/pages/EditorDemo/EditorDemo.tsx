import React, { FC, useEffect, useState } from 'react';
import { Editor, Frame, useEditor } from '@craftjs/core';
import RenderNode from './setting/RenderNode';
import { Box } from '@mui/material';
import { Page, Text } from '@/editor/components';
import Header, { HEADER_HEIGHT } from './components/Header';
import SidebarElementSetting from './components/SidebarElementSetting';
import MenuSidebar from './components/MenuSidebar';

export type VIEW_MODE = 'PREVIEW' | 'EDIT';

const EditDesign = () => {
  const { connectors } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <Box id="editor-container" sx={{ padding: 1, overflowY: 'auto' }} display="flex" justifyContent="center" flex={1}>
      <Box
        p="30px"
        display="flex"
        justifyContent="center"
        flex={1}
        ref={(ref: HTMLElement) => connectors.select(connectors.hover(ref, null), null)}
      >
        <Frame>
          <Page>
            <Text />
            <Text />
          </Page>
        </Frame>
      </Box>
    </Box>
  );
};
const EditorDemo: FC = () => {
  const [viewMode, setViewMode] = useState<VIEW_MODE>('EDIT');

  return (
    <Editor resolver={{ Text, Page }} onRender={RenderNode}>
      <Box flex={1} flexDirection="column" height="100%">
        <Header viewMode={viewMode} />
        <Box display="flex" flex={1} height="100%" sx={{ paddingTop: `${HEADER_HEIGHT}px` }} flexDirection="row">
          <MenuSidebar />
          <EditDesign />
          <SidebarElementSetting />
        </Box>
      </Box>
    </Editor>
  );
};

export default EditorDemo;
