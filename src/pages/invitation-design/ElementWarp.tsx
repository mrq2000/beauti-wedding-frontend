import React, { createContext, FC, PropsWithChildren, useState } from 'react';

export const ElementContext = createContext<{ elements: string[]; setElements: (data: string[]) => void }>({
  elements: [],
  setElements: null as any,
});

interface ElementWrapProps {
  data: string[];
}

const ElementWrap: FC<PropsWithChildren<ElementWrapProps>> = ({ data, children }) => {
  const [elements, setElements] = useState(data);

  return <ElementContext.Provider value={{ elements, setElements }}>{children}</ElementContext.Provider>;
};

export default ElementWrap;
