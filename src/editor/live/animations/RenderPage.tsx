import React, { FC } from 'react';
import { Editor, Frame } from '@craftjs/core';
import { resolvers } from '@/editor';

interface RenderPageProps {
  data: string;
}

const RenderPage: FC<RenderPageProps> = ({ data }) => {
  return (
    <Editor resolver={resolvers} enabled={false}>
      <Frame data={data} />
    </Editor>
  );
};

export default RenderPage;
