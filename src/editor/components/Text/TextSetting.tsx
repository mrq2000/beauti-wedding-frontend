import { FontSetting } from '@/editor/interface/setting';
import { DeepPartial } from '@/interface';
import { mergeWithoutArray } from '@/utils/merge';
import { useNode } from '@craftjs/core';
import FontSettingComp from '../common/FontSetting';

export interface TextStyle {
  font: FontSetting;
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

  const onChangeFont = (data: DeepPartial<TextStyle>) => {
    setProp((props: ITextSetting) => {
      props.style = mergeWithoutArray(props.style, data);
    });
  };
  return (
    <>
      <FontSettingComp
        font={textProps.style.font}
        onChange={(value) => {
          onChangeFont({
            font: value,
          });
        }}
      />
    </>
  );
};

export default TextSetting;
