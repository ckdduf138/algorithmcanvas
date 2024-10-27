import React, { useEffect, useRef, useState } from 'react';

import Layout from '../../components/layout/layout';
import { BarGraphData } from '../../utils/graphData';
import { useAdd, useDelay, useRandom, useReset } from '../../hooks/sort/sort';
import BarCanvas from '../../components/barCanvas/barCanvas';
import BarCanvasUI from '../../components/barCanvas/barCanvas.UI';
import { useAlert } from '../../context/alertContext';

const BubbleSortPage: React.FC = () => {
    const [barGraphData, setBarGraphData] = useState<BarGraphData[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const delayRef = useRef(500);
    const isPaused = useRef(false);
    const isStopped = useRef(false);

    const { sendAlert, resetAlert } = useAlert();

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
    
        for (let i = 0; i < dataLength - 1; i++) {
            for (let j = 0; j < dataLength - 1 - i; j++) {
                if (isStopped.current) return;

                barGraphData[j].focus = 'active';
                barGraphData[j + 1].focus = 'active';
                setBarGraphData([...barGraphData]);
    
                if (isPaused.current) await new Promise<void>(pauseResume);
                await new Promise(resolve => setTimeout(resolve, delayRef.current));
    
                const shouldSwapAsc = sortOrder === 'asc' && barGraphData[j].data > barGraphData[j + 1].data;
                const shouldSwapDesc = sortOrder === 'desc' && barGraphData[j].data < barGraphData[j + 1].data;
    
                if (shouldSwapAsc || shouldSwapDesc) {
                    [barGraphData[j].data, barGraphData[j + 1].data] = [barGraphData[j + 1].data, barGraphData[j].data];
                    setBarGraphData([...barGraphData]);
                }
                barGraphData[j].focus = 'inactive';
                barGraphData[j + 1].focus = 'inactive';
                setBarGraphData([...barGraphData]);
            }
    
            if (isStopped.current) return;
            
            if (isPaused.current) await new Promise<void>(pauseResume);
            await new Promise(resolve => setTimeout(resolve, delayRef.current));
    
            barGraphData[dataLength - 1 - i].focus = 'completed';
            setBarGraphData([...barGraphData]);
        }
    
        barGraphData[0].focus = 'completed';
        setBarGraphData([...barGraphData]);

        if (!isStopped.current) sendAlert('success', '완료되었습니다.');
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
        <Layout subTitle='버블정렬'>
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

export default BubbleSortPage;
