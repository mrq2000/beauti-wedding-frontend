export interface NodeData {
  displayName: string;
  type: string;
  props: Record<string, unknown>;
  parent: string;
  nodes: NodeId[];
  linkedNodes: Record<string, NodeId>;
}

export type Node = {
  id: NodeId;
  data: NodeData;
  dom: HTMLElement | null;
  options?: string[];
};
export type Nodes = Record<NodeId, Node>;

export type NodeId = string;

export type SerializedNodes = Record<NodeId, NodeData>;