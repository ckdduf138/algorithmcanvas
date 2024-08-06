import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './pages/page.home';

import SelectionSortPage from './pages/sort/page.selectionSort';
import InsertionSortPage from './pages/sort/page.insertionSort';

import BfsPage from './pages/page.bfs';

import NotFoundPage from './pages/page.notFound';

import { ThemeProvider } from './context/themeContext';

const App = () => {
    return (
        <ThemeProvider>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Routes>
                    <Route path="" element={<HomePage />} />
                    <Route path="selection_sort" element={<SelectionSortPage />} />
                    <Route path="insertion_sort" element={<InsertionSortPage />} />
                    <Route path="bfs" element={<BfsPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
