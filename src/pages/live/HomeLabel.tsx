import { Typography } from '@mui/material';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const HomeLabel: FC = () => {
  return (
    <Typography variant="caption" sx={{ fontSize: 16 }}>
      Powered By&nbsp;
      <Link to="https://taothiepcuoi.com" target="_blank" style={{ color: '#6F7581' }}>
        taothiepcuoi.com
      </Link>
    </Typography>
  );
};

export default HomeLabel;
