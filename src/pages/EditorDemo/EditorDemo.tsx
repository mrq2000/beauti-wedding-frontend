import { Page } from '@/builder/components/page/Page';
import React, { FC } from 'react';
import { Editor, Frame, Element } from '@craftjs/core';
import RenderNode from './RenderNode';
import data from './data.json';

const EditorDemo: FC = () => {
  return (
    <Editor resolver={{ Page }} onRender={RenderNode}>
      sssssss
      {/* <Frame json={JSON.stringify(data.test1)}>
      </Frame> */}

--------------------------------------------
      <Frame json={JSON.stringify(data.test2)}>
      </Frame>
    </Editor>
  );
};

export default EditorDemo;
