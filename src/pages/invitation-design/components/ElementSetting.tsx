import { ParentInfo, Text, GroomAndBride, InviteeName, Time, Location } from '@/editor/components';
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
    title: 'Parents',
    element: <ParentInfo />,
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
      <Box pb="12px" display="flex" justifyContent="flex-end">
        <Typography
          sx={{
            fontSize: '16px',
            color: '#fff',
            fontWeight: 500,
            backgroundColor: (theme) => theme.palette.primary.light,
            width: 'fit-content',
            p: '4px 12px',
            borderRadius: '16px',
          }}
        >
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
