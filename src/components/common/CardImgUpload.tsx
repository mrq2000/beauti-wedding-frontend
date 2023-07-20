import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Button } from '@mui/material';
import CustomTooltip from './CustomTooltip';
import { Link } from 'react-router-dom';

interface ICardImage {
  url?: string;
  disabled?: boolean;
}

const CardImageUpload = ({ url, disabled }: ICardImage) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative',
        border: (theme) => `1px dashed ${theme.palette.primary.main}`,
        '&:hover div': { visibility: 'visible' },
      }}
    >
      <Box
        sx={{
          maxWidth: '100%',
          maxHeight: '100%',
          height: 'auto',
          width: 'auto',
          objectFit: 'cover',
        }}
        component="img"
        src={url}
      />

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="absolute"
        sx={{
          top: 0,
          width: '100%',
          height: '100%',
          background: '#e7e8ec70',
          visibility: `${url ? 'hidden' : 'visible'}`,
          cursor: 'pointer',
        }}
      >
        <Box display="flex" alignItems="center" flexDirection="column">
          {disabled ? (
            <>
              <CustomTooltip
                title={
                  <Typography align="center" fontSize={12}>
                    Design đang ở Plan Free. Vui lòng liên hệ với chúng tôi để sử dụng tính năng
                  </Typography>
                }
              >
                <Link
                  to="https://www.facebook.com/profile.php?id=100094575447210"
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                >
                  <Button size="small" variant="contained" sx={{ borderRadius: '50px', px: 2, fontSize: 14 }}>
                    Liên hệ với chúng tôi
                  </Button>
                </Link>
              </CustomTooltip>
            </>
          ) : (
            <>
              <Box display="flex" justifyContent="center">
                <AddAPhotoIcon sx={{ color: '#6F7581' }} />
              </Box>
              <Typography color="#6F7581" align="center">
                Upload Photo
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default CardImageUpload;
