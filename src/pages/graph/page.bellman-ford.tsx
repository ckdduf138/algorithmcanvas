import React, { useEffect, useRef } from 'react';

import { useGraphCanvas } from '../../hooks/graph/useGraphCanvas';
import { useGraphCanvasUI } from '../../hooks/graph/useGraphCanvasUI';

import Layout from '../../components/layout/layout';
import GraphCanvas from '../../components/graphCanvas/graphCanvas';

import { EdgeFocusStatus, NodeFocusStatus } from '../../utils/graphData';
import SlideUI from '../../components/graphCanvas/slideUI';
import { useAlert } from '../../context/alertContext';

const DijkstraPage: React.FC = () => {
  const isRunning = useRef(false);
  const delayRef = useRef(500);

  const { 
    nodeGraphData, setNodeGraphData, setSeletedNode, nodeGraphDatas, draggingCircle, selectedEdge, selectedNode,  draggingEdge, CustomNode, CustomLink, 
    handleMouseDown, handleEdgeClick } 
    = useGraphCanvas(isRunning, delayRef, true, true);

  const { randomizeGraphDataInWeightAndDirection, resetGraphData } = useGraphCanvasUI(setNodeGraphData);

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

    await new Promise(resolve => setTimeout(resolve, delayRef.current * 1.3));
  }

  const handleStart = async (startNodeId: string) => {
    isRunning.current = true;

    const { nodes, links } = nodeGraphData;
  
    const distances = new Map<string, number>();
    const previous = new Map<string, string | null>();
  
    nodes.forEach((node) => {
      distances.set(node.id, Infinity);
      previous.set(node.id, null);
    });
  
    distances.set(startNodeId, 0);
  
    for (let i = 0; i < nodes.length - 1; i++) {
      for (const { source, target, weight } of links) {
        const sourceDistance = distances.get(source) ?? Infinity;
        const targetDistance = distances.get(target) ?? Infinity;
        const newDistance = sourceDistance + (weight ?? 0);
  
        if (newDistance < targetDistance) {
          distances.set(target, newDistance);
          previous.set(target, source);
  
          await updateEdgeFocus(source, target, 'active');
          updateEdgeFocus(source, target, 'completed');
          await updateNodeFocus(target, 'active', newDistance);
        }
      }
    }
  
    // 음수 사이클 체크
    const negativeCycleNodes: string[] = [];
    for (const { source, target, weight } of links) {
        const sourceDistance = distances.get(source) ?? Infinity;
        const newDistance = sourceDistance + (weight ?? 0);

        if (newDistance < (distances.get(target) ?? Infinity)) {
            sendAlert('error', '음수 사이클이 존재합니다.');
            let currentNode = target;

            while (!negativeCycleNodes.includes(currentNode)) {
                negativeCycleNodes.push(currentNode);
                currentNode = previous.get(currentNode)!;
            }

            for (const nodeId of negativeCycleNodes) {
                updateNodeFocus(nodeId, 'error', 0);
            }

            for (let i = 0; i < negativeCycleNodes.length; i++) {
                const nodeId = negativeCycleNodes[i];
                const prevNodeId = previous.get(nodeId);
                if (prevNodeId) {
                    updateEdgeFocus(prevNodeId, nodeId, 'error');
                }
            }

            isRunning.current = false;
            setSeletedNode(null);
            return;
        }
    }

    isRunning.current = false;
    setSeletedNode(null);
  };

  const handleRandomizeGraphData = (numNodes: number) => {
    setSeletedNode(null);
    randomizeGraphDataInWeightAndDirection(numNodes);
  };

  const handleResetGraphData = () => {
    setSeletedNode(null);
    resetGraphData();
  };

  const onclickBtnStart = async () => {
    if(selectedNode) {
      await handleStart(selectedNode.id);
      sendAlert('success', '완료되었습니다.');
    }
    else {
      sendAlert('info', '시작할 노드를 선택해주세요.');
    }
  };

  useEffect(() => {
    return() => {
      resetAlert();
    }
  },[resetAlert]);

  return(
    <Layout subTitle='벨만-포드(Bellman-Ford)'>
      <GraphCanvas 
        nodeGraphDatas={nodeGraphDatas}
        draggingCircle={draggingCircle}
        selectedEdge={selectedEdge}
        isWeighted={true}
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

export default DijkstraPage;
