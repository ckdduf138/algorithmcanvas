import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Layout from './components/layout/layout';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Layout>
    <div>메인</div>
  </Layout>
);
