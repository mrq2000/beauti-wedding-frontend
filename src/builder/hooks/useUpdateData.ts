import { createNodes } from './../utils/createNode';
import { EditorContext } from './../editor/EditorContext';
import { useContext, useEffect } from 'react';
import { SerializedNodes } from '../interface';

export const useUpdateData = (data: string) => {
  const {
    actions: { setNodes },
    state: { resolver },
  } = useContext(EditorContext);
  useEffect(() => {
    try {
      const elements = JSON.parse(data) as SerializedNodes;

      setNodes(createNodes(elements, resolver));
    } catch (error) {
      console.log(error);
    }
  }, []);
};
