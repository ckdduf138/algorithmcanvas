import React, { useEffect, useRef, useState } from 'react';

import Layout from '../../components/layout/layout';
import { BarGraphData } from '../../utils/graphData';
import { useAdd, useDelay, useRandom, useReset } from '../../hooks/sort/sort';
import BarCanvas from '../../components/barCanvas/barCanvas';
import BarCanvasUI from '../../components/barCanvas/barCanvas.UI';
import { useAlert } from '../../context/alertContext';

const QuickSortPage: React.FC = () => {
    const [barGraphData, setBarGraphData] = useState<BarGraphData[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const delayRef = useRef(500);
    const isPaused = useRef(false);
    const isStopped = useRef(false);

    const handleAdd = useAdd(setBarGraphData);
    const handleReset = useReset(setBarGraphData);
    const handleRandom = useRandom(setBarGraphData);
    const handleDelay = useDelay(delayRef);
    
    const { sendAlert, resetAlert } = useAlert();

    const handleStart = async () => {
        const dataLength = barGraphData.length;

        barGraphData.forEach(data => {
            data.focus = 'inactive';
        });
        setBarGraphData([...barGraphData]);

        console.log(isStopped.current);
        if (isStopped.current) return;

        await quickSort(barGraphData, 0, dataLength - 1);

        barGraphData.forEach(data => {
            data.focus = 'completed';
        });
        setBarGraphData([...barGraphData]);

        if (!isStopped.current) sendAlert('success', '완료되었습니다.');
    };

    const quickSort = async (array: BarGraphData[], low: number, high: number) => {
        if (low < high) {
            if (isStopped.current) return;

            const pi = await partition(array, low, high);

            if (isStopped.current) return;

            await quickSort(array, low, pi - 1);

            await quickSort(array, pi + 1, high);
        }
    };

    const partition = async (array: BarGraphData[], low: number, high: number): Promise<number> => {
        const pivotIndex = high;
        const pivotValue = array[pivotIndex].data;

        array[pivotIndex].focus = 'highlight';
        setBarGraphData([...array]);

        if (isPaused.current) await new Promise<void>(pauseResume);
        await new Promise(resolve => setTimeout(resolve, delayRef.current));

        let i = low - 1;
        for (let j = low; j < high; j++) {
            if (isStopped.current) break;

            array[j].focus = 'active';
            setBarGraphData([...array]);

            if (isPaused.current) await new Promise<void>(pauseResume);
            await new Promise(resolve => setTimeout(resolve, delayRef.current));

            if (sortOrder === 'asc' ? array[j].data <= pivotValue : array[j].data >= pivotValue) {
                i++;
                [array[i].data, array[j].data] = [array[j].data, array[i].data];
                setBarGraphData([...array]);

                array[i].focus = 'completed';
            }

            if(array[j].focus !== 'completed') {
                array[j].focus = 'inactive';
            }
            setBarGraphData([...array]);
        }

        [array[i + 1].data, array[pivotIndex].data] = [array[pivotIndex].data, array[i + 1].data];
        array[i + 1].focus = 'completed';
        setBarGraphData([...array]);

        if (isPaused.current) await new Promise<void>(pauseResume);
        await new Promise(resolve => setTimeout(resolve, delayRef.current));

        return i + 1;
    };

    const pauseResume = (resolve: () => void) => {
        const checkPaused = () => {
            if (!isPaused.current) {
                resolve();
            } else {
                requestAnimationFrame(checkPaused);
            }
        };
        checkPaused();
    };

    const handlePause = () => {
        isPaused.current = true;
    };

    const handleResume = () => {
        isPaused.current = false;
    };

    const handleStop = () => {
        isStopped.current = true;
        isPaused.current = false;
    };

    useEffect(() => {
        return() => {
            handleStop();
            resetAlert();
        }
    },[resetAlert]);

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
                handlePause={handlePause}
                handleResume={handleResume}
            />
        </Layout>
    );
};

export default QuickSortPage;
