import React from 'react';
import Layout from '../../components/layout/layout';
import GraphCanvas from '../../components/graphCanvas/graphCanvas';

const DijkstraPage: React.FC = () => (
  <Layout subTitle='다익스트라(Dijkstra)'>
    <GraphCanvas />
  </Layout>
);

export default DijkstraPage;
