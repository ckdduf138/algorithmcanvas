import React, { useRef, useState } from 'react';

import Layout from '../../components/layout/layout';
import { BarGraphData } from '../../utils/graphData';
import { useAdd, useDelay, useRandom, useReset } from '../../hooks/sort/sort';
import BarCanvas from '../../components/barCanvas/barCanvas';
import BarCanvasUI from '../../components/barCanvas/barCanvas.UI';

const HeapSortPage: React.FC = () => {
    const [barGraphData, setBarGraphData] = useState<BarGraphData[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const delayRef = useRef(500);

    const handleAdd = useAdd(setBarGraphData);
    const handleReset = useReset(setBarGraphData);
    const handleRandom = useRandom(setBarGraphData);
    const handleDelay = useDelay(delayRef);
    
    const handleStart = async () => {
        barGraphData.forEach(data => {
            data.focus = 'inactive';
        });
        setBarGraphData([...barGraphData]);

        await heapSort(barGraphData);

        barGraphData.forEach(data => {
            data.focus = 'completed';
        });
        setBarGraphData([...barGraphData]);
    };

    const heapSort = async (array: BarGraphData[]) => {
        const n = array.length;

        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            await heapify(array, n, i);
        }

        for (let i = n - 1; i > 0; i--) {
            [array[0].data, array[i].data] = [array[i].data, array[0].data];
            array[i].focus = 'completed';
            setBarGraphData([...array]);

            await new Promise(resolve => setTimeout(resolve, delayRef.current));

            await heapify(array, i, 0);
        }

        array[0].focus = 'completed';
        setBarGraphData([...array]);
    };

    const heapify = async (array: BarGraphData[], n: number, i: number) => {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        array[i].focus = 'active';
        setBarGraphData([...array]);

        await new Promise(resolve => setTimeout(resolve, delayRef.current));

        if (left < n && (sortOrder === 'asc' ? array[left].data > array[largest].data : array[left].data < array[largest].data)) {
            largest = left;
        }

        if (right < n && (sortOrder === 'asc' ? array[right].data > array[largest].data : array[right].data < array[largest].data)) {
            largest = right;
        }

        if (largest !== i) {
            [array[i].data, array[largest].data] = [array[largest].data, array[i].data];
            array[largest].focus = 'completed';
            setBarGraphData([...array]);

            await new Promise(resolve => setTimeout(resolve, delayRef.current));

            await heapify(array, n, largest);
        }

        array[i].focus = 'inactive';
        setBarGraphData([...array]);
    };

    return (
        <Layout subTitle='힙정렬'>
            <BarCanvas barGraphData={barGraphData} />
            <BarCanvasUI
                handleAdd={handleAdd}
                handleReset={handleReset}
                handleRandom={handleRandom}
                setSortOrder={setSortOrder}
                handleStart={handleStart}
                handleDelay={handleDelay}
            />
        </Layout>
    );
};

export default HeapSortPage;
