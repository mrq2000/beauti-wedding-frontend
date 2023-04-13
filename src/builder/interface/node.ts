import { BuilderComponentSetting } from './editor';

export interface SerializedNode {
  type: string;
  props: Record<string, unknown>;
  nodes: NodeId[];
  parent: string;
}
export type NodeData = SerializedNode & BuilderComponentSetting;

export type Node = {
  id: NodeId;
  data: NodeData;
  dom?: HTMLElement;
};
export type Nodes = Record<NodeId, Node>;

export type NodeId = string;

export type SerializedNodes = Record<NodeId, SerializedNode>;
