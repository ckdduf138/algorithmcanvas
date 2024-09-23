import { useState, useEffect, useRef } from 'react';

import styled from 'styled-components';

import { EdgeFocusStatus, getClosestAndFurthestNode, Link, Node, NodeFocusStatus, NodeGraphData, NodeGraphHeightPadding, NodeRadius } from '../../utils/graphData';
import { useDragCopy } from '../../hooks/graph/useDrag';
import { useWindowSize } from '../getWindowSize';
import { useEditEdge } from './useEditEdge';
import { useTheme } from '../../context/themeContext';
import { useGraphCanvasUI } from './useGraphCanvasUI';
import CustomCircle from '../../components/graphCanvas/customCircle';
import CustomLine from '../../components/graphCanvas/customLine';

export const Circle = styled.circle<{ $focusStatus?: NodeFocusStatus, $theme: string }>`
  fill: #D9D9D9;
  stroke: ${props => props.$theme === 'light' ? 'black' : 'white'};;
  stroke-width: 3;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));

  cursor: pointer;
`;

export const CircleText = styled.text<{$theme: string}>`
  fill: ${props => props.$theme === 'light' ? 'black' : 'black'};
  font-size: 48px;
  dominant-baseline: middle;
  text-anchor: middle;
  pointer-events: none;
  user-select: none;
`;

export const Line = styled.line<{$theme: string}>`
  stroke: ${props => props.$theme === 'light' ? 'black' : 'white'};
  stroke-width: 5;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));
  cursor: pointer;
`;

export const useGraphCanvas = (isRunning : React.MutableRefObject<boolean>, delayRef : React.MutableRefObject<number>) => {
  const [nodeGraphData, setNodeGraphData] = useState<NodeGraphData>({nodes: [], links: []});
  const [selectedEdge, setSeletedEdge] = useState<boolean>(false);
  const [selectedNode, setSeletedNode] = useState<Node | null>(null);

  const nodeTextRef = useRef(0);

  const { draggingCircle, draggingNode, handleMouseDown, handleMouseDownNode } = useDragCopy(nodeTextRef, setNodeGraphData);

  const { randomizeGraphData, resetGraphData } = useGraphCanvasUI(setNodeGraphData);

  const { draggingEdge, edgeMouseDown, createEdgeMouseDown  } = useEditEdge(nodeGraphData, setNodeGraphData);

  const { width, height } = useWindowSize();

  const {theme} = useTheme();

  const handleEdgeClick = () => {
    if(isRunning.current) return;
    setSeletedEdge(!selectedEdge);
  };

  const handleRandomizeGraphData = (numNodes: number) => {
    nodeTextRef.current = 0;
    setSeletedNode(null);
    randomizeGraphData(numNodes, nodeTextRef);
  };

  const handleResetGraphData = () => {
    nodeTextRef.current = 0;
    setSeletedNode(null);
    resetGraphData();
  };

  const nodeGraphDatas = {
    nodes: nodeGraphData?.nodes,
    links: nodeGraphData?.links,
  };

  const CustomNode: React.FC<{ node: Node }> = ({ node }) => {    
    const foundNodeData: Node | undefined = nodeGraphData.nodes.find(nodes => nodes.id === node.id);

    const handleMouseDown = (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation();

      if(isRunning.current) return;

      setNodeGraphData(prevData => {
        if (!prevData) return prevData;
      
        const updatedNodes = prevData.nodes.map((node) => ({
          ...node,
          focus: node === foundNodeData ? 'selected' : 'inactive' as NodeFocusStatus
        }));
      
        const updatedLinks = prevData.links.map((link) => ({
          ...link,
          focus: 'inactive' as EdgeFocusStatus
        }));

        return {
          ...prevData,
          nodes: updatedNodes,
          links: updatedLinks
        };
      });

      if(!foundNodeData) return;

      node.focus = 'selected';
      setSeletedNode(node);

      if(selectedEdge) {
        createEdgeMouseDown(foundNodeData);
      }
      else {
        handleMouseDownNode(foundNodeData);
      }
    };

    const handleNodeDelete = (nodeId: string) => {
      if(isRunning.current) return;

      setNodeGraphData(prevData => {
        const updatedNodes = prevData.nodes.filter(node => node.id !== nodeId);
        const updatedLinks = prevData.links.filter(link => link.source !== nodeId && link.target !== nodeId);

        return {
          nodes: updatedNodes,
          links: updatedLinks,
        };
      });
    };

    return (
      <CustomCircle 
        id={node.id} 
        r={NodeRadius} 
        $focusStatus={node.focus} 
        $theme={theme} 
        text={node.text}
        isRunning={isRunning.current}
        onMouseDown={handleMouseDown}
        onDelete={handleNodeDelete}
      />
    );
  };

  const CustomLink: React.FC<{ link: Link }> = ({ link }) => {
    const sourceNode = nodeGraphData?.nodes.find(node => node.id === link.source);
    const targetNode = nodeGraphData?.nodes.find(node => node.id === link.target);

    if (!sourceNode || !targetNode) return null;

    const handleMouseDown = (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation();
      
      if(isRunning.current) return;

      setNodeGraphData(prevData => {
        if (!prevData) return prevData;
      
        const updatedNodes = prevData.nodes.map((node) => ({
          ...node,
          focus: 'inactive' as NodeFocusStatus
        }));
      
        const updatedLinks = prevData.links.map((link) => ({
          ...link,
          focus: 'inactive' as EdgeFocusStatus
        }));

        return {
          ...prevData,
          nodes: updatedNodes,
          links: updatedLinks
        };
      });

      const closestNode: [Node, Node] = getClosestAndFurthestNode({ x: e.clientX, y: e.clientY }, sourceNode, targetNode);
      if(closestNode) {
        edgeMouseDown(e, closestNode);
      }
    };

    return (
      <CustomLine
        x1={sourceNode.x}
        y1={sourceNode.y} 
        x2={targetNode.x} 
        y2={targetNode.y}
        $theme={theme}
        dashed={link.dashed}
        focusStatus={link.focus}
        delay={delayRef.current}
        onMouseDown={handleMouseDown}
      />
    );
  };

  // useEffect(() => {
  //   updateHandlers(dragMouseMove, handleDrop);
  // },[draggingCircle]);

  useEffect(() => {
    if (!nodeGraphData) return;

    const { nodes } = nodeGraphData;
  
    const updatedNodes = nodes.map((currentNode) => {
      const { x, y } = currentNode;
  
      const boundary = {
        left: NodeRadius + 2,
        right: width - NodeRadius - 2,
        top: NodeRadius + 2,
        bottom: height * 0.8 - NodeGraphHeightPadding - NodeRadius - 7
      };
  
      const isOutOfBounds = x < boundary.left || x > boundary.right || y < boundary.top || y > boundary.bottom;
  
      if (isOutOfBounds) {
        return {
          ...currentNode,
          x: Math.max(boundary.left, Math.min(x, boundary.right)),
          y: Math.max(boundary.top, Math.min(y, boundary.bottom))
        };
      }
  
      return currentNode;
    });
  
    const nodesChanged = !nodes.every((node, index) => 
      node.x === updatedNodes[index].x && node.y === updatedNodes[index].y
    );
  
    if (nodesChanged) {
      setNodeGraphData((prevData) => {
        if (!prevData) return prevData;
        
        return {
          ...prevData,
          nodes: updatedNodes,
        };
      });
    }

  }, [nodeGraphData, width, height]);

  useEffect(() => {
    if (!draggingNode) return;
  
    setNodeGraphData((prevData) => {
      if (!prevData) return prevData;
  
      const updatedNodes = prevData.nodes.map((node) =>
        node.id === draggingNode.id ? { ...node, ...draggingNode } : node
      );
  
      return {
        ...prevData,
        nodes: updatedNodes,
      };
    });
  }, [draggingNode]);

  return {
    nodeGraphData,
    setNodeGraphData,
    nodeGraphDatas,
    draggingCircle,
    selectedEdge,
    selectedNode,
    draggingEdge,
    CustomNode,
    CustomLink,
    handleMouseDown,
    handleEdgeClick,
    handleRandomizeGraphData,
    handleResetGraphData
  };
};
