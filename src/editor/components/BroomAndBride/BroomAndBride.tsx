import React, { useContext } from 'react';
import { useNode } from '@craftjs/core';
import BroomAndBrideSetting, { IBroomAndBrideSetting } from './BroomAndBrideSetting';
import { Box } from '@mui/material';
import { genPaddingSpacing } from '@/utils/spacing';
import { InfoContext } from '@/pages/menu-design/InfoContext';
import { genFont } from '@/utils/font';

export const BroomAndBride = ({ style, textBetween }: IBroomAndBrideSetting) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  const {
    info: { broom, bride },
  } = useContext(InfoContext);
  const isColumnMode = style.direction == 'column';

  return (
    <Box
      display="flex"
      flex={1}
      flexDirection={style.direction}
      sx={{
        ...genPaddingSpacing(style.padding),
        ...genFont(style.font),
      }}
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
    >
      <Box>{bride.name}</Box>
      <Box
        sx={{
          padding: isColumnMode ? `${style.spaceBetween}rem 0` : `0 ${style.spaceBetween}rem`,
          alignSelf: isColumnMode ? 'unset' : 'center',
          fontSize: style.middleWordSize,
        }}
      >
        {textBetween}
      </Box>
      <Box>{broom.name}</Box>
    </Box>
  );
};

export const BroomAndBrideDefaultProps: IBroomAndBrideSetting = {
  style: {
    padding: {
      top: 16,
      bottom: 16,
      left: 16,
      right: 16,
    },
    direction: 'column',
    font: {
      fontSize: 50,
      fontFamily: 'Dancing Script',
      fontWeight: '400',
      color: '#602e2e',
      textAlign: 'center',
      fontStyle: 'unset',
    },
    spaceBetween: 0,
    middleWordSize: 24,
  },
  textBetween: '&',
};

BroomAndBride.craft = {
  displayName: 'Broom and Bride',
  props: BroomAndBrideDefaultProps,
  related: {
    settings: BroomAndBrideSetting,
  },
};
