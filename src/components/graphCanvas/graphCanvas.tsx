import React from 'react';
import styled from 'styled-components';
import { useWindowSize } from '../../hooks/getWindowSize';
import { Graph } from '@visx/network';
import { Node, NodeRadius } from '../../utils/graphData';

const GraphCanvasWapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
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

const nodes: Node[] = [
    { id: '1', x: 100, y: 100 },
    { id: '2', x: 500, y: 500 },
    { id: '3', x: 650, y: 100 },
  ];

const CustomNode: React.FC<{ node: Node }> = ({ node }) => (
  <Circle cx={0} cy={0} r={NodeRadius} />
);

const CustomLink: React.FC<{ link: { source: string; target: string } }> = ({ link }) => {
    const sourceNode = nodes.find(node => node.id === link.source);
    const targetNode = nodes.find(node => node.id === link.target);

    console.log(sourceNode);
    console.log(targetNode);

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

type GraphCanvasProps = {
  events?: boolean;
};

const GraphCanvas: React.FC<GraphCanvasProps> = ({ events = false }) => {
  const { width, height } = useWindowSize();

  const nodeGraphData = {
    nodes,
    links: [
      { source: '1', target: '2' },
      { source: '1', target: '3' },
    ],
  };

  return (
    <GraphCanvasWapper>
        <svg width={width} height={height + 50}>
            <Graph
                graph={nodeGraphData}
                linkComponent={CustomLink}
                nodeComponent={CustomNode}
            />
        </svg>
    </GraphCanvasWapper>
  );
};

export default GraphCanvas;
