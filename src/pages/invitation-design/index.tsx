import React, { FC, PropsWithChildren, useState } from 'react';
import { Editor } from '@craftjs/core';
import { Box } from '@mui/material';

import { InfoActionContext, InfoContext } from '@/editor/InfoContext';
import { InviteeName } from '@/editor/components/InviteeName';
import { Page, Text, GroomAndBride, Time, Location, ParentInfo } from '@/editor/components';

import RenderNode from './setting/RenderNode';
import Header, { HEADER_HEIGHT } from './components/Header';
import SidebarElementSetting from './components/EditSidebar/SidebarElementSetting';
import MenuSidebar from './components/EditSidebar/MenuSidebar';
import { useParams } from 'react-router-dom';
import EditDesign from './components/EditDesign';
import CustomLoading from '@/components/common/CustomLoading';
import SomeThingError from '@/components/error-page/SomeThingError';
import ElementWrap from './ElementWarp';
import PreviewDesign from './components/PreviewDesign';

import useGetDesignDraft from '@/data/design/useGetDesignDraft';
import useGetDesignInfo from '@/data/design/useGetDesignInfo';
import useMe from '@/data/useMe';
import { DesignDraft, DesignInfo } from '@/interface/design';

export type VIEW_MODE = 'PREVIEW' | 'EDIT';
export type VIEW_DEVICE = 'desktop' | 'mobile';
interface IInvitationContext {
  designInfo: DesignInfo;
  designDraft: DesignDraft;
}
const InvitationContext: FC<PropsWithChildren<IInvitationContext>> = ({ designInfo, children, designDraft }) => {
  const [animation, setAnimation] = useState(designDraft.animation || '');
  const [backgroundImg, setBackgroundImg] = useState(designDraft.backgroundImg || '');
  return (
    <InfoContext.Provider
      value={{
        info: designInfo,
        inviteeName: 'Tên Người Nhận',
        animation,
        backgroundImg,
      }}
    >
      <InfoActionContext.Provider
        value={{
          setAnimation,
          setBackgroundImg,
        }}
      >
        {children}
      </InfoActionContext.Provider>
    </InfoContext.Provider>
  );
};

const InvitationDesignPage: FC = () => {
  const { designId } = useParams();
  const [viewMode, setViewMode] = useState<VIEW_MODE>('EDIT');
  const [viewDevice, setViewDevice] = useState<VIEW_DEVICE>('desktop');
  const { data: me } = useMe();
  const { data, isLoading, error: designDraftError } = useGetDesignDraft(+(designId || 0));
  const { data: designInfo, isLoading: loadingDesignInfo, error: designInfoError } = useGetDesignInfo(+(designId || 0));

  if (isLoading || loadingDesignInfo) return <CustomLoading />;
  if (data && designInfo)
    return (
      <InvitationContext designDraft={data} designInfo={designInfo}>
        <Editor resolver={{ Text, Page, GroomAndBride, Time, InviteeName, Location, ParentInfo }} onRender={RenderNode}>
          <ElementWrap data={JSON.parse(data.data)}>
            <Box flex={1} flexDirection="column" height="100%">
              <Header
                viewDevice={viewDevice}
                setViewDevice={setViewDevice}
                viewMode={viewMode}
                setViewMode={setViewMode}
                apiData={data.data}
                username={me?.username || ''}
              />
              <Box display="flex" flex={1} height="100%" sx={{ paddingTop: `${HEADER_HEIGHT}px` }} flexDirection="row">
                {viewMode == 'EDIT' ? (
                  <>
                    <MenuSidebar />
                    <EditDesign />
                    <SidebarElementSetting />
                  </>
                ) : (
                  <PreviewDesign isMobileMode={viewDevice == 'mobile'} />
                )}
              </Box>
            </Box>
          </ElementWrap>
        </Editor>
      </InvitationContext>
    );

  return <SomeThingError error={designDraftError || designInfoError} />;
};

export default InvitationDesignPage;
