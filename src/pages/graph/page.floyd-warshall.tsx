import React, { useRef } from 'react';

import { useGraphCanvas } from '../../hooks/graph/useGraphCanvas';
import { useGraphCanvasUI } from '../../hooks/graph/useGraphCanvasUI';

import Layout from '../../components/layout/layout';
import GraphCanvas from '../../components/graphCanvas/graphCanvas';

import { EdgeFocusStatus, NodeFocusStatus } from '../../utils/graphData';
import SlideUI from '../../components/graphCanvas/slideUI';

const FloydWarshallPage: React.FC = () => {
  const isRunning = useRef(false);
  const delayRef = useRef(500);

  const nodeMap = useRef<Map<string, string>>(new Map());

  const { 
    nodeGraphData, setNodeGraphData, setSeletedNode, nodeGraphDatas, draggingCircle, selectedEdge, draggingEdge, CustomNode, CustomLink, 
    handleMouseDown, handleEdgeClick, ResetData } 
    = useGraphCanvas(isRunning, delayRef, true, true);

  const { randomizeGraphDataInWeightAndDirection, resetGraphData } = useGraphCanvasUI(setNodeGraphData);

  const updateNodeFocus = async (nodeId: string, updateState: NodeFocusStatus, nodeText?: string) => {
    setNodeGraphData(prevData => {
      if (!prevData) return prevData;
  
      const updatedNodes = prevData.nodes.map((node) => ({
        ...node,
        focus: node.id === nodeId ? updateState : node.focus,
        text: nodeText !== undefined ? (node.id === nodeId ? nodeText : node.text) : node.text,
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

  const logDistances = (nodes: { id: string; text: string }[], distances: Map<string, Map<string, number>>) => {
    console.table(
      nodes.map(node => {
        const distanceEntries = Array.from(distances.get(node.id)?.entries() || []).reduce((acc, [targetId, weight]) => {
          const targetNodeId = nodes.find(n => n.id === targetId)?.id ?? targetId;
          acc[nodeMap.current.get(targetNodeId) ?? targetId] = weight === Infinity ? '∞' : weight;
          return acc;
        }, {} as Record<string, number | string>);
  
        return { Node: nodeMap.current.get(node.id), ...distanceEntries };
      })
    );
  };

  const getNodeLabel = (index: number) => {
    let label = '';
    while (index >= 0) {
      label = String.fromCharCode((index % 26) + 65) + label;
      index = Math.floor(index / 26) - 1;
    }
    return label;
  };

  const handleStart = async () => {
    isRunning.current = true;

    const { nodes, links } = nodeGraphData;

    nodes.forEach((node, index) => {
      const newText = getNodeLabel(index);
      updateNodeFocus(node.id, 'inactive', newText);
      nodeMap.current.set(node.id, newText);
    });

    const distances = new Map<string, Map<string, number>>();
    const previous = new Map<string, Map<string, string | null>>();
  
    nodes.forEach((node1) => {
      distances.set(node1.id, new Map());
      previous.set(node1.id, new Map());
  
      nodes.forEach((node2) => {
        distances.get(node1.id)?.set(node2.id, node1.id === node2.id ? 0 : Infinity);
        previous.get(node1.id)?.set(node2.id, null);
      });
    });
  
    logDistances(nodes, distances);

    links.forEach(({ source, target, weight }) => {
      distances.get(source)?.set(target, weight ?? Infinity);
      previous.get(source)?.set(target, source);
    });

    for (const k of nodes) {
      for (const i of nodes) {
        for (const j of nodes) {
          const distIK = distances.get(i.id)?.get(k.id) ?? Infinity;
          const distKJ = distances.get(k.id)?.get(j.id) ?? Infinity;
          const distIJ = distances.get(i.id)?.get(j.id) ?? Infinity;
  
          if (distIK + distKJ < distIJ) {
            distances.get(i.id)?.set(j.id, distIK + distKJ);
            previous.get(i.id)?.set(j.id, previous.get(k.id)?.get(j.id) ?? null);
  
            await updateEdgeFocus(i.id, k.id, 'active');
            updateEdgeFocus(i.id, k.id, 'inactive');

            await updateEdgeFocus(k.id, j.id, 'active');
            updateEdgeFocus(k.id, j.id, 'inactive');

            await updateEdgeFocus(i.id, j.id, 'active');
            updateEdgeFocus(i.id, j.id, 'inactive');

            logDistances(nodes, distances);
          }
        }
      }
    }
  
    for (const node of nodes) {
      if ((distances.get(node.id)?.get(node.id) ?? Infinity) < 0) {
        alert("음수 사이클이 존재합니다.");

        updateNodeFocus(node.id, 'error');
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
    ResetData();
    console.clear();

    await handleStart();
  };

  return(
    <Layout subTitle='플로이드-워셜(Floyd-Warshall)'>
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

export default FloydWarshallPage;
