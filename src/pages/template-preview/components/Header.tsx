import { Box, Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { FC } from 'react';

import StayCurrentPortraitRoundedIcon from '@mui/icons-material/StayCurrentPortraitRounded';
import LaptopRoundedIcon from '@mui/icons-material/LaptopRounded';
import ModeRoundedIcon from '@mui/icons-material/ModeRounded';
import { useNavigate, useParams } from 'react-router-dom';

interface HeaderProps {
  inviteeName: string;
  setInviteeName: (inviteeName: string) => void;
  viewMode: string;
  setViewMode: (viewMode: 'desktop' | 'mobile') => void;
}
export const HEADER_HEIGHT = 56;

const Header: FC<HeaderProps> = ({ viewMode, setViewMode }) => {
  const navigate = useNavigate();
  const handleChangeViewMode = (event: React.MouseEvent<HTMLElement>, newAlignment: 'desktop' | 'mobile' | null) => {
    setViewMode(newAlignment || 'desktop');
  };
  const { templateId } = useParams();

  return (
    <Box
      sx={{
        height: HEADER_HEIGHT,
        zIndex: 1000,
        paddingX: '24px',
        paddingY: '8px',
        background: 'white',
        width: '100%',
        borderBottom: '1px solid #E7E8EC',
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
      }}
    >
      <ToggleButtonGroup
        value={viewMode}
        exclusive
        onChange={handleChangeViewMode}
        size="small"
        sx={{ svg: { fontSize: '1rem' } }}
      >
        <ToggleButton value="desktop">
          <LaptopRoundedIcon />
        </ToggleButton>
        <ToggleButton value="mobile">
          <StayCurrentPortraitRoundedIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      <Button
        variant="contained"
        sx={{ ml: 2, fontSize: 12 }}
        endIcon={<ModeRoundedIcon fontSize="small" />}
        onClick={() => navigate(`/get-started?templateId=${templateId}`)}
      >
        Sử dụng template này
      </Button>
    </Box>
  );
};

export default Header;
