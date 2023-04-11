import { ElementType, FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import { Info } from './info';
import { NodeId, Nodes } from './node';

export type Resolver = Record<string, BuilderComponent>;

export interface EditorState {
  info: Info;
  selected?: {
    id: string;
    option?: string;
  };
  nodes: Nodes;
  enabled: boolean;
  resolver: Resolver;
}

export type OptionSetting = {
  label: ReactNode;
  element: ElementType;
  key: string;
  title?: string;
};

export interface BuilderComponentSetting {
  displayName: string;
  options?: OptionSetting[];
}

export interface NodeProps {
  id: NodeId;
}
export interface BuilderComponent extends FunctionComponent<PropsWithChildren<NodeProps>> {
  settings: BuilderComponentSetting;
}
