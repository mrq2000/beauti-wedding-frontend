import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { InfoContext } from '@/editor/InfoContext';
import CustomLoading from '@/components/common/CustomLoading';
import useGetLiveDesign from '@/data/live/useGetLiveDesign';
import RenderDesign from '@/editor/live/RenderDesign';
import { Box } from '@mui/material';
import Page404 from '@/components/error-page/Page404';
import { getErrorMessage } from '@/helpers/error';
import HomeLabel from './HomeLabel';

const LivePage: FC = () => {
  const { designDomain, receiverId } = useParams();
  const { data, isLoading, error } = useGetLiveDesign(designDomain || '', receiverId || '');
  if (isLoading) return <CustomLoading />;

  if (data)
    return (
      <InfoContext.Provider
        value={{
          backgroundImg: data.design.designPublic.backgroundImg || '',
          animation: data.design.designPublic.animation || '',
          inviteeName: data.name,
          info: {
            ...data.design,
          },
        }}
      >
        <Box display="flex" height="100%" position="relative">
          <RenderDesign pages={JSON.parse(data.design.designPublic.data)} />
          <Box position="absolute" top="20px" right="20px">
            <HomeLabel />
          </Box>
        </Box>
      </InfoContext.Provider>
    );
  return <Page404 message={getErrorMessage(error)} />;
};

export default LivePage;
