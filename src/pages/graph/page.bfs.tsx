import React, { useRef, useState } from 'react';
import Layout from '../../components/layout/layout';
import GraphCanvas from '../../components/graphCanvas/graphCanvas';
import { useGraphCanvas } from '../../hooks/graph/useGraphCanvas';
import { NodeFocusStatus } from '../../utils/graphData';

const BFSPage: React.FC = () => {
  const isRunning = useRef(false);
  const delayRef = useRef(500);

  const [renderState, setRenderState] = useState(false);

  const { 
    nodeGraphData, setNodeGraphData,  nodeGraphDatas, draggingCircle, selectedEdge, selectedNode,  draggingEdge, CustomNode, CustomLink, 
    handleMouseDown, handleEdgeClick, handleRandomizeGraphData, handleResetGraphData } 
    = useGraphCanvas(isRunning);

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

    const handleStart = async (startNodeId: string) => {
      isRunning.current = true;

      const { nodes, links } = nodeGraphData;
    
      // 1. 각 노드의 방문 여부를 저장할 맵 (id -> boolean)
      const visited = new Map<string, boolean>();
      nodes.forEach((node) => visited.set(node.id, false));
    
      // 2. 큐(Queue) 초기화 및 시작 노드 추가
      const queue: string[] = [startNodeId];
      visited.set(startNodeId, true);
    
      // 3. Initialize node focus states
      await updateNodeFocus(startNodeId, 'selected');
    
      while (queue.length > 0) {
        const currentNodeId = queue.shift(); // 큐에서 현재 노드를 꺼냄
    
        const currentNode = nodes.find((node) => node.id === currentNodeId);
        if (currentNode) {
          console.log(`탐색 중: ${currentNode.text} (ID: ${currentNode.id})`);
          await updateNodeFocus(currentNode.id, 'active');
        }
    
        // 현재 노드와 연결된 인접 노드 탐색
        const neighbors = links
          .filter((link) => link.source === currentNodeId || link.target === currentNodeId)
          .map((link) => (link.source === currentNodeId ? link.target : link.source));
    
        // 인접 노드를 큐에 추가 (방문하지 않은 노드만)
        const newlyHighlightedNodes: string[] = [];
        for (const neighborId of neighbors) {
          if (!visited.get(neighborId)) {
            visited.set(neighborId, true);
            queue.push(neighborId);
            newlyHighlightedNodes.push(neighborId);

            await updateNodeFocus(neighborId, 'highlight');
          }
        }

        if (currentNode) {
          await updateNodeFocus(currentNode.id, 'completed');
        }
      }
    
      isRunning.current = false;
      setRenderState((prev) => !prev); 
      console.log("BFS 완료");
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
