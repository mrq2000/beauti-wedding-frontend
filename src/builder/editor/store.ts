import { EditorState } from './../interface/editor';
import { useMethods } from '../hooks/useMethods';

export type EditorStore = ReturnType<typeof useMethods>;
export const useEditorStore = (initState: EditorState) => {
  return useMethods(initState);
};
