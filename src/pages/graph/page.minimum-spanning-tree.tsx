import React, { useRef, useState } from 'react';

import { useGraphCanvas } from '../../hooks/graph/useGraphCanvas';
import { useGraphCanvasUI } from '../../hooks/graph/useGraphCanvasUI';

import Layout from '../../components/layout/layout';
import GraphCanvas from '../../components/graphCanvas/graphCanvas';

import { EdgeFocusStatus, NodeFocusStatus } from '../../utils/graphData';
import SlideUI from '../../components/graphCanvas/slideUI';

const MinimumSpanningTreePage: React.FC = () => {
  const [selectAlgorithm, setSelectAlgorithm] = useState('kruskal');
  const isRunning = useRef(false);
  const delayRef = useRef(500);

  const { 
    nodeGraphData, setNodeGraphData, setSeletedNode, nodeGraphDatas, draggingCircle, selectedEdge, selectedNode,  draggingEdge, CustomNode, CustomLink, 
    handleMouseDown, handleEdgeClick, ResetData } 
    = useGraphCanvas(isRunning, delayRef);

  const { randomizeGraphDataInWeight, resetGraphData } = useGraphCanvasUI(setNodeGraphData);

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
    isRunning.current = true;

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
        if (find(source) !== find(target)) {
            mstEdges.push({ source, target, weight: weight ?? 0 });
            union(source, target);

            await updateEdgeFocus(source, target, 'active');
            updateEdgeFocus(source, target, 'success');

            await updateNodeFocus(source, 'success');
            await updateNodeFocus(target, 'success');
        }
    }

    isRunning.current = false;
    setSeletedNode(null);
  };

  const handlePrimStart = async (startNodeId: string) => {
    isRunning.current = true;

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
        edgeQueue.sort((a, b) => a.weight - b.weight);

        const { source, target } = edgeQueue.shift()!;
        if (!mstSet.has(target)) {
            mstSet.add(target);

            await updateEdgeFocus(source, target, 'active');
            updateEdgeFocus(source, target, 'success');

            await updateNodeFocus(target, 'success');

            addEdges(target);
        }
    }

    await updateNodeFocus(startNodeId, 'success');

    isRunning.current = false;
    setSeletedNode(null);
};


  const handleRandomizeGraphData = (numNodes: number) => {
    setSeletedNode(null);
    randomizeGraphDataInWeight(numNodes);
  };

  const handleResetGraphData = () => {
    setSeletedNode(null);
    resetGraphData();
  };

  const onclickBtnStart = async () => {
    if(selectAlgorithm === 'kruskal') {
      ResetData();
      await handleKruskalStart();
    }
    else if('Prim') {
      if(selectedNode) {
        await handlePrimStart(selectedNode.id);
      }
      else {
        alert('시작할 노드를 선택해주세요.');
      }
    }
  };

  const handleSetAlgorithm = (option: string) => {
    setSelectAlgorithm(option);
  };

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
        isRunning={isRunning}
        handleMouseDown={handleMouseDown}
        handleEdgeClick={handleEdgeClick}
      />

      {/* UI */}
      <SlideUI 
        dataSize={nodeGraphDatas.nodes.length}
        isRunning={isRunning}
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
