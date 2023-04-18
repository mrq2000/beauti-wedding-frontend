import React, { FC, useState } from 'react';
import { Editor, Frame } from '@craftjs/core';
import RenderNode from './setting/RenderNode';
import { Box } from '@mui/material';
import { Text } from '@/editor/components';
import Header, { HEADER_HEIGHT } from './components/Header';
import SideBarSetting from './setting/SidebarSetting';

export type VIEW_MODE = 'PREVIEW' | 'EDIT';

const EditorDemo: FC = () => {
  const [viewMode, setViewMode] = useState<VIEW_MODE>('EDIT');

  return (
    <Editor resolver={{ Text }} onRender={RenderNode}>
      <Box flex={1} flexDirection="column" height="100%">
        <Header viewMode={viewMode} />
        <Box display="flex" flex={1} height="100%" sx={{ paddingTop: `${HEADER_HEIGHT}px` }} flexDirection="row">
          <Box sx={{ padding: 1 }} display="flex" alignItems="center" justifyContent="center" flex={1}>
            <Frame>
              <Text />
            </Frame>
          </Box>
          <SideBarSetting />
        </Box>
      </Box>
    </Editor>
  );
};

export default EditorDemo;
