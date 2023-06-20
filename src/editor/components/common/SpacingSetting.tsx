import React, { FC } from 'react';
import { Box, Slider, Typography } from '@mui/material';
import { Spacing } from '@/editor/interface/setting';

interface SpacingSettingProps {
  title: string;
  spacing: Spacing;
  min?: number;
  max?: number;
  onChange: (val: Record<string, number>) => void;
}

const SpacingSetting: FC<SpacingSettingProps> = ({ title, spacing, min = 0, max = 150, onChange }) => {
  return (
    <Box display="flex" flexDirection="column" sx={{ px: 2, py: 1, border: '1px solid #E7E8EC', borderRadius: '8px' }}>
      <Typography sx={{ fontWeight: 600, mb: 1 }}>{title}</Typography>
      {['top', 'left', 'right', 'bottom'].map((key: any) => (
        <Box display="flex" flex={1} key={key}>
          <Box mr={1} width={70} sx={{ textTransform: 'capitalize' }}>
            {key}
          </Box>
          <Slider
            value={spacing[key] as number}
            valueLabelDisplay="auto"
            step={1}
            min={min}
            max={max}
            sx={{ width: '100%' }}
            onChange={(e, val) => {
              onChange({
                [key]: val as number,
              });
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default SpacingSetting;
