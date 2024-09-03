import React from 'react';
import Layout from '../../components/layout/layout';
import GraphCanvas from '../../components/graphCanvas/graphCanvas';

const FloydPage: React.FC = () => (
  <Layout subTitle='플로이드(Floyd)'>
    <GraphCanvas />
  </Layout>
);

export default FloydPage;
