import React, { FC } from 'react';
import { Editor, Frame } from '@craftjs/core';
import { Page, GroomAndBride, Time, InviteeName, Location, Text } from '../../components';

interface RenderPageProps {
  data: string;
}

const RenderPage: FC<RenderPageProps> = ({ data }) => {
  return (
    <Editor resolver={{ Text, Page, GroomAndBride, Time, InviteeName, Location }} enabled={false}>
      <Frame data={data} />
    </Editor>
  );
};

export default RenderPage;
