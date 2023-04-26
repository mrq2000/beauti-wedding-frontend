import { Box, Button, Popover, TextField, Typography } from '@mui/material';
import React, { FC, Fragment } from 'react';
import { HexColorPicker } from 'react-colorful';

interface ColorPickerProps {
  color: string;
  onChange: (value: string) => void;
}

const ColorPicker: FC<ColorPickerProps> = ({ color, onChange }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Fragment>
      <Box
        sx={{
          border: '1px solid #6F7581',
          height: '20px',
          width: '20px',
          borderRadius: '100%',
          backgroundColor: color,
          cursor: 'pointer',
        }}
        onClick={handleClick}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <HexColorPicker color={color} onChange={(val) => onChange(val)} />
        <Box width={200} py={1} px={1.5}>
          <TextField value={color} variant="standard" onChange={(e) => onChange(e.target.value)} />
        </Box>
      </Popover>
    </Fragment>
  );
};

export default ColorPicker;
