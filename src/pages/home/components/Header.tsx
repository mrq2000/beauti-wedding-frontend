import useMe from '@/data/useMe';
import { Box, Button, Typography } from '@mui/material';
import LetterAvatar from './LetterAvatar';
import CoffeeRoundedIcon from '@mui/icons-material/CoffeeRounded';

export const HEADER_HEIGHT = 56;

const Header = () => {
  const { data } = useMe();

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
      <Box display="flex" alignItems="center">
        <LetterAvatar name={data?.username || ''} />
        <Typography variant="caption" sx={{ ml: 1, fontSize: 14 }}>
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
      >
        Buy us a Coffee
      </Button>
    </Box>
  );
};

export default Header;
