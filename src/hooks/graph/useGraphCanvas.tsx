import { useState, useEffect, useRef } from 'react';

import { EdgeFocusStatus, getClosestAndFurthestNode, Link, Node, NodeFocusStatus, NodeGraphData, NodeGraphHeightPadding, NodeRadius } from '../../utils/graphData';
import { useDragCopy } from '../../hooks/graph/useDrag';
import { useWindowSize } from '../getWindowSize';
import { useEditEdge } from './useEditEdge';
import { useTheme } from '../../context/themeContext';
import CustomCircle from '../../components/graphCanvas/customCircle';
import CustomLine from '../../components/graphCanvas/customLine';

export const useGraphCanvas = (isRunning : React.MutableRefObject<boolean>, delayRef : React.MutableRefObject<number>, 
  isNegativeWeightAllowed: boolean = false, direction: boolean = false
) => {
  const [nodeGraphData, setNodeGraphData] = useState<NodeGraphData>({nodes: [], links: []});
  const [selectedEdge, setSeletedEdge] = useState<boolean>(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const isWeightedRef = useRef(false);

  const { draggingCircle, draggingNode, handleMouseDown, handleMouseDownNode } = useDragCopy(setNodeGraphData, setSelectedNode);

  const { draggingEdge, edgeMouseDown, createEdgeMouseDown  } = useEditEdge(nodeGraphData, setNodeGraphData, direction);

  const { width, height } = useWindowSize();

  const {theme} = useTheme();

  const handleEdgeClick = (isWeighted: boolean) => {
    if(isRunning.current) return;

    isWeightedRef.current = isWeighted;
    setSeletedEdge(!selectedEdge);
  };

  const ResetData = () => {
    setNodeGraphData(prevData => {
      if (!prevData) return prevData;
    
      const updatedNodes = prevData.nodes.map((node) => ({
        ...node,
        focus: 'inactive' as NodeFocusStatus,
        text: 'node',
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

    setSelectedNode(null);
  };

  const nodeGraphDatas = {
    nodes: nodeGraphData?.nodes,
    links: nodeGraphData?.links,
  };

  const CustomNode: React.FC<{ node: Node }> = ({ node }) => {  
    const handleMouseDown = () => {

      if(isRunning.current) return;

      ResetData();

      node.focus = 'selected';
      node.text = 'node';

      setNodeGraphData(prevData => {
        if (!prevData) return prevData;
      
        const updatedNodes = prevData.nodes.map((updateNode) => ({
          ...updateNode,
          focus: updateNode.id === node.id ? 'selected' : updateNode.focus,
          text: updateNode.id === node.id ? 'node' : updateNode.text,
        }));
  
        return {
          ...prevData,
          nodes: updatedNodes,
        };
      });
      
      setSelectedNode(node);

      if(selectedEdge) {
        createEdgeMouseDown(node, isWeightedRef.current);
      }
      else {
        handleMouseDownNode(node);
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

    const handleMouseDown = (e: React.PointerEvent) => {
      if(isRunning.current) return;

      ResetData();

      const closestNode: [Node, Node] = getClosestAndFurthestNode({ x: e.clientX, y: e.clientY * 0.8 }, sourceNode, targetNode);
      if(closestNode) {
        edgeMouseDown(e, closestNode, link);
      }
    };

    const setWeight = (newWeight: number) => {
      setNodeGraphData(prevData => {
        if (!prevData) return prevData;
        const updatedLinks = prevData.links.map((updateLink) => {
          if (link.source === updateLink.target && link.target === updateLink.source) {
            return {
              ...updateLink,
              weight: newWeight,
            };
          }
      
          if (link.source === updateLink.source && link.target === updateLink.target) {
            return {
              ...updateLink,
              weight: newWeight,
            };
          }
  
          return updateLink;
        });
      
        return {
          ...prevData,
          links: updatedLinks,
        };
      });
    };

    return (
      <CustomLine
        x1={sourceNode.x}
        y1={sourceNode.y} 
        x2={targetNode.x} 
        y2={targetNode.y}
        direction={link.direction}
        dashed={link.dashed}
        weight={link.weight}
        isNegativeWeightAllowed={isNegativeWeightAllowed}
        $theme={theme}
        focusStatus={link.focus}
        delay={delayRef.current}
        onPointerDown={handleMouseDown}
        setWeight={setWeight}
        arrowId='arrowhead'
      />
    );
  };

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
    setSeletedNode: setSelectedNode,
    nodeGraphDatas,
    draggingCircle,
    selectedEdge,
    selectedNode,
    draggingEdge,
    CustomNode,
    CustomLink,
    ResetData,
    handleMouseDown,
    handleEdgeClick,
  };
};
