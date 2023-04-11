import { Nodes, Resolver, SerializedNodes } from '../interface';

export const createNodes = (nodesData: SerializedNodes, resolver: Resolver) => {
  const nodes: Nodes = {};

  Object.keys(nodesData).forEach((nodeId) => {
    const node = nodesData[nodeId];
    const comp = resolver[node.type];

    nodes[nodeId] = {
      id: nodeId,
      data: {
        ...node,
        ...comp.settings,
        props: {
          ...node.props,
          ...comp.defaultProps,
        },
      },
    };
  });

  return nodes;
};
