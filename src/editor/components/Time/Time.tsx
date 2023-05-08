import React, { useContext } from 'react';
import { useNode } from '@craftjs/core';
import TimeSetting, { ITimeSetting } from './TimeSetting';
import { Box } from '@mui/material';
import { genPaddingSpacing } from '@/utils/spacing';
import { genFont } from '@/utils/font';
import { TimeLayouts } from './TimeLayout';
import { InfoContext } from '@/pages/menu-design/InfoContext';
import dayjs from 'dayjs';

export const Time = ({ style: { font, padding }, timeLayoutId }: ITimeSetting) => {
  const {
    connectors: { connect, drag },
  } = useNode((state) => ({
    selected: state.events.selected,
  }));
  const {
    info: { time },
  } = useContext(InfoContext);

  return (
    <Box
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      sx={{
        ...genPaddingSpacing(padding),
        ...genFont(font),
      }}
    >
      {React.createElement(TimeLayouts[timeLayoutId] || TimeLayouts.basic, {
        time: dayjs(time),
        font: font,
      })}
    </Box>
  );
};

export const TimeDefaultProps: ITimeSetting = {
  style: {
    font: {
      fontSize: 20,
      fontFamily: 'Roboto Slab',
      fontWeight: '400',
      color: '#a00a0a',
      textAlign: 'center',
      fontStyle: 'unset',
    },
    padding: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  },
  timeLayoutId: 'customLayout2',
};

Time.craft = {
  displayName: 'Time',
  props: TimeDefaultProps,
  related: {
    settings: TimeSetting,
  },
};
