import { Node, NodeId, Nodes } from '../interface';
import { EditorState } from './../interface/editor';

export type ActionFunction = ReturnType<typeof actions>;

export const actions = (state: EditorState) => {
  return {
    deleteNode: (id: NodeId) => {
      console.log(id);
    },
    setNodes: (nodes: Nodes) => {
      state.nodes = nodes;
    },
    selectNode: (id: string, option: string) => {
      state.selected = {
        id,
        option,
      };
    },
    addNode: (id: NodeId, node: Node) => {
      state.nodes[id] = node;
    },
    setDOM(id: NodeId, dom: HTMLElement | null) {
      // console.log(id);

      if (!state.nodes[id] || !dom) {
        return;
      }

      state.nodes[id].dom = dom;
    },
  };
};
