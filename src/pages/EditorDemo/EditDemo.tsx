import React, { FC } from 'react';
import { useEditor } from '@/builder/hooks/useEditor';
import { Button } from '@mui/material';
import RenderNode from '@/builder/render/RenderNode';
import { useUpdateData } from '@/builder/hooks/useUpdateData';
import data from './data.json';

const EditDemo: FC = () => {
  useUpdateData(JSON.stringify(data.settings));

  return (
    <>
      <RenderNode nodeId="cover" />
    </>
  );
};

export default EditDemo;
