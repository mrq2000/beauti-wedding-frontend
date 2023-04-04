import { EditorContext } from './../editor/EditorContext';
import { useContext, useMemo } from 'react';

export const useEditor = () => {
  const state = useContext(EditorContext);

  return useMemo(() => {
    return state;
  }, [state]);
};
