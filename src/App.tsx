import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './pages/page_home';
import BfsPage from './pages/page_bfs';
import NotFoundPage from './pages/page_notFound';
import SelectionSortPage from './pages/page_selection_sort';
import { ThemeProvider } from './context/themeContext';

const App = () => {
    return (
        <ThemeProvider>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Routes>
                    <Route path="" element={<HomePage />} />
                    <Route path="bfs" element={<BfsPage />} />
                    <Route path="selection_sort" element={<SelectionSortPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
