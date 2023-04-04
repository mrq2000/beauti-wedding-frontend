import React, { ElementType, FC, ReactElement } from 'react';
import { EditorContext } from './EditorContext';
import { Info, Resolver } from '../interface';
import { useEditorStore } from './store';

interface EditorProps {
  info: Info;
  enabled: boolean;
  resolver: Resolver;
  onRender?: ElementType<{ render: ReactElement }>;
}

const Editor: FC<React.PropsWithChildren<EditorProps>> = ({ info, children, enabled, resolver }) => {
  const context = useEditorStore({
    info,
    selected: {
      id: '',
      option: '',
    },
    nodes: {},
    enabled,
    resolver,
  });

  return <EditorContext.Provider value={context}>{children}</EditorContext.Provider>;
};

export default Editor;
