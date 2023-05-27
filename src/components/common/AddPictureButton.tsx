import { styled } from '@mui/material/styles';
import { useState, forwardRef, useEffect, useRef, PropsWithChildren } from 'react';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import Dialog from '@mui/material/Dialog';
import { AppBar, Box, Button, IconButton, Toolbar, Typography, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import 'react-image-crop/dist/ReactCrop.css';
import { useDebounceEffect } from '@/hooks/debounce';
import { canvasPreview } from '@/utils/canvas';

interface IAddPictureProps {
  handleSetFile: (file: string) => void;
  labelKey: string;
  aspect?: number;
}

const Input = styled('input')({
  display: 'none',
});

const centerAspectCrop = (mediaWidth: number, mediaHeight: number, aspect: number) => {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 50,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddPictureButton = ({
  handleSetFile,
  children,
  labelKey,
  aspect = 12 / 17,
}: PropsWithChildren<IAddPictureProps>) => {
  const theme = useTheme();
  const [src, setSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setSrc(reader.result as string));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  };

  const handleClose = () => {
    setSrc(null);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  useDebounceEffect(
    async () => {
      if (completedCrop?.width && completedCrop?.height && imgRef.current && previewCanvasRef.current) {
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
      }
    },
    100,
    [completedCrop, previewCanvasRef, imgRef],
  );

  useEffect(() => {
    if (src == null && inputRef.current) {
      inputRef.current.value = '';
    }
  }, [src, inputRef]);

  return (
    <>
      <label htmlFor={labelKey}>
        <Input accept="image/*" ref={inputRef} id={labelKey} type="file" onChange={onSelectFile} />
        {children}
      </label>

      <Dialog
        PaperProps={{ sx: { margin: 0 } }}
        onClose={handleClose}
        open={!!src}
        fullScreen
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar sx={{ height: '64px' }}>
            <IconButton edge="start" color="inherit" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Crop Image
            </Typography>
            <Button color="inherit" variant="contained" onClick={handleClose}>
              Crop
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flex: 1,
            justifyContent: 'space-around',
            height: 'calc(100% - 64px)',
            py: 5,
          }}
        >
          <Box width="45%" sx={{ overflow: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ReactCrop
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              aspect={aspect}
              crop={crop}
              onComplete={(c) => setCompletedCrop(c)}
              style={{ width: '80%', height: 'fit-content' }}
            >
              <img
                alt="Crop me"
                src={src || 'null'}
                style={{ width: '100%', objectFit: 'contain' }}
                onLoad={onImageLoad}
                ref={imgRef}
              />
            </ReactCrop>
          </Box>

          <Box width="45%" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
            <Typography variant="h3" mb={2}>
              After Crop
            </Typography>

            <canvas
              ref={previewCanvasRef}
              style={{
                width: 480,
                height: 480 / aspect,
                outline: `1px dashed ${theme.palette.primary.main}`,
              }}
            />
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default AddPictureButton;
