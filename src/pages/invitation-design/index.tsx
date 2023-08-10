import React, { FC, PropsWithChildren, useState } from 'react';
import { Editor } from '@craftjs/core';
import { Box } from '@mui/material';

import { InfoActionContext, InfoContext } from '@/editor/InfoContext';

import RenderNode from './setting/RenderNode';
import Header, { HEADER_HEIGHT } from './components/Header';
import SidebarElementSetting from './components/EditSidebar/SidebarElementSetting';
import EditSidebar from './components/EditSidebar/EditSidebar';
import { useParams } from 'react-router-dom';
import EditDesign from './components/EditDesign';
import CustomLoading from '@/components/common/CustomLoading';
import SomeThingError from '@/components/error-page/SomeThingError';
import ElementWrap from './ElementWarp';
import PreviewDesign from './components/PreviewDesign';

import useGetDesignDraft from '@/data/design/useGetDesignDraft';
import useGetDesignInfo from '@/data/design/useGetDesignInfo';
import { DesignDraft, DesignInfo } from '@/interface/design';
import useDesigner from '@/data/designer/useDesigner';
import { resolvers } from '@/editor';

export type VIEW_MODE = 'PREVIEW' | 'EDIT';
export type VIEW_DEVICE = 'desktop' | 'mobile';

interface Design extends DesignInfo {
  designPublic: boolean;
}
interface IInvitationContext {
  designInfo: Design;
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
        isPublic: designInfo.designPublic,
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
  const { data: me } = useDesigner();
  const { data, isLoading, error: designDraftError } = useGetDesignDraft(+(designId || 0));
  const { data: designInfo, isLoading: loadingDesignInfo, error: designInfoError } = useGetDesignInfo(+(designId || 0));

  if (isLoading || loadingDesignInfo) return <CustomLoading />;
  if (data && designInfo)
    return (
      <InvitationContext designDraft={data} designInfo={designInfo}>
        <Editor resolver={resolvers} onRender={RenderNode}>
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
              <Box
                flex={1}
                height="100%"
                sx={{ paddingTop: `${HEADER_HEIGHT}px`, display: viewMode == 'EDIT' ? 'flex' : 'none' }}
                flexDirection="row"
              >
                <EditSidebar />
                <EditDesign />
                <SidebarElementSetting />
              </Box>
              {viewMode == 'PREVIEW' && (
                <Box
                  display="flex"
                  flex={1}
                  height="100%"
                  sx={{ paddingTop: `${HEADER_HEIGHT}px` }}
                  flexDirection="row"
                >
                  <PreviewDesign isMobileMode={viewDevice == 'mobile'} />
                </Box>
              )}
            </Box>
          </ElementWrap>
        </Editor>
      </InvitationContext>
    );

  return <SomeThingError error={designDraftError || designInfoError} />;
};

export default InvitationDesignPage;
