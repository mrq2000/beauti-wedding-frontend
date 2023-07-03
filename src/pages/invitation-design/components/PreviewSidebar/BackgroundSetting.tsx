import React, { FC, useContext } from 'react';
import { Box, useTheme } from '@mui/material';
import { InfoActionContext, InfoContext } from '@/editor/InfoContext';
import useGetBackgrounds from '@/data/design/useGetBackgrounds';
import CustomLoading from '@/components/common/CustomLoading';
import RetryButton from '@/components/common/RetryButton';
import useUpdateDesignBackgroundImg from '@/data/design/useUpdateDesignBackgroundImg';
import { useParams } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { handleErrorMessage } from '@/helpers/error';
import useGetDesignDraft from '@/data/design/useGetDesignDraft';

const BackgroundSetting: FC = () => {
  const { backgroundImg } = useContext(InfoContext);
  const { setBackgroundImg } = useContext(InfoActionContext);
  const { designId } = useParams();
  const { data: dataDraft } = useGetDesignDraft(+(designId || 0));
  const { data, isLoading, isError, refetch } = useGetBackgrounds();
  const theme = useTheme();
  const { mutate: updateDesignBackground, isLoading: loadingUpdateBackground } = useUpdateDesignBackgroundImg(
    +(designId || ''),
  );

  const handleUpdateBackground = () => {
    updateDesignBackground(
      {
        backgroundImg: backgroundImg || '',
      },
      {
        onError: (e) => {
          handleErrorMessage(e);
        },
      },
    );
  };

  return (
    <Box
      display="flex"
      flex={1}
      flexDirection="column"
      gap="8px"
      sx={{ overflowY: 'auto', margin: '-8px', padding: '8px' }}
      id="template-list"
    >
      {isLoading && <CustomLoading />}
      {isError && <RetryButton onClick={() => refetch()} />}
      {data && (
        <>
          {data.map((img) => (
            <Box
              width="100%"
              height="140px"
              key={img.backgroundImg}
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                setBackgroundImg(img.backgroundImg);
              }}
            >
              <Box
                component="img"
                src={img.backgroundImg}
                sx={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  border: `1px solid ${backgroundImg == img.backgroundImg ? theme.palette.primary.light : '#E7E8EC'}`,
                  '&:hover': {
                    border: `1px solid ${theme.palette.primary.light}`,
                  },
                }}
              />
            </Box>
          ))}
        </>
      )}

      <Box display="flex" flex={1} />
      <Box display="flex" flexShrink={0}>
        <LoadingButton
          disabled={!dataDraft || dataDraft.backgroundImg == backgroundImg}
          variant="contained"
          fullWidth
          loading={loadingUpdateBackground}
          onClick={handleUpdateBackground}
        >
          Update
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default BackgroundSetting;
