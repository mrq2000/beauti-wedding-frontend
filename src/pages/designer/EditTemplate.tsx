import React, { FC, PropsWithChildren, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';
import useGetTemplate from '@/data/designer/useGetTemplate';
import { InfoActionContext, InfoContext } from '@/editor/InfoContext';
import CustomLoading from '@/components/common/CustomLoading';
import { resolvers } from '@/editor';
import { Editor } from '@craftjs/core';
import RenderNode from '../invitation-design/setting/RenderNode';
import Header, { HEADER_HEIGHT } from './components/edit-template/Header';
import SomeThingError from '@/components/error-page/SomeThingError';
import useDesigner from '@/data/designer/useDesigner';
import { getDemoInfo } from '@/utils/editor';
import SidebarElementSetting from '../invitation-design/components/EditSidebar/SidebarElementSetting';
import EditDesign from '../invitation-design/components/EditDesign';
import ElementWrap from '../invitation-design/ElementWarp';

interface IInvitationContext {
  defaultAnimation: string;
  defaultBackgroundImg: string;
}

export type VIEW_MODE = 'PREVIEW' | 'EDIT';
export type VIEW_DEVICE = 'desktop' | 'mobile';

const InvitationContext: FC<PropsWithChildren<IInvitationContext>> = ({
  children,
  defaultAnimation,
  defaultBackgroundImg,
}) => {
  const [animation, setAnimation] = useState(defaultAnimation || '');
  const [backgroundImg, setBackgroundImg] = useState(defaultBackgroundImg || '');

  return (
    <InfoContext.Provider
      value={{
        info: getDemoInfo({ hasParentInfo: true }),
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

const EditTemplate: FC = () => {
  const { templateId } = useParams();
  const { isLoading, data: template, error } = useGetTemplate(+(templateId || 0));
  const [viewMode, setViewMode] = useState<VIEW_MODE>('EDIT');
  const [viewDevice, setViewDevice] = useState<VIEW_DEVICE>('desktop');
  const { data: designer } = useDesigner();

  if (isLoading) return <CustomLoading />;
  if (template)
    return (
      <InvitationContext
        defaultAnimation={template.animation || ''}
        defaultBackgroundImg={template.backgroundImg || ''}
      >
        <Editor resolver={resolvers} onRender={RenderNode}>
          <ElementWrap data={JSON.parse(template.data)}>
            <Box flex={1} flexDirection="column" height="100%">
              <Header
                viewDevice={viewDevice}
                setViewDevice={setViewDevice}
                viewMode={viewMode}
                setViewMode={setViewMode}
                apiData={template.data}
                username={designer?.username || ''}
              />
              <Box
                flex={1}
                height="100%"
                sx={{ paddingTop: `${HEADER_HEIGHT}px`, display: viewMode == 'EDIT' ? 'flex' : 'none' }}
                flexDirection="row"
              >
                {/* <EditSidebar /> */}
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
                  {/* <PreviewDesign isMobileMode={viewDevice == 'mobile'} /> */}
                </Box>
              )}
            </Box>
          </ElementWrap>
        </Editor>
      </InvitationContext>
    );

  return <SomeThingError error={error} />;
};

export default EditTemplate;
