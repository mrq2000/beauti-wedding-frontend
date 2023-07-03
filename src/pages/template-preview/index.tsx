import React, { FC, useState } from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import CustomLoading from '@/components/common/CustomLoading';
import useGetTemplate from '@/data/template/useGetTemplate';
import SomeThingError from '@/components/error-page/SomeThingError';
import { InfoContext } from '@/editor/InfoContext';
import RenderDesign from '@/editor/live/RenderDesign';
import { getDemoInfo } from '@/utils/editor';

import Header, { HEADER_HEIGHT } from './components/Header';

const TemplatePreview: FC = () => {
  const { templateId } = useParams();
  const { data, isLoading, error } = useGetTemplate(+(templateId || ''));
  const [inviteeName, setInviteeName] = useState('Tên người nhận');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const isMobileMode = viewMode == 'mobile';

  if (isLoading) return <CustomLoading />;
  if (data)
    return (
      <Box flex={1} flexDirection="column" height="100%">
        <InfoContext.Provider
          value={{
            backgroundImg: data.backgroundImg || '',
            animation: data.animation || '',
            inviteeName,
            info: getDemoInfo({ hasParentInfo: true }),
          }}
        >
          <Header
            inviteeName={inviteeName}
            setInviteeName={setInviteeName}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
          <Box display="flex" flex={1} height={`calc(100% - ${HEADER_HEIGHT}px)`} justifyContent="center">
            <Box
              width={isMobileMode ? 400 : '100%'}
              height="100%"
              display="flex"
              sx={isMobileMode ? { borderLeft: '1px solid #E7E8EC', borderRight: '1px solid #E7E8EC' } : {}}
            >
              <RenderDesign pages={JSON.parse(data.data)} isMobileMode={isMobileMode} />
            </Box>
          </Box>
        </InfoContext.Provider>
      </Box>
    );
  return <SomeThingError error={error} />;
};

export default TemplatePreview;
