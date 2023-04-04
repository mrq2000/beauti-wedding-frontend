import { ElementType, FunctionComponent } from 'react';
import { Info } from './info';
import { Nodes } from './node';

export type Resolver = Record<string, ElementType>;

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

export interface BuilderComponent extends FunctionComponent {
  settings: {
    displayName: string;
    options?: string;
  };
}
