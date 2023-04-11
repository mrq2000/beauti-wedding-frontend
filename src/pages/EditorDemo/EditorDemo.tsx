import { Page } from '@/builder/components/page/Page';
import React, { FC } from 'react';
import Editor from '@/builder/editor/Editor';
import EditDemo from './EditDemo';

const EditorDemo: FC = () => {
  return (
    <Editor info={undefined} enabled={false} resolver={{ Page }}>
      <EditDemo />
    </Editor>
  );
};

export default EditorDemo;
