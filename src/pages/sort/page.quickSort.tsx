import React, { useRef, useState } from 'react';

import Layout from '../../components/layout/layout';
import { BarGraphData } from '../../utils/graphData';
import { useAdd, useDelay, useRandom, useReset } from '../../hooks/sort/sort';
import BarCanvas from '../../components/barCanvas/barCanvas';
import BarCanvasUI from '../../components/barCanvas/barCanvas.UI';

const QuickSortPage: React.FC = () => {
    const [barGraphData, setBarGraphData] = useState<BarGraphData[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const delayRef = useRef(500);

    const handleAdd = useAdd(setBarGraphData);
    const handleReset = useReset(setBarGraphData);
    const handleRandom = useRandom(setBarGraphData);
    const handleDelay = useDelay(delayRef);
    
    const handleStart = async () => {
        const dataLength = barGraphData.length;

        barGraphData.forEach(data => {
            data.focus = 'inactive';
        });
        setBarGraphData([...barGraphData]);

        await quickSort(barGraphData, 0, dataLength - 1);

        barGraphData.forEach(data => {
            data.focus = 'completed';
        });
        setBarGraphData([...barGraphData]);
    };

    const quickSort = async (array: BarGraphData[], low: number, high: number) => {
        if (low < high) {
            const pi = await partition(array, low, high);

            await quickSort(array, low, pi - 1);

            await quickSort(array, pi + 1, high);
        }
    };

    const partition = async (array: BarGraphData[], low: number, high: number): Promise<number> => {
        const pivotIndex = high;
        const pivotValue = array[pivotIndex].data;

        array[pivotIndex].focus = 'highlight';
        setBarGraphData([...array]);

        await new Promise(resolve => setTimeout(resolve, delayRef.current));

        let i = low - 1;
        for (let j = low; j < high; j++) {
            array[j].focus = 'active';
            setBarGraphData([...array]);

            await new Promise(resolve => setTimeout(resolve, delayRef.current));

            if (sortOrder === 'asc' ? array[j].data <= pivotValue : array[j].data >= pivotValue) {
                i++;
                [array[i].data, array[j].data] = [array[j].data, array[i].data];
                setBarGraphData([...array]);

                array[i].focus = 'completed';
            }

            if(array[j].focus != 'completed') {
                array[j].focus = 'inactive';
            }
            setBarGraphData([...array]);
        }

        [array[i + 1].data, array[pivotIndex].data] = [array[pivotIndex].data, array[i + 1].data];
        array[i + 1].focus = 'completed';
        setBarGraphData([...array]);

        await new Promise(resolve => setTimeout(resolve, delayRef.current));

        return i + 1;
    };

    return (
        <Layout subTitle='퀵정렬'>
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

export default QuickSortPage;
