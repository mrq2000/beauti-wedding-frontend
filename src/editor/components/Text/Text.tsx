import { useNode } from '@craftjs/core';
import ContentEditable from 'react-contenteditable';
import React, { useState, useEffect } from 'react';
import TextSetting, { ITextSetting } from './TextSetting';
import { Box } from '@mui/material';
import { genPaddingSpacing } from '@/utils/spacing';
import { genFont } from '@/utils/font';

export const Text = ({ text, style: { font, padding } }: ITextSetting) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (selected) {
      return;
    }

    setEditable(false);
  }, [selected]);

  return (
    <Box
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      onClick={() => {
        if (selected) {
          setEditable(true);
        }
      }}
      sx={{
        ...genPaddingSpacing(padding),
      }}
    >
      <ContentEditable
        html={text}
        disabled={!editable}
        onChange={(e) => setProp((props: ITextSetting) => (props.text = e.target.value), 1000)}
        tagName="p"
        style={genFont(font)}
      />
    </Box>
  );
};

export const TextDefaultProps: ITextSetting = {
  text: 'Click vào đây để chỉnh sửa!',
  style: {
    font: {
      fontSize: 20,
      fontFamily: 'Roboto Slab',
      fontWeight: '400',
      color: '#000000',
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
};

Text.craft = {
  displayName: 'Text',
  props: TextDefaultProps,
  related: {
    settings: TextSetting,
  },
};
