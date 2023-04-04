import { Box } from '@mui/material';
import { FC, useRef } from 'react';

const Demo: FC = () => {
  const ref = useRef<HTMLElement>();

  const handleClick = (rotate: number) => {
    if (ref.current) {
      ref.current.style.transform = `rotateY(${rotate}deg)`;
    }
  };

  return (
    <Box
      display="flex"
      flex={1}
      justifyContent="center"
      width="100%"
      sx={{ perspective: '5000px', transformStyle: 'preserve-3d' }}
      mt={10}
    >
      <Box position="absolute" width="300px" height="500px" sx={{ background: 'white' }}>
        333333333333333333
      </Box>
      <Box
        position="absolute"
        ref={ref}
        sx={{
          transformOrigin: 'top left',
          transitionDuration: '1s',
          transformStyle: 'preserve-3d',
        }}
        width="300px"
        height="500px"
      >
        <Box
          onClick={() => handleClick(-180)}
          position="absolute"
          width="100%"
          height="100%"
          sx={{ background: 'red', transform: 'rotateY(0deg)' }}
        >
          111111111111
        </Box>
        <Box
          onClick={() => handleClick(0)}
          position="absolute"
          width="100%"
          height="100%"
          sx={{ background: 'white', transform: 'rotateY(180deg) translateZ(0.1px)' }}
        >
          222222222222
        </Box>
      </Box>

      {/* <Box position="relative">
        <Box width="600px" mt={10} height="1000px" sx={{ background: 'red' }}>
          33333333333
        </Box>
        <Box position="absolute" width="600px" mt={10} height="1000px" sx={{ background: 'white', top: 0 }}>
          444444444444
        </Box>
      </Box> */}
    </Box>
  );
};

export default Demo;
