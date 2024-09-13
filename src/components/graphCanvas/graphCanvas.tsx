import React, { useState } from 'react';

import styled from 'styled-components';
import { Graph } from '@visx/network';

import { Link, Node, NodeGraphData } from '../../utils/graphData';
import { useWindowSize } from '../../hooks/getWindowSize';
import { useDragCopy } from '../../hooks/graph/useDrag';

const GraphCanvasWapper = styled.svg`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Circle = styled.circle`
  fill: white;
  stroke: black;
  stroke-width: 2;
`;

const Line = styled.line`
  stroke: black;
  stroke-width: 2;
`;

const NodeRadius = 50;

interface GraphCanvasProps {

}

const GraphCanvas: React.FC<GraphCanvasProps> = ({ }) => {
  const [nodeGraphData, setNodeGraphData] = useState<NodeGraphData[]>([]);

  const { width, height } = useWindowSize();
  const { draggingCircle, handleMouseDown, handleMouseDownNode, handleMouseMove, handleMouseUp } = useDragCopy();
  
  const adjustedHeight = height * 0.8;
  const headerHeight = height * 0.1;

  const handleDrop = (circle: { cx: number, cy: number, r: number }) => {
    const newNode: Node = {
      id: nodeGraphData.length.toString(),
      x: circle.cx,
      y: circle.cy,
      r: circle.r,
    };

    const newLink: Link = {
      source: (nodeGraphData.length - 1).toString(), 
      target: nodeGraphData.length.toString(),
    };

    const newData: NodeGraphData = {node: newNode, link: newLink, focus: 'inactive'};

    setNodeGraphData((prevData) => [
      ...prevData, newData]);
  };

  const nodeGraphDatas = {
    nodes: nodeGraphData.map(data => data.node),
    links: nodeGraphData.map(data => data.link),
  };

  const CustomNode: React.FC<{ node: Node }> = ({ node }) => {
    const nodeData = nodeGraphData.find(graph => graph.node.id === node.id);

    return (
      <Circle
        cx={0}
        cy={0}
        r={NodeRadius}
        onMouseDown={() => handleMouseDownNode(nodeData)}
      />
    );
  };

  const CustomLink: React.FC<{ link: { source: string; target: string } }> = ({ link }) => {
    const nodes = nodeGraphData.map(data => data.node);
    const sourceNode = nodes.find(node => node.id === link.source);
    const targetNode = nodes.find(node => node.id === link.target);

    if (!sourceNode || !targetNode) return null;

    return (
        <Line 
            x1={sourceNode.x}
            y1={sourceNode.y} 
            x2={targetNode.x} 
            y2={targetNode.y} 
        />
    );
  };
  
  return (
    <GraphCanvasWapper
      width={width} 
      height={adjustedHeight}
      onMouseMove={handleMouseMove} 
      onMouseUp={() => handleMouseUp(handleDrop)}>

      <Graph
        graph={nodeGraphDatas}
        linkComponent={CustomLink}
        nodeComponent={CustomNode}
      />

      {/* 복사용 노드 */}
      <Circle cx={width / 2} cy={adjustedHeight - headerHeight} r={NodeRadius} 
        onMouseDown={() => handleMouseDown({ id: nodeGraphData.length.toString(), cx: width / 2, cy: adjustedHeight - headerHeight, r: NodeRadius })}
      />
      
      {/* 복사 중인 노드 */}
      {draggingCircle && (
        <Circle 
          cx={draggingCircle.cx} 
          cy={draggingCircle.cy} 
          r={draggingCircle.r} 
          style={{ fill: 'gray', opacity: 0.5 }} 
        />
      )}
    </GraphCanvasWapper>
  );
};

export default GraphCanvas;
