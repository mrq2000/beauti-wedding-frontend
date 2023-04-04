import { EditorState } from './../interface/editor';

export type ActionFunction = ReturnType<typeof actions>;

export const actions = (state: EditorState) => {
  return {
    deleteNode: () => {
      console.log(2222);
    },
    selectNode: (key: string) => {
      state.selected = {
        id: key,
      };
    },
  };
};
