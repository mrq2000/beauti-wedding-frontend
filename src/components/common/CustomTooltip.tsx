import { styled } from '@mui/material';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import React from 'react';

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));
export default CustomTooltip;
