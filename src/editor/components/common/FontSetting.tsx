import { FontSetting as IFontSetting } from '@/editor/interface/setting';
import { DeepPartial } from '@/interface';
import {
  Box,
  Slider,
  Typography,
  MenuItem,
  FormControl,
  ToggleButtonGroup,
  ToggleButton,
  styled,
  Paper,
  Divider,
  Autocomplete,
  TextField,
} from '@mui/material';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import React, { FC } from 'react';
import { fontList } from '@/utils/font';
import ColorPicker from './ColorPicker';

interface FontSettingProps {
  font: IFontSetting;
  minSize?: number;
  maxSize?: number;
  onChange: (data: DeepPartial<IFontSetting>) => void;
}

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const FontSetting: FC<FontSettingProps> = ({ font, maxSize = 64, minSize = 8, onChange }) => {
  return (
    <Box display="flex" flexDirection="column">
      <Typography sx={{ fontWeight: 600 }}>Font size</Typography>
      <Slider
        value={font.fontSize || 7}
        valueLabelDisplay="auto"
        size="small"
        step={1}
        min={minSize}
        max={maxSize}
        onChange={(_, value) => {
          onChange({ fontSize: value as number });
        }}
        sx={{ width: '100%' }}
      />

      <Typography sx={{ mt: 2, fontWeight: 600 }}>Font style</Typography>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          border: (theme) => `1px solid ${theme.palette.divider}`,
          flexWrap: 'wrap',
        }}
      >
        <StyledToggleButtonGroup
          size="small"
          value={font.textAlign}
          exclusive
          onChange={(e, value) => {
            onChange({
              textAlign: value,
            });
          }}
        >
          <ToggleButton value="left">
            <FormatAlignLeftIcon />
          </ToggleButton>
          <ToggleButton value="center">
            <FormatAlignCenterIcon />
          </ToggleButton>
          <ToggleButton value="right">
            <FormatAlignRightIcon />
          </ToggleButton>
          <ToggleButton value="justify">
            <FormatAlignJustifyIcon />
          </ToggleButton>
        </StyledToggleButtonGroup>
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
        <StyledToggleButtonGroup
          size="small"
          value={font.fontWeight}
          exclusive
          onChange={(e, value) => {
            onChange({
              fontWeight: value ? value : '400',
            });
          }}
        >
          <ToggleButton value="bold">
            <FormatBoldIcon />
          </ToggleButton>
        </StyledToggleButtonGroup>

        <StyledToggleButtonGroup
          size="small"
          value={font.fontStyle}
          exclusive
          onChange={(e, value) => {
            onChange({
              fontStyle: value ? value : 'unset',
            });
          }}
        >
          <ToggleButton value="italic">
            <FormatItalicIcon />
          </ToggleButton>
        </StyledToggleButtonGroup>

        <Box display="flex" justifyContent="center" alignItems="center" m={0.5} px={1}>
          <ColorPicker
            color={font.color}
            onChange={(value) => {
              onChange({
                color: value,
              });
            }}
          />
        </Box>
      </Paper>

      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <Typography sx={{ fontWeight: 600 }}>Font Family</Typography>

        <Autocomplete
          disablePortal
          disableClearable={true}
          options={fontList.map((font) => font.fontFamily)}
          value={font.fontFamily}
          sx={{ fontFamily: font.fontFamily, color: 'blue' }}
          onChange={(event: any, newValue: string | null) => {
            if (newValue) {
              onChange({
                fontFamily: newValue,
              });
            }
          }}
          renderOption={(props, option) => (
            <MenuItem value={option} sx={{ fontFamily: option }} {...props}>
              {option}
            </MenuItem>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              inputProps={{
                ...params.inputProps,
                style: {
                  fontFamily: font.fontFamily,
                },
              }}
            />
          )}
        />
      </FormControl>
    </Box>
  );
};

export default FontSetting;
