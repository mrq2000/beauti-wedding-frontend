import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LetterAvatar from '@/components/common/LetterAvatar';
import useDesigner from '@/data/designer/useDesigner';

export const HEADER_HEIGHT = 56;

const Header = () => {
  const { data } = useDesigner();
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
      <Box display="flex" alignItems="center" onClick={() => navigate('/designer')} sx={{ cursor: 'pointer' }}>
        <LetterAvatar name={data?.username || ''} />
        <Typography variant="caption" sx={{ ml: 1, fontSize: 14, display: { xs: 'none', sm: 'block' } }}>
          {data?.username}
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
