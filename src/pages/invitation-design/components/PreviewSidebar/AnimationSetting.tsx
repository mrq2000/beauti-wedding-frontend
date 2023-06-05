import React, { FC, useContext } from 'react';
import { Box, Grid } from '@mui/material';
import { ANIMATIONS } from '@/editor/live/animations';
import { InfoContext, InfoActionContext } from '@/editor/InfoContext';
import { DEFAULT_ANIMATION } from '@/editor/live/RenderDesign';

const AnimationSetting: FC = () => {
  const { animation } = useContext(InfoContext);
  const { setAnimation } = useContext(InfoActionContext);
  const currentAnimation = animation && ANIMATIONS[animation] ? animation : DEFAULT_ANIMATION;

  return (
    <Box
      display="flex"
      flex={1}
      flexDirection="column"
      gap="16px"
      sx={{ overflowY: 'auto', margin: '-16px', padding: '16px' }}
      id="template-list"
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(20, 1fr)',
        }}
      >
        {Object.keys(ANIMATIONS).map((animationKey) => (
          <Grid key={animationKey} gridColumn={{ xs: 'span 10' }} sx={{ p: 1 }}>
            <Box
              width="100%"
              flex={1}
              justifyContent="center"
              alignItems="center"
              display="flex"
              sx={{
                border: (theme) => `1px solid ${theme.palette.grey[500]}`,
                borderRadius: '8px',
                height: 140,
                cursor: 'pointer',
                paddingX: 2,
                textAlign: 'center',
                fontWeight: 'bold',
                ...(animationKey == currentAnimation
                  ? {
                      backgroundColor: (theme) => theme.palette.primary.main,
                      color: 'white',
                    }
                  : {
                      ':hover': {
                        color: 'white',
                        backgroundColor: (theme) => theme.palette.grey[500],
                      },
                    }),
              }}
              onClick={() => setAnimation(animationKey)}
            >
              {ANIMATIONS[animationKey].title}
            </Box>
          </Grid>
        ))}
      </Box>
    </Box>
  );
};

export default AnimationSetting;
