import React, { FC } from 'react';
import { Editor, Frame } from '@craftjs/core';
import { Page, GroomAndBride, Time, InviteeName, Location, Text, ParentInfo } from '../../components';

interface RenderPageProps {
  data: string;
}

const RenderPage: FC<RenderPageProps> = ({ data }) => {
  return (
    <Editor resolver={{ Text, Page, GroomAndBride, Time, InviteeName, Location, ParentInfo }} enabled={false}>
      <Frame data={data} />
    </Editor>
  );
};

export default RenderPage;
