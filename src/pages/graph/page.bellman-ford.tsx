import React from 'react';
import Layout from '../../components/layout/layout';
import GraphCanvas from '../../components/graphCanvas/graphCanvas';

const BellmanFordPage: React.FC = () => (
  <Layout subTitle='벨만-포드(Bellman-Ford)'>
    <GraphCanvas />
  </Layout>
);

export default BellmanFordPage;
