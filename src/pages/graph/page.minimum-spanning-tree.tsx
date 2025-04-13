import React, { useEffect, useRef, useState } from 'react';

import { useGraphCanvas } from '../../hooks/graph/useGraphCanvas';
import { useGraphCanvasUI } from '../../hooks/graph/useGraphCanvasUI';

import Layout from '../../components/layout/layout';
import GraphCanvas from '../../components/graphCanvas/graphCanvas';

import { EdgeFocusStatus, NodeFocusStatus } from '../../utils/graphData';
import BottomUI from '../../components/graphCanvas/slideUI';
import { useAlert } from '../../context/alertContext';

const MinimumSpanningTreePage: React.FC = () => {
  const [selectAlgorithm, setSelectAlgorithm] = useState('kruskal');

  const [isRunningState, setIsRunnigState] = useState<'play' | 'pause' | 'ready'>('ready');
  const isRunning = useRef<'play' | 'pause' | 'ready'>('ready');
  const delayRef = useRef(500);
  const isPaused = useRef(false);
  const isStopped = useRef(false);

  const { 
    nodeGraphData, setNodeGraphData, setSelectedNode, setSeletedEdge, nodeGraphDatas, draggingCircle, selectedEdge, selectedNode,  draggingEdge, CustomNode, CustomLink, 
    handleMouseDown, handleEdgeClick, ResetData } 
    = useGraphCanvas(isRunning.current, delayRef);

  const { randomizeGraphDataInWeight, resetGraphData } = useGraphCanvasUI(setNodeGraphData);

  const { sendAlert, resetAlert } = useAlert();

  const options = [
    { value: 'kruskal', label: 'kruskal' },
    { value: 'Prim', label: 'Prim' },
  ];

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

  const handleKruskalStart = async () => {
    isRunning.current = 'play';
    setIsRunnigState('play');
    setSeletedEdge(false);
    
    const { nodes, links } = nodeGraphData;
    const parent = new Map<string, string>();
    const rank = new Map<string, number>();

    nodes.forEach((node) => {
      parent.set(node.id, node.id);
      rank.set(node.id, 0);
      updateNodeFocus(node.id, 'inactive');
    });

    const find = (nodeId: string): string => {
      if (parent.get(nodeId) !== nodeId) {
        parent.set(nodeId, find(parent.get(nodeId)!));
      }
      return parent.get(nodeId)!;
    };

    const union = (nodeId1: string, nodeId2: string) => {
      const root1 = find(nodeId1);
      const root2 = find(nodeId2);

      if (root1 !== root2) {
        if (rank.get(root1)! > rank.get(root2)!) {
          parent.set(root2, root1);
        } else if (rank.get(root1)! < rank.get(root2)!) {
          parent.set(root1, root2); 
        } else {
          parent.set(root2, root1);
          rank.set(root1, rank.get(root1)! + 1);
        }
      }
    };

    const sortedLinks = [...links].sort((a, b) => (a.weight ?? 0) - (b.weight ?? 0));

    const mstEdges: { source: string; target: string; weight: number }[] = [];

    for (const { source, target, weight } of sortedLinks) {
      if (isStopped.current) return;

      if (find(source) !== find(target)) {
        mstEdges.push({ source, target, weight: weight ?? 0 });
        union(source, target);

        if (isPaused.current) await new Promise<void>(pauseResume);

        await updateEdgeFocus(source, target, 'active');
        updateEdgeFocus(source, target, 'success');

        if (isPaused.current) await new Promise<void>(pauseResume);

        await updateNodeFocus(source, 'success');

        if (isPaused.current) await new Promise<void>(pauseResume);

        await updateNodeFocus(target, 'success');
      }
    }

    isRunning.current = 'ready';
    setIsRunnigState('ready');

    if (!isStopped.current) sendAlert('success', '완료되었습니다.');
  };

  const handlePrimStart = async (startNodeId: string) => {
    isRunning.current = 'play';
    setIsRunnigState('play');

    const { nodes, links } = nodeGraphData;
    const mstSet = new Set<string>();
    const edgeQueue: { source: string; target: string; weight: number }[] = [];

    const addEdges = (nodeId: string) => {
        links.forEach(({ source, target, weight }) => {
            if (source === nodeId && !mstSet.has(target)) {
                edgeQueue.push({ source, target, weight: weight ?? 0 });
            } else if (target === nodeId && !mstSet.has(source)) {
                edgeQueue.push({ source: target, target: source, weight: weight ?? 0 });
            }
        });
    };

    mstSet.add(startNodeId);
    addEdges(startNodeId);

    while (mstSet.size < nodes.length && edgeQueue.length > 0) {
      if (isStopped.current) return;

      edgeQueue.sort((a, b) => a.weight - b.weight);

      const { source, target } = edgeQueue.shift()!;
      if (!mstSet.has(target)) {
        mstSet.add(target);

        if (isPaused.current) await new Promise<void>(pauseResume);

        await updateEdgeFocus(source, target, 'active');
        updateEdgeFocus(source, target, 'success');

        if (isPaused.current) await new Promise<void>(pauseResume);

        await updateNodeFocus(target, 'success');

        addEdges(target);
      }
    }

    if (isPaused.current) await new Promise<void>(pauseResume);

    await updateNodeFocus(startNodeId, 'success');

    isRunning.current = 'ready';
    setIsRunnigState('ready');

    setSelectedNode(null);

    if (!isStopped.current) sendAlert('success', '완료되었습니다.');
  };

  const handleRandomizeGraphData = (numNodes: number) => {
    setSelectedNode(null);
    randomizeGraphDataInWeight(numNodes);
  };

  const handleResetGraphData = () => {
    setSelectedNode(null);
    resetGraphData();
  };

  const onclickBtnStart = async () => {
    if(selectAlgorithm === 'kruskal') {
      if(isRunning.current === 'ready') {
        ResetData();
        await handleKruskalStart();
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
    else if(selectAlgorithm === 'Prim') {
      if(selectedNode) {

        if(isRunning.current === 'ready') {
          await handlePrimStart(selectedNode.id);
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
    }
  };

  const handleSetAlgorithm = (option: string) => {
    setSelectAlgorithm(option);
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
    <Layout subTitle='최소 신장 트리(Minimum Spanning Tree)'>
      <GraphCanvas 
        nodeGraphDatas={nodeGraphDatas}
        draggingCircle={draggingCircle}
        selectedEdge={selectedEdge}
        isWeighted={true}
        draggingEdge={draggingEdge}
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
        segmentedControl={true}
        options={options}
        selected={selectAlgorithm}
        setOption={handleSetAlgorithm}
        onclickBtnRandom={() => handleRandomizeGraphData(5)}
        onclickBtnReset={handleResetGraphData}
        onclickBtnStart={onclickBtnStart} 
      />
    </Layout>
  )
};

export default MinimumSpanningTreePage;
