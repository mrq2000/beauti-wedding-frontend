import React, { FC, useContext } from 'react';
import { Box, Grid } from '@mui/material';
import { ANIMATIONS } from '@/editor/live/animations';
import { InfoActionContext, InfoContext } from '@/editor/InfoContext';
import { DEFAULT_ANIMATION } from '@/editor/live/RenderDesign';
import useUpdateDesignAnimation from '@/data/design/useUpdateDesignAnimation';
import { useParams } from 'react-router-dom';
import { handleErrorMessage } from '@/helpers/error';
import { LoadingButton } from '@mui/lab';
import useGetDesignDraft from '@/data/design/useGetDesignDraft';

const AnimationSetting: FC = () => {
  const { animation } = useContext(InfoContext);
  const { designId } = useParams();
  const { setAnimation } = useContext(InfoActionContext);
  const { data: dataDraft } = useGetDesignDraft(+(designId || 0));

  const currentAnimation = animation && ANIMATIONS[animation] ? animation : DEFAULT_ANIMATION;
  const { mutate: updateDesignAnimation, isLoading: loadingUpdateAnimation } = useUpdateDesignAnimation(
    +(designId || ''),
  );

  const handleUpdateAnimation = () => {
    updateDesignAnimation(
      {
        animation: animation || '',
      },
      {
        onError: (e) => {
          handleErrorMessage(e);
        },
      },
    );
  };

  return (
    <>
      <Box
        display="flex"
        flex={1}
        flexDirection="column"
        gap="16px"
        sx={{ overflowY: 'auto', margin: '-16px', padding: '16px' }}
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
      <Box display="flex" flexShrink={0}>
        <LoadingButton
          disabled={!dataDraft || dataDraft.animation === animation}
          variant="contained"
          fullWidth
          loading={loadingUpdateAnimation}
          onClick={handleUpdateAnimation}
          sx={{ mt: 2 }}
        >
          Update
        </LoadingButton>
      </Box>
    </>
  );
};

export default AnimationSetting;
