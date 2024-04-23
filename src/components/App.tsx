import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from '../pages/page_home/page_home';
import BfsPage from '../pages/page_bfs/page_bfs';
import NotFoundPage from '../pages/page_notFound/page_notFound'

class App extends Component {
    render() {
        return (
            <Router basename={process.env.PUBLIC_URL}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="bfs" element={<BfsPage />} />
                    <Route path="*" element={<NotFoundPage />} /> {/* 404 페이지 */}
                </Routes>
            </Router>
        );
    }
}

export default App;
