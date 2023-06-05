import { Box } from '@mui/material';
import React, { FC, useContext, useMemo, useState } from 'react';
import { InfoContext } from '../InfoContext';
import { ANIMATIONS } from './animations';
import RenderPage from './animations/RenderPage';

export const DEFAULT_ANIMATION = 'fade';

interface RenderDesignProps {
  pages: string[];
}

const RenderDesign: FC<RenderDesignProps> = ({ pages }) => {
  const [activePage, setActivePage] = useState(0);
  const { animation } = useContext(InfoContext);

  const Animation = useMemo(() => {
    setActivePage(0);
    return ANIMATIONS[animation || DEFAULT_ANIMATION];
  }, [animation]);

  return (
    <Box display="flex" flex={1} flexDirection="column" width="100%" alignItems="center" justifyContent="center">
      <Animation.element pages={pages} activePage={activePage} setActivePage={setActivePage} />
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
