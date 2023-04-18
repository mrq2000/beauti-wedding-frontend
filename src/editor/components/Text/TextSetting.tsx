import { FontSetting } from '@/editor/interface/setting';
import { useNode } from '@craftjs/core';
import { FormControl, FormLabel, Slider } from '@mui/material';

export interface ITextSetting {
  text: string;
  color: string;
  font: FontSetting;
  textAlign: 'left' | 'right' | 'center';
}
const TextSetting = () => {
  const {
    actions: { setProp },
    textProps,
  } = useNode((node) => ({
    textProps: node.data.props as ITextSetting,
  }));

  return (
    <>
      <FormControl size="small" component="fieldset">
        <FormLabel component="legend">Font size</FormLabel>
        <Slider
          value={textProps.font.fontSize || 7}
          step={7}
          min={1}
          max={50}
          onChange={(_, value) => {
            setProp((props: ITextSetting) => (props.font.fontSize = value as number), 1000);
          }}
        />
      </FormControl>
    </>
  );
};

export default TextSetting;
