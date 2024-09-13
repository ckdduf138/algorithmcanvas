import React, { useState } from 'react';
import Layout from '../../components/layout/layout';
import GraphCanvas from '../../components/graphCanvas/graphCanvas';
import { Link, Node, NodeGraphData } from '../../utils/graphData';

const BFSPage: React.FC = () => {

  const handleStart = async () => {
    // Start logic for BFS
  };
  
  return(
    <Layout subTitle='너비 우선 탐색(BFS)'>
      <GraphCanvas />
    </Layout>
  )
};

export default BFSPage;
