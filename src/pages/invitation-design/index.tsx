import React, { FC, useState } from 'react';
import { Editor } from '@craftjs/core';
import { Box } from '@mui/material';

import RenderNode from './setting/RenderNode';
import { Page, Text, GroomAndBride, Time, Location } from '@/editor/components';
import Header, { HEADER_HEIGHT } from './components/Header';
import SidebarElementSetting from './components/EditSidebar/SidebarElementSetting';
import MenuSidebar from './components/EditSidebar/MenuSidebar';
import { InfoActionContext, InfoContext } from '@/editor/InfoContext';
import { InviteeName } from '@/editor/components/InviteeName';
import { useParams } from 'react-router-dom';
import EditDesign from './components/EditDesign';
import useGetDesignDraft from '@/data/design/useGetDesignDraft';
import CustomLoading from '@/components/common/CustomLoading';
import SomeThingError from '@/components/error-page/SomeThingError';
import ElementWrap from './ElementWarp';
import PreviewDesign from './components/PreviewDesign';
import useGetDesignInfo from '@/data/design/useGetDesignInfo';
import useMe from '@/data/useMe';

export type VIEW_MODE = 'PREVIEW' | 'EDIT';

const InvitationDesignPage: FC = () => {
  const { designId } = useParams();
  const [viewMode, setViewMode] = useState<VIEW_MODE>('EDIT');
  const [animation, setAnimation] = useState('');
  const { data: me } = useMe();
  const { data, isLoading, error: designDraftError } = useGetDesignDraft(+(designId || 0));
  const { data: designInfo, isLoading: loadingDesignInfo, error: designInfoError } = useGetDesignInfo(+(designId || 0));

  if (isLoading || loadingDesignInfo) return <CustomLoading />;
  if (data && designInfo)
    return (
      <InfoContext.Provider
        value={{
          info: designInfo,
          inviteeName: 'Tên Người Nhận',
          animation,
        }}
      >
        <InfoActionContext.Provider
          value={{
            setAnimation,
          }}
        >
          <Editor resolver={{ Text, Page, GroomAndBride, Time, InviteeName, Location }} onRender={RenderNode}>
            <ElementWrap data={JSON.parse(data.data)}>
              <Box flex={1} flexDirection="column" height="100%">
                <Header
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                  apiData={data.data}
                  username={me?.username || ''}
                />
                <Box
                  display="flex"
                  flex={1}
                  height="100%"
                  sx={{ paddingTop: `${HEADER_HEIGHT}px` }}
                  flexDirection="row"
                >
                  {viewMode == 'EDIT' ? (
                    <>
                      <MenuSidebar />
                      <EditDesign />
                      <SidebarElementSetting />
                    </>
                  ) : (
                    <PreviewDesign />
                  )}
                </Box>
              </Box>
            </ElementWrap>
          </Editor>
        </InfoActionContext.Provider>
      </InfoContext.Provider>
    );

  return <SomeThingError error={designDraftError || designInfoError} />;
};

export default InvitationDesignPage;
