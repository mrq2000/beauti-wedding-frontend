import { Border, FontSetting, Spacing } from '@/editor/interface/setting';
import { DeepPartial } from '@/interface';
import { mergeWithoutArray } from '@/utils/merge';
import { useNode } from '@craftjs/core';
import { Box, Divider, TextField, Typography } from '@mui/material';
import BorderStyleSetting from '../common/BorderStyleSetting';
import FontSettingComp from '../common/FontSetting';
import SpacingSetting from '../common/SpacingSetting';

interface InviteeNameStyle {
  labelFont: FontSetting;
  inviteeNameFont: FontSetting;
  padding: Spacing;
  inviteeNameBorderBottom: Border;
}
export interface IInviteeNameSetting {
  label: string;
  style: InviteeNameStyle;
}
const InviteeNameSetting = () => {
  const {
    actions: { setProp },
    inviteeNameProps,
  } = useNode((node) => ({
    inviteeNameProps: node.data.props as IInviteeNameSetting,
  }));

  const onChange = (data: DeepPartial<InviteeNameStyle>) => {
    setProp((props: IInviteeNameSetting) => {
      props.style = mergeWithoutArray(props.style, data);
    }, 1000);
  };

  return (
    <>
      <Typography sx={{ fontWeight: 600, mb: 1 }}>Label Style</Typography>
      <TextField
        fullWidth
        sx={{ mb: 1 }}
        value={inviteeNameProps.label}
        size="small"
        label="Label"
        onChange={(e) => {
          setProp((props: IInviteeNameSetting) => {
            props.label = e.target.value;
          }, 1000);
        }}
      />
      <FontSettingComp
        font={inviteeNameProps.style.labelFont}
        isSubSetting={true}
        onChange={(value) => {
          onChange({
            labelFont: value,
          });
        }}
      />

      <Divider sx={{ my: 2 }} />

      <Typography sx={{ fontWeight: 600, mb: 1 }}>Invitee&apos;s name Style</Typography>
      <FontSettingComp
        font={inviteeNameProps.style.inviteeNameFont}
        isSubSetting={true}
        onChange={(value) => {
          onChange({
            inviteeNameFont: value,
          });
        }}
      />

      <Box mt={2}>
        <BorderStyleSetting
          border={inviteeNameProps.style.inviteeNameBorderBottom}
          onChange={(border) => {
            onChange({
              inviteeNameBorderBottom: border,
            });
          }}
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      <SpacingSetting
        title="Padding"
        spacing={inviteeNameProps.style.padding}
        onChange={(value) => {
          onChange({
            padding: value,
          });
        }}
      />
    </>
  );
};

export default InviteeNameSetting;
