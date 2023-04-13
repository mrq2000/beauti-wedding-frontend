import React from 'react';
import { Box } from '@mui/material';
import { useEditor } from '@craftjs/core';

const RenderNode = ({ render }: any) => {
  const { query } = useEditor();
  console.log(query.serialize());
  
  return (
    <Box>
      Render Node
      {render}
      asdsadasd
    </Box>
  );
};

export default RenderNode;
