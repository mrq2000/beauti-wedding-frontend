import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CoffeeRoundedIcon from '@mui/icons-material/CoffeeRounded';
import useMe from '@/data/useMe';
import LetterAvatar from './LetterAvatar';

export const HEADER_HEIGHT = 56;

const Header = () => {
  const { data } = useMe();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: HEADER_HEIGHT,
        zIndex: 1000,
        paddingX: '24px',
        paddingY: '8px',
        background: 'white',
        position: 'fixed',
        width: '100%',
        borderBottom: '1px solid #E7E8EC',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box display="flex" alignItems="center" onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
        <LetterAvatar name={data?.username || ''} />
        <Typography variant="caption" sx={{ ml: 1, fontSize: 14, display: { xs: 'none', sm: 'block' } }}>
          {data?.username}
        </Typography>
      </Box>

      <Button
        variant="contained"
        startIcon={<CoffeeRoundedIcon />}
        sx={{
          borderRadius: '100px',
          backgroundColor: '#553939',
          '&:hover': {
            backgroundColor: '#704F4F',
          },
        }}
        onClick={() => navigate('/buy-coffee')}
      >
        Buy us a Coffee
      </Button>
    </Box>
  );
};

export default Header;
