import { FontSetting, Spacing } from '@/editor/interface/setting';
import { useNode } from '@craftjs/core';
import { Box, Slider, Typography, TextField, Button, Divider } from '@mui/material';
import TableRowsRoundedIcon from '@mui/icons-material/TableRowsRounded';
import ViewWeekRoundedIcon from '@mui/icons-material/ViewWeekRounded';

import { DeepPartial } from '@/interface';
import { mergeWithoutArray } from '@/utils/merge';
import SpacingSetting from '../common/SpacingSetting';
import FontSettingComp from '../common/FontSetting';

export interface ParentInfoStyle {
  padding: Spacing;
  font: FontSetting;
  direction: 'column' | 'row';
  titleFont: FontSetting;
}
export interface IParentInfoSetting {
  style: ParentInfoStyle;
  brideParentTitle?: string;
  groomParentTitle?: string;
}
const ParentInfoSetting = () => {
  const {
    actions: { setProp },
    pageProps,
  } = useNode((node) => ({
    pageProps: node.data.props as IParentInfoSetting,
  }));

  const onChangeStyle = (data: DeepPartial<ParentInfoStyle>) => {
    setProp((props: IParentInfoSetting) => {
      props.style = mergeWithoutArray(props.style, data);
    }, 1000);
  };

  const isColumnMode = pageProps.style.direction === 'column';
  return (
    <>
      <Box justifyContent="space-between" alignItems="center" display="flex" mb={2}>
        <Typography mb={1} sx={{ fontWeight: 600 }}>
          Direction
        </Typography>
        <Button
          variant={!isColumnMode ? 'contained' : 'outlined'}
          startIcon={<TableRowsRoundedIcon />}
          onClick={() => {
            onChangeStyle({
              direction: 'row',
            });
          }}
        >
          Row
        </Button>
        <Button
          variant={isColumnMode ? 'contained' : 'outlined'}
          startIcon={<ViewWeekRoundedIcon />}
          onClick={() => {
            onChangeStyle({
              direction: 'column',
            });
          }}
        >
          Column
        </Button>
      </Box>
      <FontSettingComp
        font={pageProps.style.font}
        onChange={(value) => {
          onChangeStyle({
            font: value,
          });
        }}
      />

      <Divider sx={{ my: 2 }} />

      <Box width="100%" display="flex" justifyContent="space-between">
        <TextField
          size="small"
          placeholder="Nhà trai"
          sx={{ mb: 1, width: '48%' }}
          value={pageProps.groomParentTitle}
          onChange={(e) => {
            setProp((props: IParentInfoSetting) => {
              props.groomParentTitle = e.target.value;
            }, 1000);
          }}
        />

        <TextField
          size="small"
          placeholder="Nhà gái"
          sx={{ mb: 1, width: '48%' }}
          value={pageProps.brideParentTitle}
          onChange={(e) => {
            setProp((props: IParentInfoSetting) => {
              props.brideParentTitle = e.target.value;
            }, 1000);
          }}
        />
      </Box>

      <FontSettingComp
        font={pageProps.style.titleFont}
        onChange={(value) => {
          onChangeStyle({
            titleFont: value,
          });
        }}
      />

      <Divider sx={{ my: 2 }} />

      <Box>
        <SpacingSetting
          title="Padding"
          max={120}
          spacing={pageProps.style.padding}
          onChange={(value) => {
            onChangeStyle({
              padding: value,
            });
          }}
        />
      </Box>
    </>
  );
};

export default ParentInfoSetting;
