import { FontSetting, Spacing } from '@/editor/interface/setting';
import { useNode } from '@craftjs/core';
import { FormControl, Box, Slider } from '@mui/material';
import { DeepPartial } from '@/interface';
import { mergeWithoutArray } from '@/utils/merge';
import SpacingSetting from '../common/SpacingSetting';
import BorderRadiusSetting from '../common/BorderRadiusSetting';

export interface BroomAndBrideStyle {
  padding: Spacing;
  font: FontSetting;
  direction: 'column' | 'row';
}
export interface IBroomAndBrideSetting {
  style: BroomAndBrideStyle;
}
const BroomAndBride = () => {
  const {
    actions: { setProp },
    pageProps,
  } = useNode((node) => ({
    pageProps: node.data.props as IBroomAndBrideSetting,
  }));

  const onChangeStyle = (data: DeepPartial<BroomAndBrideStyle>) => {
    setProp((props: IBroomAndBrideSetting) => {
      props.style = mergeWithoutArray(props.style, data);
    });
  };

  return (
    <>
      <SpacingSetting
        title="Padding"
        spacing={pageProps.style.padding}
        max={48}
        onChange={(value) => {
          onChangeStyle({
            padding: value,
          });
        }}
      />
      <Box mt={2}>
        <BorderRadiusSetting
          borderRadius={pageProps.style.borderRadius}
          onChange={(value) => {
            onChangeStyle({
              borderRadius: value,
            });
          }}
        />
      </Box>
    </>
  );
};

export default BroomAndBride;
