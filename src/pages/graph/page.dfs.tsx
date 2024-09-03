import React from 'react';
import Layout from '../../components/layout/layout';
import GraphCanvas from '../../components/graphCanvas/graphCanvas';

const DFSPage: React.FC = () => (
  <Layout subTitle='깊이 우선 탐색(DFS)'>
    <GraphCanvas />
  </Layout>
);

export default DFSPage;
