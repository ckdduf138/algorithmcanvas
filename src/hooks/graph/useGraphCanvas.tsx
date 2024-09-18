import { useState, useEffect, useRef } from 'react';
import { Node, NodeGraphData, NodeGraphHeightPadding, NodeRadius } from '../../utils/graphData';
import { useDragCopy } from '../../hooks/graph/useDrag';
import styled from 'styled-components';
import { useWindowSize } from '../getWindowSize';

const Circle = styled.circle`
  fill: white;
  stroke: black;
  stroke-width: 2;
`;

const CircleText = styled.text`
  fill: black;
  font-size: 48px;
  dominant-baseline: middle;
  text-anchor: middle;
  pointer-events: none;
`;

const Line = styled.line`
  stroke: black;
  stroke-width: 2;
`;

export const useGraphCanvas = () => {
  const [nodeGraphData, setNodeGraphData] = useState<NodeGraphData[]>([]);

  const { draggingCircle, draggingNode, handleMouseDown, handleMouseDownNode, handleMouseMove, handleMouseUp } = useDragCopy();
  const { width, height } = useWindowSize();

  const boundary = {
    left: NodeRadius + 2,
    right: width - NodeRadius - 2,
    top: NodeRadius + 2,
    bottom: height * 0.8 - NodeGraphHeightPadding - NodeRadius - 7
  };

  useEffect(() => {
    nodeGraphData.forEach((currentNode, index) => {
      const { x, y } = currentNode.node;

      const isOutOfBounds = x < boundary.left || x > boundary.right || y < boundary.top || y > boundary.bottom;

      if (isOutOfBounds) {
        setNodeGraphData(prevData => {
          const updatedData = [...prevData];

          updatedData[index] = {
            ...updatedData[index],
            node: {
              ...updatedData[index].node,
              x: Math.max(boundary.left, Math.min(x, boundary.right)),
              y: Math.max(boundary.top, Math.min(y, boundary.bottom))
            }
          };
          return updatedData;
        });
      }
    });
  }, [nodeGraphData]);

  useEffect(() => {
    if (!draggingNode) return;

    const newData: NodeGraphData = draggingNode;

    setNodeGraphData((prevData) => {
      const index = prevData.findIndex((nodeData) => nodeData.node.id === newData.node.id);
      
      if (index === -1) return prevData;

      const updatedData = [...prevData];
      updatedData[index] = { ...updatedData[index], ...newData };

      return updatedData;
    });
  }, [draggingNode]);

  const handleDrop = (circle: { cx: number, cy: number, r: number }) => {

    const newNode = {
      id: nodeGraphData.length.toString(),
      x: circle.cx,
      y: circle.cy,
      r: circle.r,
    };
  
    const newLink = {
      source: (nodeGraphData.length - 1).toString(),
      target: nodeGraphData.length.toString(),
    };
  
    const newData: NodeGraphData = { node: newNode, link: newLink, focus: 'inactive' };
    setNodeGraphData((prevData) => [...prevData, newData]);
  };

  const nodeGraphDatas = {
    nodes: nodeGraphData.map(data => data.node),
    links: nodeGraphData.map(data => data.link),
  };

  const CustomNode: React.FC<{ node: Node }> = ({ node }) => {
    const handleMouseDown = () => {
      const foundNodeData = nodeGraphData.find(graph => graph.node.id === node.id);

      if (foundNodeData) {
        handleMouseDownNode(foundNodeData);
      }
    };
    
    return (
      <>
        <Circle id={node.id} r={NodeRadius} onMouseDown={handleMouseDown}/>
        <CircleText x={0} y={0}>{node.id}</CircleText>
      </>
    );
  };

  const CustomLink: React.FC<{ link: { source: string; target: string; dashed?: boolean } }> = ({ link }) => {
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
        strokeOpacity={0.6}
        strokeDasharray={link.dashed ? '8,4' : undefined} 
      />
    );
  };

  return {
    nodeGraphData,
    nodeGraphDatas,
    draggingCircle,
    draggingNode,
    CustomNode,
    CustomLink,
    handleMouseDown,
    handleMouseDownNode,
    handleMouseMove,
    handleMouseUp,
    handleDrop,
  };
};