import React, { Fragment, useMemo } from 'react';
import { useEditor } from '../hooks/useEditor';
import { BuilderComponent, Node, NodeId } from '../interface';
import RenderNode from './RenderNode';

interface DefaultRenderProps {
  nodeId: NodeId;
}
export const DefaultRender = ({ nodeId }: DefaultRenderProps) => {
  const { state } = useEditor();
  const defaultProps: any = {
    id: nodeId,
  };
  const node = state.nodes[nodeId];

  return useMemo(() => {
    console.log(node?.data?.nodes?.toString());
    if (!node) return null;
    const component = state.resolver[node.data.type];

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
  }, [node?.data?.nodes?.toString()]);
};
