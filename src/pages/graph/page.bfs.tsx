import React, { useRef, useState } from 'react';
import Layout from '../../components/layout/layout';
import GraphCanvas from '../../components/graphCanvas/graphCanvas';
import { Node, NodeGraphData } from '../../utils/graphData';
import { useDelay } from '../../hooks/sort/sort';
import GraphCanvasUI from '../../components/graphCanvas/graphCanvas.UI';

const BFSPage: React.FC = () => {
  const [nodeGraphData, setNodeGraphData] = useState<NodeGraphData[]>([]);

  const handleDrop = (circle: { cx: number, cy: number, r: number }) => {
    const newNode: Node = {
      id: Date.now().toString(),
      x: circle.cx,
      y: circle.cy,
      r: circle.r,
    };

    const newData: NodeGraphData = {node: newNode, focus: 'inactive'};

    setNodeGraphData((prevData) => [
      ...prevData, newData]);
  };

  const handleStart = async () => {
    // Start logic for BFS
  };
  
  return(
    <Layout subTitle='너비 우선 탐색(BFS)'>
      <GraphCanvas nodeGraphData={nodeGraphData} handleDrop={handleDrop} />
    </Layout>
  )
};

export default BFSPage;
