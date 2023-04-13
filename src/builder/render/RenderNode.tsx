import React, { FC, Fragment } from 'react';
import { useEditor } from '../hooks/useEditor';
import { NodeId } from '../interface';
import { DefaultRender } from './DefaultRender';

interface RenderNodeProps {
  nodeId: NodeId;
}

const RenderNode: FC<RenderNodeProps> = ({ nodeId }) => {
  const { state } = useEditor();

  return (
    <Fragment>
      {React.createElement(state.onRender, {
        render: <DefaultRender nodeId={nodeId} />,
        id: nodeId,
      })}
    </Fragment>
  );
};

export default RenderNode;
