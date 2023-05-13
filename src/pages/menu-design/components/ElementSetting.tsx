import { Text } from '@/editor/components';
import { GroomAndBride } from '@/editor/components/GroomAndBride/GroomAndBride';
import { InviteeName } from '@/editor/components/InviteeName';
import { Time } from '@/editor/components/Time';
import { Location } from '@/editor/components/Location';
import { useEditor } from '@craftjs/core';
import { Box, Typography } from '@mui/material';
import React, { FC, Fragment } from 'react';

const ELEMENTS = [
  {
    title: 'Text',
    element: <Text />,
  },
  {
    title: 'Groom and Bride',
    element: <GroomAndBride />,
  },
  {
    title: 'Time',
    element: <Time />,
  },
  {
    title: `Invitee's Name`,
    element: <InviteeName />,
  },
  {
    title: 'Location',
    element: <Location />,
  },
];

const ElementSetting: FC = () => {
  const { connectors } = useEditor();
  return (
    <Fragment>
      <Box pb="12px">
        <Typography sx={{ fontSize: '16px', color: (theme) => theme.palette.primary.main, fontWeight: 500 }}>
          Kéo thả để thêm
        </Typography>
      </Box>

      {ELEMENTS.map((element, index) => (
        <Box
          key={index}
          textAlign="center"
          width="100%"
          border="1px dashed"
          sx={{ cursor: 'move', py: '12px', my: '8px' }}
          ref={(ref: HTMLElement) => connectors.create(ref, element.element)}
        >
          {element.title}
        </Box>
      ))}
    </Fragment>
  );
};

export default ElementSetting;
