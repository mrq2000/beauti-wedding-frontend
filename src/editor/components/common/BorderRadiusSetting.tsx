import React, { FC } from 'react';
import { Box, Slider, Typography } from '@mui/material';

interface BorderRadiusSettingProps {
  borderRadius: number;
  min?: number;
  max?: number;
  onChange: (val: number) => void;
}

const BorderRadiusSetting: FC<BorderRadiusSettingProps> = ({ borderRadius, min = 0, max = 24, onChange }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ px: 2, py: 1, border: '1px solid #E7E8EC', borderRadius: '8px', overFlow: 'hidden' }}
    >
      <Typography sx={{ fontWeight: 600, mb: 1 }}>Border Radius</Typography>
      <Box display="flex" flex={1}>
        <Slider
          value={borderRadius}
          valueLabelDisplay="auto"
          step={1}
          min={min}
          max={max}
          sx={{ width: '100%' }}
          onChange={(e, val) => {
            onChange(val as number);
          }}
        />
      </Box>
    </Box>
  );
};

export default BorderRadiusSetting;
