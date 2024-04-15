import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/page_home';
import BfsPage from './pages/page_bfs';
import NotFoundPage from './pages/page_notFound';

const App = () => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="" element={<HomePage />} />
                <Route path="bfs" element={<BfsPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter >
    );
};

export default App;
