import React, { FC } from 'react';
import { useEditor } from '@/builder/hooks/useEditor';
import { Button } from '@mui/material';

const EditDemo: FC = () => {
  const {
    state,
    actions: { selectNode },
  } = useEditor();

  return (
    <>
      {JSON.stringify(state.selected)} <Button onClick={() => selectNode(`${Math.random()}`)}>Select</Button>
    </>
  );
};

export default EditDemo;
