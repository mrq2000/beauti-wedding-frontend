import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

interface ICardImage {
  url?: string;
}

const CardImageUpload = ({ url }: ICardImage) => {
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
          background: '#E7E8EC',
          opacity: '0.7',
          visibility: `${url ? 'hidden' : 'visible'}`,
          cursor: 'pointer',
        }}
      >
        <Box>
          <Box display="flex" justifyContent="center">
            <AddAPhotoIcon sx={{ color: '#6F7581' }} />
          </Box>
          <Typography color="#6F7581" align="center">
            Upload Photo
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default CardImageUpload;
