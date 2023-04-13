import { EditorContext } from './../editor/EditorContext';
import { useContext } from 'react';

export const useEditor = () => {
  const state = useContext(EditorContext);

  return state;
};
