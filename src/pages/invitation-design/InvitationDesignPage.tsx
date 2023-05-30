import React, { FC, useState } from 'react';
import { Editor } from '@craftjs/core';
import { Box } from '@mui/material';

import RenderNode from './setting/RenderNode';
import { Page, Text, GroomAndBride, Time, Location } from '@/editor/components';
import Header, { HEADER_HEIGHT } from './components/Header';
import SidebarElementSetting from './components/SidebarElementSetting';
import MenuSidebar from './components/MenuSidebar';
import { DEMO_INFO, InfoContext } from '@/editor/InfoContext';
import { InviteeName } from '@/editor/components/InviteeName';
import { useParams } from 'react-router-dom';
import EditDesign from './components/EditDesign';
import useGetDesignDraft from '@/data/design/useGetDesignDraft';
import CustomLoading from '@/components/common/CustomLoading';
import SomeThingError from '@/components/error-page/SomeThingError';
import ElementWrap from './ElementWarp';

export type VIEW_MODE = 'PREVIEW' | 'EDIT';

const InvitationDesignPage: FC = () => {
  const { id } = useParams();
  const [viewMode, setViewMode] = useState<VIEW_MODE>('EDIT');
  const [info, setInfo] = useState(DEMO_INFO);
  const { data, isLoading } = useGetDesignDraft({ id: +(id || 0) });

  if (isLoading) return <CustomLoading />;
  if (data)
    return (
      <InfoContext.Provider
        value={{
          info,
          setInfo,
          inviteeName: 'Tên Người Nhận',
        }}
      >
        <Editor resolver={{ Text, Page, GroomAndBride, Time, InviteeName, Location }} onRender={RenderNode}>
          <ElementWrap data={JSON.parse(data.data)}>
            <Box flex={1} flexDirection="column" height="100%">
              <Header viewMode={viewMode} />
              <Box display="flex" flex={1} height="100%" sx={{ paddingTop: `${HEADER_HEIGHT}px` }} flexDirection="row">
                <MenuSidebar />
                <EditDesign />
                <SidebarElementSetting />
              </Box>
            </Box>
          </ElementWrap>
        </Editor>
      </InfoContext.Provider>
    );

  return <SomeThingError />;
};

export default InvitationDesignPage;
