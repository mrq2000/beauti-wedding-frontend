import { useNode } from '@craftjs/core';
import ContentEditable from 'react-contenteditable';
import React, { useState, useEffect } from 'react';
import TextSetting, { ITextSetting } from './TextSetting';

export const Text = ({ text, style: { font } }: ITextSetting) => {
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
    <div
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      onClick={() => {
        if (selected) {
          setEditable(true);
        }
      }}
    >
      <ContentEditable
        html={text}
        disabled={!editable}
        onChange={(e) => setProp((props: ITextSetting) => (props.text = e.target.value), 500)}
        tagName="p"
        style={{
          fontSize: `${font.fontSize}px`,
          textAlign: font.textAlign,
          color: font.color,
          fontFamily: font.fontFamily,
          fontStyle: font.fontStyle,
          fontWeight: font.fontWeight,
        }}
      />
    </div>
  );
};

export const TextDefaultProps: ITextSetting = {
  text: 'Click vào đây để chỉnh sửa!',
  style: {
    font: {
      fontSize: 20,
      fontFamily: 'inherit',
      fontWeight: '400',
      color: '#000000',
      textAlign: 'left',
      fontStyle: 'unset',
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
