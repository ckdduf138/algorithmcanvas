import React from 'react';
import Layout from '../../components/layout/layout';
import GraphCanvas from '../../components/graphCanvas/graphCanvas';

const BFSPage: React.FC = () => {
  
  return(
    <Layout subTitle='너비 우선 탐색(BFS)'>
      <GraphCanvas />
    </Layout>
  )
};

export default BFSPage;
