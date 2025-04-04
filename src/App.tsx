import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Cookies from 'js-cookie';

import HomePage from './pages/page.home';

import QueuePage from './pages/dataStructure/page.queue';
import StackPage from './pages/dataStructure/page.stack';
import HeapTreePage from './pages/dataStructure/page.heap-tree';
import LinkedListPage from './pages/dataStructure/page.linked-list';

import SelectionSortPage from './pages/sort/page.selectionSort';
import InsertionSortPage from './pages/sort/page.insertionSort';
import BubbleSortPage from './pages/sort/page.bubbleSort';
import MergeSortPage from './pages/sort/page.mergeSort';
import HeapSortPage from './pages/sort/page.heapSort';
import QuickSortPage from './pages/sort/page.quickSort';

import BFSPage from './pages/graph/page.bfs';
import DFSPage from './pages/graph/page.dfs';
import DijkstraPage from './pages/graph/page.dijkstra';
import BellmanFordPage from './pages/graph/page.bellman-ford';
// import FloydWarshallPage from './pages/graph/page.floyd-warshall';
import MinimumSpanningTreePage from './pages/graph/page.minimum-spanning-tree';

import ConvexHullPage from './pages/geometry/page.convex-hull';

import NotFoundPage from './pages/page.notFound';

import { AlertProvider } from './context/alertContext';
import { ThemeProvider } from './context/themeContext';

import useDeviceCheck from './hooks/useDeviceCheck';
import CustomAlert from './components/alert/customAlert';
import Modal from './components/modal/modal';

const App = () => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const deviceType = useDeviceCheck();

    useEffect(() => {
        const hasVisited = Cookies.get('hasVisited');

        if (!hasVisited) {
            setIsModalVisible(true);
            Cookies.set('hasVisited', 'true', { expires: 100 });
        }

        if (deviceType !== 'desktop') {
            alert('이 웹사이트는 PC에 최적화되어 있습니다. PC에서 확인해 주시기 바랍니다.');
        }
    }, [deviceType]);

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    return (
        <ThemeProvider>
            <AlertProvider>
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                    <CustomAlert />
                    <Routes>
                        {/* Root */}
                        <Route path="/" element={<HomePage />} />

                        {/* 자료구조 */}
                        <Route path="queue" element={<QueuePage />} />
                        <Route path="stack" element={<StackPage />} />
                        <Route path="heap-tree" element={<HeapTreePage />} />
                        <Route path="linked-list" element={<LinkedListPage />} />
                        
                        {/* 정렬 */}
                        <Route path="selection-sort" element={<SelectionSortPage />} />
                        <Route path="insertion-sort" element={<InsertionSortPage />} />
                        <Route path="bubble-sort" element={<BubbleSortPage />} />
                        <Route path="merge-sort" element={<MergeSortPage />} />
                        <Route path="heap-sort" element={<HeapSortPage />} />
                        <Route path="quick-sort" element={<QuickSortPage />} />

                        {/* 그래프 */}
                        <Route path="bfs" element={<BFSPage />} />
                        <Route path="dfs" element={<DFSPage />} />
                        <Route path="dijkstra" element={<DijkstraPage />} />
                        <Route path="bellman-ford" element={<BellmanFordPage />} />
                        {/* <Route path="floyd-warshall" element={<FloydWarshallPage />} /> */}
                        <Route path="minimum-spanning-tree" element={<MinimumSpanningTreePage />} />

                        {/* 기하학 */}
                        <Route path="convex-hull" element={<ConvexHullPage />} />

                        {/* Github Pages 예외 */}
                        <Route path="index" element={<Navigate to="/" />} />

                        {/* 404 */}
                        <Route path="404" element={<NotFoundPage />} />
                        <Route path="*" element={<Navigate to="404" />} />
                    </Routes>

                    {/* 모달창 표시 */}
                    {isModalVisible && <Modal onClose={handleCloseModal} />}

                </BrowserRouter>
            </AlertProvider>
        </ThemeProvider>
    );
};

export default App;
