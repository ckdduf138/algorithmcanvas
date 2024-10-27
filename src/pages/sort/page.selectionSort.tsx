import React, { useEffect, useRef, useState } from 'react';

import Layout from '../../components/layout/layout';
import { BarGraphData } from '../../utils/graphData';
import { useAdd, useDelay, useRandom, useReset } from '../../hooks/sort/sort';
import BarCanvas from '../../components/barCanvas/barCanvas';
import BarCanvasUI from '../../components/barCanvas/barCanvas.UI';
import { useAlert } from '../../context/alertContext';

const SelectionSortPage: React.FC = () => {
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
        isPaused.current = false;
        isStopped.current = false;

        const dataLength = barGraphData.length;

        barGraphData.forEach(data => {
            data.focus = 'inactive';
        });
        setBarGraphData([...barGraphData]);
        
        for (let i = 0; i < dataLength; i++) {
            if (isStopped.current) break;

            let index = i;
            barGraphData[i].focus = 'highlight';
            setBarGraphData([...barGraphData]);

            for (let j = i + 1; j < dataLength; j++) {
                if (isStopped.current) break;

                if (index !== j) {
                    barGraphData[j].focus = 'active';
                    setBarGraphData([...barGraphData]);
                }

                const shouldSwapAsc = sortOrder === 'asc' && barGraphData[j].data < barGraphData[index].data;
                const shouldSwapDesc = sortOrder === 'desc' && barGraphData[j].data > barGraphData[index].data;
                
                if (isPaused.current) await new Promise<void>(pauseResume);
                await new Promise(resolve => setTimeout(resolve, delayRef.current));

                if (shouldSwapAsc || shouldSwapDesc) {
                    barGraphData[index].focus = 'inactive';
                    barGraphData[i].focus = 'active';
                    barGraphData[j].focus = 'highlight';
                    setBarGraphData([...barGraphData]);

                    index = j;
                } else {
                    barGraphData[j].focus = 'inactive';
                    setBarGraphData([...barGraphData]);
                }
            }

            if (isStopped.current) break;
            
            if (isPaused.current) await new Promise<void>(pauseResume);
            await new Promise(resolve => setTimeout(resolve, delayRef.current));

            [barGraphData[i].data, barGraphData[index].data] = [barGraphData[index].data, barGraphData[i].data];

            barGraphData[index].focus = 'inactive';
            barGraphData[i].focus = 'completed';
            setBarGraphData([...barGraphData]);
        }

        if (!isStopped.current) sendAlert('success', '완료되었습니다.');
    };

    const pauseResume = (resolve: () => void) => {
        const interval = setInterval(() => {
            if (!isPaused.current) {
                clearInterval(interval);
                resolve();
            }
        }, 100);
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
        return () => {
            handleStop();
            resetAlert();
        };
    }, [resetAlert]);

    return (
        <Layout subTitle='선택정렬'>
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
                handleStop={handleStop}
            />
        </Layout>
    );
};

export default SelectionSortPage;
