import React, { useEffect, useRef, useState } from 'react';

import { useGraphCanvas } from '../../hooks/graph/useGraphCanvas';
import { useGraphCanvasUI } from '../../hooks/graph/useGraphCanvasUI';

import Layout from '../../components/layout/layout';
import GraphCanvas from '../../components/graphCanvas/graphCanvas';

import { EdgeFocusStatus, NodeFocusStatus } from '../../utils/graphData';
import BottomUI from '../../components/graphCanvas/slideUI';
import { useAlert } from '../../context/alertContext';

const BFSPage: React.FC = () => {
  const [isRunningState, setIsRunnigState] = useState<'play' | 'pause' | 'ready'>('ready');
  const isRunning = useRef<'play' | 'pause' | 'ready'>('ready');
  
  const delayRef = useRef(500);
  const isPaused = useRef(false);
  const isStopped = useRef(false);
  
  const { 
    nodeGraphData, setNodeGraphData, setSeletedNode, nodeGraphDatas, draggingCircle, selectedEdge, selectedNode,  draggingEdge, CustomNode, CustomLink, 
    handleMouseDown, handleEdgeClick } 
    = useGraphCanvas(isRunning.current, delayRef);

  const { randomizeGraphData, resetGraphData } = useGraphCanvasUI(setNodeGraphData);

  const { sendAlert, resetAlert } = useAlert();

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
    isRunning.current = 'play';
    setIsRunnigState('play');

    const { nodes, links } = nodeGraphData;
  
    const visited = new Map<string, boolean>();
    
    const nodeDepthMap = new Map<string, number>();
  
    nodes.forEach((node) => visited.set(node.id, false));
  
    const queue: Array<[string, number]> = [[startNodeId, 0]];
    visited.set(startNodeId, true);
    nodeDepthMap.set(startNodeId, 0);
  
    if (isPaused.current) await new Promise<void>(pauseResume);
    await updateNodeFocus(startNodeId, 'selected', 0);
  
    while (queue.length > 0) {
      if (isStopped.current) return;

      const current = queue.shift();

      if (!current) continue;
  
      const [currentNodeId, currentDepth] = current;

      const currentNode = nodes.find((node) => node.id === currentNodeId);
  
      if (!currentNode) return;
  
      const neighbors = links
        .filter((link) => link.source === currentNodeId || link.target === currentNodeId)
        .map((link) => (link.source === currentNodeId ? link.target : link.source));
  
      for (const neighborId of neighbors) {
        if (isStopped.current) return;

        if (!visited.get(neighborId)) {
          visited.set(neighborId, true);
  
          queue.push([neighborId, currentDepth + 1]);
          nodeDepthMap.set(neighborId, currentDepth + 1);
  
          if (isPaused.current) await new Promise<void>(pauseResume);
          
          await updateEdgeFocus(currentNodeId, neighborId, 'active');
          updateEdgeFocus(currentNodeId, neighborId, 'completed');
  
          await updateNodeFocus(neighborId, 'active', currentDepth + 1);
        }
      }
    }
  
    if (isPaused.current) await new Promise<void>(pauseResume);
    new Promise((resolve) => setTimeout(resolve, delayRef.current));
  
    isRunning.current = 'ready';
    setIsRunnigState('ready');

    setSeletedNode(null);

    if (!isStopped.current) sendAlert('success', '완료되었습니다.');
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

      if(isRunning.current === 'ready') {
        await handleStart(selectedNode.id);
      }
      else if(isRunning.current === 'play') {
        isPaused.current = true;
        isRunning.current = 'pause';
        setIsRunnigState('pause');
      }
      else if(isRunning.current === 'pause') {
        isPaused.current = false;
        isRunning.current = 'play';
        setIsRunnigState('play');
      }
    }
    else {
      sendAlert('info', '시작할 노드를 선택해주세요.');
    }
  };

  const pauseResume = (resolve: () => void) => {
    const checkPaused = () => {
      if (!isPaused.current) {
        resolve();
      } else {
        requestAnimationFrame(checkPaused);
      }
    };
    checkPaused();
  };

  const handleStop = () => {
    isStopped.current = true;
    isPaused.current = false;
  };

  useEffect(() => {
    return() => {
      resetAlert();
      handleStop();
    }
  },[resetAlert]);

  return(
    <Layout subTitle='너비 우선 탐색(BFS)'>
      <GraphCanvas 
        nodeGraphDatas={nodeGraphDatas}
        draggingCircle={draggingCircle}
        selectedEdge={selectedEdge}
        draggingEdge={draggingEdge}
        isWeighted={false}
        CustomNode={CustomNode}
        CustomLink={CustomLink}
        delayRef={delayRef}
        isRunning={isRunning.current}
        handleMouseDown={handleMouseDown}
        handleEdgeClick={handleEdgeClick}
      />

      {/* UI */}
      <BottomUI 
        dataSize={nodeGraphDatas.nodes.length}
        isRunning={isRunningState}
        delayRef={delayRef} 
        onclickBtnRandom={() => handleRandomizeGraphData(5)}
        onclickBtnReset={handleResetGraphData}
        onclickBtnStart={onclickBtnStart} 
      />
      
    </Layout>
  )
};

export default BFSPage;
