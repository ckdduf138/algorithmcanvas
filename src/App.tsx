import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './pages/page.home';

import SelectionSortPage from './pages/sort/page.selectionSort';
import InsertionSortPage from './pages/sort/page.insertionSort';
import BubbleSortPage from './pages/sort/page.bubbleSort';
import MergeSortPage from './pages/sort/page.mergeSort';
import HeapSortPage from './pages/sort/page.heapSort';
import QuickSortPage from './pages/sort/page.quickSort';

import BFSPage from './pages/graph/page.bfs';

import NotFoundPage from './pages/page.notFound';

import { ThemeProvider } from './context/themeContext';

const App = () => {
    return (
        <ThemeProvider>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Routes>
                    {/* Root */}
                    <Route path="" element={<HomePage />} />

                    {/* 정렬 */}
                    <Route path="selection_sort" element={<SelectionSortPage />} />
                    <Route path="insertion_sort" element={<InsertionSortPage />} />
                    <Route path="bubble_sort" element={<BubbleSortPage />} />
                    <Route path="merge_sort" element={<MergeSortPage />} />
                    <Route path="heap_sort" element={<HeapSortPage />} />
                    <Route path="quick_sort" element={<QuickSortPage />} />

                    {/* 그래프 */}
                    <Route path="bfs" element={<BFSPage />} />
                    
                    {/* 404 */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
