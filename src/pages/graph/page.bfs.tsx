import React, { useRef } from 'react';
import Layout from '../../components/layout/layout';
import GraphCanvas from '../../components/graphCanvas/graphCanvas';
import { useGraphCanvas } from '../../hooks/graph/useGraphCanvas';
import { EdgeFocusStatus, NodeFocusStatus } from '../../utils/graphData';

const BFSPage: React.FC = () => {
  const isRunning = useRef(false);
  const delayRef = useRef(500);

  const { 
    nodeGraphData, setNodeGraphData, setSeletedNode, nodeGraphDatas, draggingCircle, selectedEdge, selectedNode,  draggingEdge, CustomNode, CustomLink, 
    handleMouseDown, handleEdgeClick, handleRandomizeGraphData, handleResetGraphData } 
    = useGraphCanvas(isRunning, delayRef);

  const updateNodeFocus = async (nodeId: string, updateState: NodeFocusStatus, nodeDepth?: number) => {
    setNodeGraphData(prevData => {
      if (!prevData) return prevData;
  
      const updatedNodes = prevData.nodes.map((node) => ({
        ...node,
        focus: node.id === nodeId ? updateState : node.focus,
        text: nodeDepth !== undefined ? (node.id === nodeId ? nodeDepth?.toString() : node.text) : node.text,
      }));
  
      return {
        ...prevData,
        nodes: updatedNodes,
      };
    });

    await new Promise(resolve => setTimeout(resolve, delayRef.current));
  }

  const updateEdgeFocus = async (source: string, target: string, updateState: EdgeFocusStatus) => {
    setNodeGraphData(prevData => {
      if (!prevData) return prevData;
      const updatedLinks = prevData.links.map((link) => {
        if (source === link.target && target === link.source) {
          return {
            ...link,
            source: link.target,
            target: link.source,
            focus: updateState
          };
        }
    
        if (source === link.source && target === link.target) {
          return {
            ...link,
            focus: updateState
          };
        }

        return link;
      });
    
      return {
        ...prevData,
        links: updatedLinks,
      };
    });

    await new Promise(resolve => setTimeout(resolve, delayRef.current));
  }

  const handleStart = async (startNodeId: string) => {
    isRunning.current = true;
  
    const { nodes, links } = nodeGraphData;
  
    const visited = new Map<string, boolean>();
    
    const nodeDepthMap = new Map<string, number>();
  
    nodes.forEach((node) => visited.set(node.id, false));
  
    const queue: Array<[string, number]> = [[startNodeId, 0]];
    visited.set(startNodeId, true);
    nodeDepthMap.set(startNodeId, 0);
  
    await updateNodeFocus(startNodeId, 'active', 0);
  
    while (queue.length > 0) {
      const current = queue.shift();

      if (!current) continue;
  
      const [currentNodeId, currentDepth] = current;

      const currentNode = nodes.find((node) => node.id === currentNodeId);
  
      if (!currentNode) return;
  
      const neighbors = links
        .filter((link) => link.source === currentNodeId || link.target === currentNodeId)
        .map((link) => (link.source === currentNodeId ? link.target : link.source));
  
      for (const neighborId of neighbors) {
        if (!visited.get(neighborId)) {
          visited.set(neighborId, true);
  
          queue.push([neighborId, currentDepth + 1]);
          nodeDepthMap.set(neighborId, currentDepth + 1);
  
          await updateEdgeFocus(currentNodeId, neighborId, 'active');
          updateEdgeFocus(currentNodeId, neighborId, 'completed');
  
          await updateNodeFocus(neighborId, 'active', currentDepth + 1);
  
          await updateNodeFocus(currentNodeId, 'completed');
        }
      }
    }
  
    new Promise((resolve) => setTimeout(resolve, delayRef.current));
  
    nodes.forEach((node) => { 
      if(visited.get(node.id)) {
        updateNodeFocus(node.id, 'completed');
      }
    });
  
    isRunning.current = false;
    setSeletedNode(null);
  };
    
  return(
    <Layout subTitle='너비 우선 탐색(BFS)'>
      <GraphCanvas 
        nodeGraphDatas={nodeGraphDatas}
        draggingCircle={draggingCircle}
        selectedNode={selectedNode}
        selectedEdge={selectedEdge}
        draggingEdge={draggingEdge}
        CustomNode={CustomNode}
        CustomLink={CustomLink}
        delayRef={delayRef}
        isRunning={isRunning}
        handleMouseDown={handleMouseDown}
        handleEdgeClick={handleEdgeClick}
        handleRandomizeGraphData={handleRandomizeGraphData}
        handleResetGraphData={handleResetGraphData}
        handleStart={handleStart}
      />
    </Layout>
  )
};

export default BFSPage;
