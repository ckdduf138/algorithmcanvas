import React, { useEffect, useRef, useState } from 'react';

import Layout from '../../components/layout/layout';
import { BarGraphData } from '../../utils/graphData';
import { useAdd, useDelay, useRandom, useReset } from '../../hooks/sort/sort';
import BarCanvas from '../../components/barCanvas/barCanvas';
import BarCanvasUI from '../../components/barCanvas/barCanvas.UI';
import { useAlert } from '../../context/alertContext';

const InsertionSortPage: React.FC = () => {
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

        for (let i = 0; i < dataLength; i++) {
            if (isStopped.current) return;
            
            barGraphData.forEach(data => {
                data.focus = 'inactive';
            });
            setBarGraphData([...barGraphData]);
            
            let j = i;
            barGraphData[i].focus = 'active';
            setBarGraphData([...barGraphData]);

            if (isPaused.current) await new Promise<void>(pauseResume);
            await new Promise(resolve => setTimeout(resolve, delayRef.current));

            while (j > 0) {
                if (isStopped.current) return;

                barGraphData[j - 1].focus = 'active';
                setBarGraphData([...barGraphData]);

                const shouldSwapAsc = sortOrder === 'asc' && barGraphData[j].data < barGraphData[j - 1].data;
                const shouldSwapDesc = sortOrder === 'desc' && barGraphData[j].data > barGraphData[j - 1].data;

                if (isPaused.current) await new Promise<void>(pauseResume);
                await new Promise(resolve => setTimeout(resolve, delayRef.current));

                if (shouldSwapAsc || shouldSwapDesc) {
                    [barGraphData[j].data, barGraphData[j - 1].data] = [barGraphData[j - 1].data, barGraphData[j].data];
                    
                    barGraphData[j].focus = 'inactive';
                    barGraphData[j - 1].focus = 'active';
                    setBarGraphData([...barGraphData]);

                    j--;
                } else {
                    barGraphData[j - 1].focus = 'active';
                    setBarGraphData([...barGraphData]);
                    break;
                }

                if (isPaused.current) await new Promise<void>(pauseResume);
                await new Promise(resolve => setTimeout(resolve, delayRef.current));
            }
        }

        barGraphData.forEach(data => {
            data.focus = 'completed';
        });
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
        <Layout subTitle='삽입정렬'>
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

export default InsertionSortPage;
