import { EditorState, NodeId, SerializedNodes } from '../interface';

export type MethodsFunction = ReturnType<typeof Methods>;

export const Methods = (state: EditorState) => ({
  getInfo() {
    return state.info;
  },
  getSelected() {
    return state.selected;
  },

  node(id: NodeId) {
    return state.nodes[id];
  },

  /**
   * Returns all the `nodes` in a serialized format
   */
  getSerializedNodes(): SerializedNodes {
    const res: SerializedNodes = {};
    Object.keys(state.nodes).forEach((id) => {
      res[id] = this.node(id).data;
    });
    return res;
  },

  /**
   * Retrieve the JSON representation of the editor's Nodes
   */
  serialize(): string {
    return JSON.stringify(this.getSerializedNodes());
  },
});
