import React, { FC, Fragment } from 'react';
import { useEditor } from '../hooks/useEditor';
import { NodeId } from '../interface';
import { DefaultRender } from './DefaultRender';

interface RenderNodeProps {
  nodeId: NodeId;
}

const RenderNode: FC<RenderNodeProps> = ({ nodeId }) => {
  const { state } = useEditor();

  const node = state.nodes[nodeId];

  if (!node) return <></>;
  const component = state.resolver[node.data.type];

  return (
    <Fragment>
      <DefaultRender nodeId={nodeId} node={node} component={component} />
    </Fragment>
  );
};

export default RenderNode;
