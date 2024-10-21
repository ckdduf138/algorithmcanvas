import React, { useEffect, useRef, useState } from 'react';

import Layout from '../../components/layout/layout';
import { BarGraphData } from '../../utils/graphData';
import { useAdd, useDelay, useRandom, useReset } from '../../hooks/sort/sort';
import BarCanvas from '../../components/barCanvas/barCanvas';
import BarCanvasUI from '../../components/barCanvas/barCanvas.UI';
import { useAlert } from '../../context/alertContext';

const MergeSortPage: React.FC = () => {
    const [barGraphData, setBarGraphData] = useState<BarGraphData[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const delayRef = useRef(500);

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

        await mergeSort(barGraphData, 0, dataLength - 1);

        barGraphData.forEach(data => {
            data.focus = 'completed';
        });
        setBarGraphData([...barGraphData]);

        sendAlert('success', '완료되었습니다.');
    };

    const mergeSort = async (array: BarGraphData[], start: number, end: number) => {
        if (start >= end) return;

        const mid = Math.floor((start + end) / 2);

        await mergeSort(array, start, mid);

        await mergeSort(array, mid + 1, end);

        await merge(array, start, mid, end);
    };

    const merge = async (array: BarGraphData[], start: number, mid: number, end: number) => {
        const leftArray = array.slice(start, mid + 1);
        const rightArray = array.slice(mid + 1, end + 1);
    
        let i = 0, j = 0, k = start;
    
        array.slice(start, end + 1).forEach((data) => {
            data.focus = 'active';
        });
        setBarGraphData([...array]);
    
        while (i < leftArray.length && j < rightArray.length) {
            array[k].focus = 'highlight';
            setBarGraphData([...array]);
    
            await new Promise(resolve => setTimeout(resolve, delayRef.current));
    
            if (sortOrder === 'asc' ? leftArray[i].data <= rightArray[j].data : leftArray[i].data >= rightArray[j].data) {
                array[k] = { ...leftArray[i] };  // 전체 객체를 복사
                i++;
            } else {
                array[k] = { ...rightArray[j] };  // 전체 객체를 복사
                j++;
            }
    
            array[k].focus = 'completed';
            setBarGraphData([...array]);
    
            k++;
            await new Promise(resolve => setTimeout(resolve, delayRef.current));
        }
    
        while (i < leftArray.length) {
            array[k] = { ...leftArray[i] };  // 전체 객체 복사
            array[k].focus = 'completed';
            i++;
            k++;
            setBarGraphData([...array]);
            await new Promise(resolve => setTimeout(resolve, delayRef.current));
        }
    
        while (j < rightArray.length) {
            array[k] = { ...rightArray[j] };  // 전체 객체 복사
            array[k].focus = 'completed';
            j++;
            k++;
            setBarGraphData([...array]);
            await new Promise(resolve => setTimeout(resolve, delayRef.current));
        }
    
        array.slice(start, end + 1).forEach((data) => {
            data.focus = 'inactive';
        });
        setBarGraphData([...array]);
    };

    useEffect(() => {
        return() => {
            resetAlert();
        }
    },[resetAlert]);

    return (
        <Layout subTitle='병합정렬'>
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

export default MergeSortPage;
