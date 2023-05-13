import { Border, FontSetting, Spacing } from '@/editor/interface/setting';
import { DeepPartial } from '@/interface';
import { mergeWithoutArray } from '@/utils/merge';
import { useNode } from '@craftjs/core';
import { Box } from '@mui/material';
import BorderStyleSetting from '../common/BorderStyleSetting';
import FontSettingComp from '../common/FontSetting';
import SpacingSetting from '../common/SpacingSetting';

interface LocationStyle {
  font: FontSetting;
  padding: Spacing;
  borderBottom: Border;
}
export interface ILocationSetting {
  style: LocationStyle;
}
const LocationSetting = () => {
  const {
    actions: { setProp },
    locationProps,
  } = useNode((node) => ({
    locationProps: node.data.props as ILocationSetting,
  }));

  const onChange = (data: DeepPartial<LocationStyle>) => {
    setProp((props: ILocationSetting) => {
      props.style = mergeWithoutArray(props.style, data);
    }, 1000);
  };

  return (
    <>
      <FontSettingComp
        font={locationProps.style.font}
        onChange={(value) => {
          onChange({
            font: value,
          });
        }}
      />

      <Box mt={2}>
        <BorderStyleSetting
          border={locationProps.style.borderBottom}
          onChange={(border) => {
            onChange({
              borderBottom: border,
            });
          }}
        />
      </Box>

      <Box mt={2}>
        <SpacingSetting
          title="Padding"
          spacing={locationProps.style.padding}
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

export default LocationSetting;
