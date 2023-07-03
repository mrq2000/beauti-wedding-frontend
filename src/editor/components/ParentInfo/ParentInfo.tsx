import React, { useContext } from 'react';
import { useNode } from '@craftjs/core';
import ParentInfoSetting, { IParentInfoSetting } from './ParentInfoSetting';
import { Box } from '@mui/material';
import { genPaddingSpacing } from '@/utils/spacing';
import { InfoContext } from '@/editor/InfoContext';
import { genFont } from '@/utils/font';

export const ParentInfo = ({ style, brideParentTitle, groomParentTitle }: IParentInfoSetting) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  const {
    info: { groomFatherName, groomMotherName, brideFatherName, brideMotherName },
  } = useContext(InfoContext);

  return (
    <Box
      display="flex"
      flex={1}
      flexDirection={style.direction}
      sx={{
        ...genPaddingSpacing(style.padding),
      }}
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
    >
      <Box display="flex" flex={1} flexDirection="column">
        <Box sx={{ ...genFont(style.titleFont) }}>{brideParentTitle}</Box>
        <Box sx={{ ...genFont(style.font) }}>{brideFatherName}</Box>
        <Box sx={{ ...genFont(style.font) }}>{brideMotherName}</Box>
      </Box>

      <Box display="flex" flex={1} flexDirection="column">
        <Box sx={{ ...genFont(style.titleFont) }}>{groomParentTitle}</Box>
        <Box sx={{ ...genFont(style.font) }}>{groomFatherName}</Box>
        <Box sx={{ ...genFont(style.font) }}>{groomMotherName}</Box>
      </Box>
    </Box>
  );
};

export const ParentInfoDefaultProps: IParentInfoSetting = {
  style: {
    padding: {
      top: 16,
      bottom: 16,
      left: 16,
      right: 16,
    },
    direction: 'row',
    font: {
      fontSize: 24,
      fontFamily: 'Dancing Script',
      fontWeight: '600',
      color: '#000000',
      textAlign: 'left',
      fontStyle: 'unset',
    },
    titleFont: {
      fontSize: 16,
      fontFamily: 'Dancing Script',
      fontWeight: '400',
      color: '#602e2e',
      textAlign: 'left',
      fontStyle: 'unset',
    },
  },
  brideParentTitle: 'Nhà Gái',
  groomParentTitle: 'Nhà Trai',
};

ParentInfo.craft = {
  displayName: 'Parents',
  props: ParentInfoDefaultProps,
  related: {
    settings: ParentInfoSetting,
  },
};
