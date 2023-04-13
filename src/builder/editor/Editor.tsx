import React, { FC } from 'react';
import { EditorContext } from './EditorContext';
import { Info, RenderNodeFC, Resolver } from '../interface';
import { useEditorStore } from './store';

interface EditorProps {
  info: Info;
  enabled: boolean;
  resolver: Resolver;
  onRender: RenderNodeFC;
}

const Editor: FC<React.PropsWithChildren<EditorProps>> = ({ info, children, enabled, resolver, onRender }) => {
  const context = useEditorStore({
    info,
    selected: {
      id: '',
      option: '',
    },
    nodes: {},
    enabled,
    resolver,
    onRender,
  });

  return <EditorContext.Provider value={context}>{children}</EditorContext.Provider>;
};

export default Editor;
