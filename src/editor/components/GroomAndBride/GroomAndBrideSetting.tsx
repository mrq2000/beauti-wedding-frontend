import { FontSetting, Spacing } from '@/editor/interface/setting';
import { useNode } from '@craftjs/core';
import { Box, Slider, Typography, TextField, Button } from '@mui/material';
import TableRowsRoundedIcon from '@mui/icons-material/TableRowsRounded';
import ViewWeekRoundedIcon from '@mui/icons-material/ViewWeekRounded';

import { DeepPartial } from '@/interface';
import { mergeWithoutArray } from '@/utils/merge';
import SpacingSetting from '../common/SpacingSetting';
import FontSettingComp from '../common/FontSetting';

export interface GroomAndBrideStyle {
  padding: Spacing;
  font: FontSetting;
  direction: 'column' | 'row';
  spaceBetween: number;
  middleWordSize: number;
}
export interface IGroomAndBrideSetting {
  style: GroomAndBrideStyle;
  textBetween?: string;
}
const GroomAndBrideSetting = () => {
  const {
    actions: { setProp },
    pageProps,
  } = useNode((node) => ({
    pageProps: node.data.props as IGroomAndBrideSetting,
  }));

  const onChangeStyle = (data: DeepPartial<GroomAndBrideStyle>) => {
    setProp((props: IGroomAndBrideSetting) => {
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
      <Box mt={2}>
        <Typography sx={{ fontWeight: 600 }}>Space Between</Typography>
        <Slider
          value={pageProps.style.spaceBetween}
          valueLabelDisplay="auto"
          size="small"
          step={0.25}
          min={0}
          max={3}
          onChange={(_, value) => {
            onChangeStyle({ spaceBetween: value as number });
          }}
          sx={{ width: '100%' }}
        />
      </Box>

      <Box mt={2} sx={{ px: 2, py: 1, border: '1px solid #D5D8DF', borderRadius: '8px' }}>
        <Typography mb={1} sx={{ fontWeight: 600 }}>
          Middle Word
        </Typography>
        <TextField
          fullWidth
          size="small"
          sx={{ mb: 1 }}
          value={pageProps.textBetween}
          onChange={(e) => {
            setProp((props: IGroomAndBrideSetting) => {
              props.textBetween = e.target.value;
            }, 1000);
          }}
        />
        <Typography sx={{ fontWeight: 600 }}>Font Size</Typography>
        <Slider
          value={pageProps.style.middleWordSize}
          valueLabelDisplay="auto"
          size="small"
          step={1}
          min={8}
          max={48}
          onChange={(_, value) => {
            onChangeStyle({ middleWordSize: value as number });
          }}
          sx={{ width: '100%' }}
        />
      </Box>

      <Box mt={2}>
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

export default GroomAndBrideSetting;
