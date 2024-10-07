import React from 'react';
import Layout from '../../components/layout/layout';
import ConvexHullCanvas from '../../components/geometry/convexHullCanvas';

const ConvexHullPage: React.FC = () => {
  return (
    <Layout subTitle='볼록껍질(Convex Hull)'>
      <ConvexHullCanvas />
    </Layout>
  );
};

export default ConvexHullPage;
