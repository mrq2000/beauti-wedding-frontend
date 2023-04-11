import React, { Fragment, useMemo } from 'react';
import { BuilderComponent, Node, NodeId } from '../interface';
import RenderNode from './RenderNode';

interface DefaultRenderProps {
  node: Node;
  component: BuilderComponent;
  nodeId: NodeId;
}
export const DefaultRender = ({ node, component, nodeId }: DefaultRenderProps) => {
  const defaultProps: any = {
    id: nodeId,
  };

  return useMemo(() => {
    if (!node.data.nodes.length) return React.createElement(component, defaultProps);
    return React.createElement(
      component,
      defaultProps,
      <Fragment>
        {node.data.nodes.map((id) => (
          <RenderNode key={id} nodeId={id}></RenderNode>
        ))}
      </Fragment>,
    );
  }, [node.data.nodes]);
};
