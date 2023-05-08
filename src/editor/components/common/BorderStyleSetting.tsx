import React, { FC } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, Slider, Typography } from '@mui/material';
import { Border } from '@/editor/interface/setting';
import { time } from 'console';
import dayjs from 'dayjs';
import { ITimeSetting, TimeLayouts } from '../Time';
import ColorPicker from './ColorPicker';

interface BorderStyleSettingProps {
  border: Border;
  onChange: (border: Border) => void;
  title?: string;
}

const BORDER_TEMPLATE: Omit<Border, 'borderColor'>[] = [
  {
    borderWidth: 1,
    borderStyle: 'solid',
  },
  {
    borderWidth: 2,
    borderStyle: 'solid',
  },
  {
    borderWidth: 1,
    borderStyle: 'dotted',
  },
  {
    borderWidth: 2,
    borderStyle: 'dotted',
  },
  {
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  {
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  {
    borderWidth: 3,
    borderStyle: 'double',
  },
  {
    borderWidth: 4,
    borderStyle: 'double',
  },
];

const BorderStyleSetting: FC<BorderStyleSettingProps> = ({ border, onChange, title = 'Border Bottom' }) => {
  const currentBorderIndex = BORDER_TEMPLATE.findIndex(
    (bor) => bor.borderStyle === border.borderStyle && bor.borderWidth === border.borderWidth,
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ px: 2, py: 1, border: '1px solid #D5D8DF', borderRadius: '8px', overFlow: 'hidden' }}
    >
      <Typography sx={{ fontWeight: 600, mb: 1 }}>{title}</Typography>
      <Box display="flex" flex={1} width="100%" alignItems="center">
        <FormControl sx={{ display: 'flex', flex: 1, mr: 1 }}>
          <Select
            value={currentBorderIndex == -1 ? 'none' : currentBorderIndex}
            size="small"
            sx={{
              '& div:first-child': {
                display: 'flex',
                alignItems: 'center',
              },
            }}
            onChange={(e) => {
              if (e.target.value == -1) {
                onChange({
                  ...border,
                  borderWidth: 0,
                });
              } else {
                onChange({
                  ...border,
                  ...BORDER_TEMPLATE[e.target.value as number],
                });
              }
            }}
          >
            <MenuItem value={'none'}>None</MenuItem>
            {Object.keys(BORDER_TEMPLATE).map((_, index) => (
              <MenuItem value={index} key={index} sx={{ py: '16px' }}>
                <Box
                  sx={{
                    borderBottom: `${BORDER_TEMPLATE[index].borderWidth}px ${BORDER_TEMPLATE[index].borderStyle}`,
                    width: '100%',
                  }}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <ColorPicker
          color={border.borderColor}
          onChange={(color) => {
            onChange({
              ...border,
              borderColor: color,
            });
          }}
        />
      </Box>
    </Box>
  );
};

export default BorderStyleSetting;
