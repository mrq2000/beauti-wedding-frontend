import { FontSetting, Spacing } from '@/editor/interface/setting';
import { DeepPartial } from '@/interface';
import { mergeWithoutArray } from '@/utils/merge';
import { useNode } from '@craftjs/core';
import { Box } from '@mui/material';
import FontSettingComp from '../common/FontSetting';
import SpacingSetting from '../common/SpacingSetting';

export interface TextStyle {
  font: FontSetting;
  padding: Spacing;
}
export interface ITextSetting {
  text: string;
  style: TextStyle;
}
const TextSetting = () => {
  const {
    actions: { setProp },
    textProps,
  } = useNode((node) => ({
    textProps: node.data.props as ITextSetting,
  }));

  const onChange = (data: DeepPartial<TextStyle>) => {
    setProp((props: ITextSetting) => {
      props.style = mergeWithoutArray(props.style, data);
    });
  };

  return (
    <>
      <FontSettingComp
        font={textProps.style.font}
        onChange={(value) => {
          onChange({
            font: value,
          });
        }}
      />

      <Box mt={2}>
        <SpacingSetting
          title="Padding"
          spacing={textProps.style.padding}
          onChange={(value) => {
            onChange({
              padding: value,
            });
          }}
        />
      </Box>
    </>
  );
};

export default TextSetting;
