import React, { useRef, useState } from 'react';
import Layout from '../../components/layout/layout';
import GraphCanvas from '../../components/graphCanvas/graphCanvas';
import { useGraphCanvas } from '../../hooks/graph/useGraphCanvas';
import { EdgeFocusStatus, NodeFocusStatus } from '../../utils/graphData';

const BFSPage: React.FC = () => {
  const isRunning = useRef(false);
  const delayRef = useRef(500);

  const [, setRenderState] = useState(false);

  const { 
    nodeGraphData, setNodeGraphData,  nodeGraphDatas, draggingCircle, selectedEdge, selectedNode,  draggingEdge, CustomNode, CustomLink, 
    handleMouseDown, handleEdgeClick, handleRandomizeGraphData, handleResetGraphData } 
    = useGraphCanvas(isRunning, delayRef);

    const updateNodeFocus = async (nodeId: string, updateState: NodeFocusStatus) => {
      setNodeGraphData(prevData => {
        if (!prevData) return prevData;
    
        const updatedNodes = prevData.nodes.map((node) => ({
          ...node,
          focus: node.id === nodeId ? updateState : node.focus,
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
      nodes.forEach((node) => visited.set(node.id, false));
    
      const queue: string[] = [startNodeId];
      visited.set(startNodeId, true);
    
      await updateNodeFocus(startNodeId, 'selected');
    
      let prevNodeId: string | null = null;
    
      while (queue.length > 0) {
        const currentNodeId = queue.shift();
        const currentNode = nodes.find((node) => node.id === currentNodeId);
    
        if (!currentNode) return;
    
        await updateNodeFocus(currentNode.id, 'active');
    
        const neighbors = links
          .filter((link) => link.source === currentNodeId || link.target === currentNodeId)
          .map((link) => (link.source === currentNodeId ? link.target : link.source));
    
        const newlyHighlightedNodes: string[] = [];
    
        for (const neighborId of neighbors) {
          if (!visited.get(neighborId)) {
            visited.set(neighborId, true);
            queue.push(neighborId);
            newlyHighlightedNodes.push(neighborId);
    
            await updateNodeFocus(neighborId, 'highlight');
            await updateEdgeFocus(currentNode.id, neighborId, 'active');
            updateEdgeFocus(currentNode.id, neighborId, 'completed');
          }
        }
    
        if (prevNodeId) {
          await updateNodeFocus(prevNodeId, 'completed');
        }
    
        prevNodeId = currentNode.id;
      }

      if (prevNodeId) {
        await updateNodeFocus(prevNodeId, 'completed');
      }
    
      isRunning.current = false;
      setRenderState((prev) => !prev);
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
