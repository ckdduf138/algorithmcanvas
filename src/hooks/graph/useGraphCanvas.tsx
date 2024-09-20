import { useState, useEffect, useRef } from 'react';

import styled from 'styled-components';

import { Node, NodeFocusStatus, NodeGraphData, NodeGraphHeightPadding, NodeRadius } from '../../utils/graphData';
import { useDragCopy } from '../../hooks/graph/useDrag';
import { useWindowSize } from '../getWindowSize';
import { useEditEdge } from './useEditEdge';
import { useSVGEvents } from './useSvgEvents';

export const Circle = styled.circle<{ $focusStatus?: NodeFocusStatus }>`
  fill: white;
  stroke: #333333;
  stroke-width: 3;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));

  cursor: pointer;
  transition: stroke 0.3s ease, stroke-width 0.3s ease, fill 0.3s ease;
`;

export const CircleText = styled.text`
  fill: black;
  font-size: 48px;
  dominant-baseline: middle;
  text-anchor: middle;
  pointer-events: none;
`;

export const Line = styled.line`
  stroke: black;
  stroke-width: 3;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));
`;

export const useGraphCanvas = () => {
  const [nodeGraphData, setNodeGraphData] = useState<NodeGraphData[]>([]);

  const { draggingCircle, draggingNode, handleMouseDown, handleMouseDownNode, dragMouseMove, dragMouseUp } = useDragCopy();

  const { updateHandlers } = useSVGEvents({});

  const { draggingEdge, edgeMouseDown, edgeMouseMove, edgeMouseUp  } = useEditEdge();

  const { width, height } = useWindowSize();

  useEffect(() => {
    updateHandlers(dragMouseMove, handleDrop);
  },[draggingCircle]);

  useEffect(() => {
    nodeGraphData.forEach((currentNode, index) => {
      const { x, y } = currentNode.node;

      const boundary = {
        left: NodeRadius + 2,
        right: width - NodeRadius - 2,
        top: NodeRadius + 2,
        bottom: height * 0.8 - NodeGraphHeightPadding - NodeRadius - 7
      };

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

  const handleDrop = () => {
    if(!draggingCircle) return;

    const newNode = {
      id: nodeGraphData.length.toString(),
      x: draggingCircle.cx,
      y: draggingCircle.cy,
      r: draggingCircle.r,
    };
  
    const newLink = {
      source: (nodeGraphData.length - 1).toString(),
      target: nodeGraphData.length.toString(),
    };
  
    const newData: NodeGraphData = { node: newNode, link: newLink, focus: 'inactive' };
    setNodeGraphData((prevData) => [...prevData, newData]);

    dragMouseUp();
  };

  const nodeGraphDatas = {
    nodes: nodeGraphData.map(data => data.node),
    links: nodeGraphData.map(data => data.link),
  };

  const CustomNode: React.FC<{ node: Node }> = ({ node }) => {
    const foundNodeData: NodeGraphData | undefined = nodeGraphData.find(graph => graph.node.id === node.id);
    
    const handleMouseDown = () => {
      if (foundNodeData) {
        updateHandlers(dragMouseMove, dragMouseUp);
        handleMouseDownNode(foundNodeData);
      }
    };

    return (
      <>
        <Circle $focusStatus={foundNodeData?.focus} id={node.id} r={NodeRadius} 
          onMouseDown={handleMouseDown}
        />
        <CircleText x={0} y={0}>{node.id}</CircleText>
      </>
    );
  };

  const CustomLink: React.FC<{ link: { source: string; target: string; dashed?: boolean } }> = ({ link }) => {
    const nodes = nodeGraphData.map(data => data.node);
    const sourceNode = nodes.find(node => node.id === link.source);
    const targetNode = nodes.find(node => node.id === link.target);

    if (!sourceNode || !targetNode) return null;
  
    const handleMouseDown = () => {
      edgeMouseDown(sourceNode, targetNode);
      updateHandlers(dragMouseMove, edgeMouseUp);
      edgeMouseDown(sourceNode, targetNode);
    };

    return (
      <Line 
        x1={sourceNode.x}
        y1={sourceNode.y} 
        x2={targetNode.x} 
        y2={targetNode.y}
        strokeOpacity={0.6}
        strokeDasharray={link.dashed ? '8,4' : undefined} 
        onMouseDown={handleMouseDown}
      />
    );
  };

  return {
    nodeGraphDatas,
    draggingCircle,
    CustomNode,
    CustomLink,
    handleMouseDown
  };
};