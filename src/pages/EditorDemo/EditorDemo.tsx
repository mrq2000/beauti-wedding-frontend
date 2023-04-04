import Editor from '@/builder/editor/Editor';
import React, { FC } from 'react';
import EditDemo from './EditDemo';

const EditorDemo: FC = () => {
  return (
    <Editor info={undefined} enabled={false} resolver={{}}>
      <EditDemo />
    </Editor>
  );
};

export default EditorDemo;
