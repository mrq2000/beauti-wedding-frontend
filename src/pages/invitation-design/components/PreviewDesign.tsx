import RenderDesign from '@/editor/live/RenderDesign';
import React, { FC, useContext } from 'react';
import { ElementContext } from '../ElementWarp';
import PreviewSidebar from './PreviewSidebar/PreviewSidebar';

const PreviewDesign: FC = () => {
  const { elements } = useContext(ElementContext);

  return (
    <>
      <PreviewSidebar />
      <RenderDesign pages={elements} />
    </>
  );
};

export default PreviewDesign;
