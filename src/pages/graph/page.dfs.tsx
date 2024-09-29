import React, { useRef } from 'react';

import { useGraphCanvas } from '../../hooks/graph/useGraphCanvas';
import { useGraphCanvasUI } from '../../hooks/graph/useGraphCanvasUI';

import Layout from '../../components/layout/layout';
import GraphCanvas from '../../components/graphCanvas/graphCanvas';

import { EdgeFocusStatus, NodeFocusStatus } from '../../utils/graphData';
import SlideUI from '../../components/graphCanvas/slideUI';

const DFSPage: React.FC = () => {
  const isRunning = useRef(false);
  const delayRef = useRef(500);

  const { 
    nodeGraphData, setNodeGraphData, setSeletedNode, nodeGraphDatas, draggingCircle, selectedEdge, selectedNode,  draggingEdge, CustomNode, CustomLink, 
    handleMouseDown, handleEdgeClick } 
    = useGraphCanvas(isRunning, delayRef);

  const { randomizeGraphData, resetGraphData } = useGraphCanvasUI(setNodeGraphData);

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
    
    const dfs = async (currentNodeId: string, currentDepth: number) => {
      visited.set(currentNodeId, true);
      nodeDepthMap.set(currentNodeId, currentDepth);
  
      if(currentNodeId !== startNodeId) {
        await updateNodeFocus(currentNodeId, 'active', currentDepth);
      }
  
      const currentNode = nodes.find((node) => node.id === currentNodeId);
      if (!currentNode) return;
  
      const neighbors = links
        .filter((link) => link.source === currentNodeId || link.target === currentNodeId)
        .map((link) => (link.source === currentNodeId ? link.target : link.source));
  
      for (const neighborId of neighbors) {
        if (!visited.get(neighborId)) {
          await updateEdgeFocus(currentNodeId, neighborId, 'active');
          updateEdgeFocus(currentNodeId, neighborId, 'completed');
  
          await dfs(neighborId, currentDepth + 1);

        }
      }
    };

    await dfs(startNodeId, 0);
  
    new Promise((resolve) => setTimeout(resolve, delayRef.current));

    isRunning.current = false;
    setSeletedNode(null);
  };
    
  const handleRandomizeGraphData = (numNodes: number) => {
    setSeletedNode(null);
    randomizeGraphData(numNodes);
  };

  const handleResetGraphData = () => {
    setSeletedNode(null);
    resetGraphData();
  };

  const onclickBtnStart = async () => {
    if(selectedNode) {
      await handleStart(selectedNode.id);
    }
    else {
      alert('시작할 노드를 선택해주세요.');
    }
  };
  
  return(
    <Layout subTitle='깊이 우선 탐색(DFS)'>
      <GraphCanvas 
        nodeGraphDatas={nodeGraphDatas}
        draggingCircle={draggingCircle}
        selectedNode={selectedNode}
        selectedEdge={selectedEdge}
        isWeighted={false}
        draggingEdge={draggingEdge}
        CustomNode={CustomNode}
        CustomLink={CustomLink}
        delayRef={delayRef}
        isRunning={isRunning}
        handleMouseDown={handleMouseDown}
        handleEdgeClick={handleEdgeClick}
      />

      {/* UI */}
      <SlideUI 
        dataSize={nodeGraphDatas.nodes.length}
        isRunning={isRunning}
        delayRef={delayRef} 
        onclickBtnRandom={() => handleRandomizeGraphData(5)}
        onclickBtnReset={handleResetGraphData}
        onclickBtnStart={onclickBtnStart} 
      />
    </Layout>
  )
};

export default DFSPage;
