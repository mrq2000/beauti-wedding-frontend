import { Box } from '@mui/material';
import React, { FC, useContext, useMemo, useRef, useState } from 'react';
import { InfoContext } from '../InfoContext';
import { ANIMATIONS } from './animations';

export const DEFAULT_ANIMATION = 'fade';

interface RenderDesignProps {
  pages: string[];
  isMobileMode?: boolean;
}

const RenderDesign: FC<RenderDesignProps> = ({ pages, isMobileMode }) => {
  const [activePage, setActivePage] = useState(0);
  const { animation } = useContext(InfoContext);
  const containerRef = useRef<HTMLDivElement>();

  const Animation = useMemo(() => {
    setActivePage(0);
    return ANIMATIONS[animation || DEFAULT_ANIMATION];
  }, [animation]);

  return (
    <Box
      display="flex"
      flex={1}
      flexDirection="column"
      width="100%"
      alignItems="center"
      justifyContent="center"
      sx={{ background: '#fff' }}
      ref={containerRef}
    >
      <Box sx={{ transform: { xs: 'scale(0.7)', md: isMobileMode ? 'scale(0.7)' : 'scale(1)' } }}>
        <Animation.element pages={pages} activePage={activePage} setActivePage={setActivePage} />
      </Box>
      <Box sx={{ zIndex: 2, position: 'fixed', bottom: 50, display: 'flex' }}>
        {[...Array(pages.length).keys()].map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 10,
              height: 10,
              mx: 1,
              borderRadius: '100%',
              cursor: 'pointer',
              backgroundColor: (theme) => (activePage === index ? theme.palette.primary.main : theme.palette.grey[400]),
              ':hover': {
                backgroundColor: (theme) =>
                  activePage === index ? theme.palette.primary.main : theme.palette.grey[600],
              },
            }}
            onClick={() => setActivePage(index)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default RenderDesign;
