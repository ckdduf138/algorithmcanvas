import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Layout from './components/layout/layout';
import Home from './pages/home/home';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Layout>
    <Home />
  </Layout>
);
