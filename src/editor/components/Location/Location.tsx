import { useNode } from '@craftjs/core';
import React, { useContext } from 'react';
import LocationSetting, { ILocationSetting } from './LocationSetting';
import { Box } from '@mui/material';
import { genPaddingSpacing } from '@/utils/spacing';
import { genFont } from '@/utils/font';
import { InfoContext } from '@/editor/InfoContext';

export const Location = ({ style: { font, padding, borderBottom } }: ILocationSetting) => {
  const {
    connectors: { connect, drag },
  } = useNode((state) => ({
    selected: state.events.selected,
  }));
  const {
    info: { location },
  } = useContext(InfoContext);

  return (
    <Box
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      sx={{
        ...genPaddingSpacing(padding),
      }}
    >
      <Box
        sx={{
          ...genFont(font),
          borderBottom: `${borderBottom.borderWidth}px ${borderBottom.borderStyle} ${borderBottom.borderColor}`,
        }}
      >
        {location}
      </Box>
    </Box>
  );
};

export const LocationDefaultProps: ILocationSetting = {
  style: {
    font: {
      fontSize: 16,
      fontFamily: 'Roboto Slab',
      fontWeight: '400',
      color: '#000000',
      textAlign: 'center',
      fontStyle: 'unset',
    },
    padding: {
      top: 20,
      left: 80,
      bottom: 20,
      right: 80,
    },
    borderBottom: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#000000',
    },
  },
};

Location.craft = {
  displayName: 'Location',
  props: LocationDefaultProps,
  related: {
    settings: LocationSetting,
  },
};
