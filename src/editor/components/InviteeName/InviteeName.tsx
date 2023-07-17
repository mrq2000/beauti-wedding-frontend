import { useNode } from '@craftjs/core';
import React, { useContext } from 'react';
import InviteeNameSetting, { IInviteeNameSetting } from './InviteeNameSetting';
import { Box } from '@mui/material';
import { genPaddingSpacing } from '@/utils/spacing';
import { genFont } from '@/utils/font';
import { InfoContext } from '@/editor/InfoContext';

export const InviteeName = ({
  label,
  style: { labelFont, inviteeNameFont, padding, inviteeNameBorderBottom },
}: IInviteeNameSetting) => {
  const {
    connectors: { connect, drag },
  } = useNode((state) => ({
    selected: state.events.selected,
  }));
  const { inviteeName } = useContext(InfoContext);

  return (
    <Box
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      sx={{
        ...genPaddingSpacing(padding),
        display: 'flex',
        flex: 1,
        alignItems: 'end',
      }}
    >
      <Box sx={{ ...genFont(labelFont), whiteSpace: 'nowrap', lineHeight: '100%' }}>{label}</Box>
      &nbsp;&nbsp;
      <Box
        sx={{
          ...genFont(inviteeNameFont),
          whiteSpace: 'nowrap',
          lineHeight: '100%',
          width: '100%',
          borderBottom: `${inviteeNameBorderBottom.borderWidth}px ${inviteeNameBorderBottom.borderStyle} ${inviteeNameBorderBottom.borderColor}`,
        }}
      >
        &nbsp;&nbsp;{inviteeName}
      </Box>
    </Box>
  );
};

export const InviteeNameDefaultProps: IInviteeNameSetting = {
  label: 'Kính mời:',
  style: {
    labelFont: {
      fontSize: 16,
      fontFamily: 'Roboto Slab',
      fontWeight: '400',
      color: '#000000',
      textAlign: 'left',
      fontStyle: 'unset',
    },
    inviteeNameFont: {
      fontSize: 24,
      fontFamily: 'Dancing Script',
      fontWeight: '400',
      color: '#c41515',
      textAlign: 'center',
      fontStyle: 'unset',
    },
    padding: {
      top: 20,
      left: 80,
      bottom: 20,
      right: 80,
    },
    inviteeNameBorderBottom: {
      borderWidth: 1,
      borderStyle: 'dashed',
      borderColor: '#c41515',
    },
  },
};

InviteeName.craft = {
  displayName: 'InviteeName',
  props: InviteeNameDefaultProps,
  related: {
    settings: InviteeNameSetting,
  },
};
