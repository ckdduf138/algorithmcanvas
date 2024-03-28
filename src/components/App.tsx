// App.tsx
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/page_home/page_home';
import BfsPage from '../pages/page_bfs/page_bfs';

class App extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/bfs" element={<BfsPage />} />
                </Routes>
            </Router>
        );
    }
}

export default App;
