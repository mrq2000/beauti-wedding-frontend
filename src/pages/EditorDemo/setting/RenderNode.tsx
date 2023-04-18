import React from 'react';
import { Box } from '@mui/material';
import { useEditor } from '@craftjs/core';

const RenderNode = ({ render }: any) => {
  const { query } = useEditor();

  return <Box>{render}</Box>;
};

export default RenderNode;
