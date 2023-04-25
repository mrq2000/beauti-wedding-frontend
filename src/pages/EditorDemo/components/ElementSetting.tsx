import { Text } from '@/editor/components';
import { useEditor } from '@craftjs/core';
import { Box, Button, Typography } from '@mui/material';
import React, { FC, Fragment } from 'react';

const ElementSetting: FC = () => {
  const { connectors } = useEditor();
  return (
    <Fragment>
      <Box pb="12px">
        <Typography sx={{ fontSize: '16px', color: (theme) => theme.palette.primary.main, fontWeight: 500 }}>
          Kéo thả để thêm
        </Typography>
      </Box>
      <Box
        textAlign="center"
        width="100%"
        border="1px dashed"
        sx={{ cursor: 'move', py: '5px' }}
        ref={(ref: HTMLElement) => connectors.create(ref, <Text />)}
      >
        Text
      </Box>
    </Fragment>
  );
};

export default ElementSetting;
