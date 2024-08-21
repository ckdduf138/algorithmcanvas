import React, { useRef, useState } from 'react';

import Layout from '../../components/layout/layout';
import { BarGraphData } from '../../utils/graphData';
import { useAdd, useDelay, useRandom, useReset } from '../../hooks/sort/sort';
import BarCanvas from '../../components/barCanvas/barCanvas';
import BarCanvasUI from '../../components/barCanvas/barCanvas.UI';

const BubbleSortPage: React.FC = () => {
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
    
        for (let i = 0; i < dataLength - 1; i++) {
            for (let j = 0; j < dataLength - 1 - i; j++) {
                barGraphData[j].focus = 'active';
                barGraphData[j + 1].focus = 'active';
                setBarGraphData([...barGraphData]);
    
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
    
            await new Promise(resolve => setTimeout(resolve, delayRef.current));
    
            barGraphData[dataLength - 1 - i].focus = 'completed';
            setBarGraphData([...barGraphData]);
        }
    
        barGraphData[0].focus = 'completed';
        setBarGraphData([...barGraphData]);
    };

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
            />
        </Layout>
    );
};

export default BubbleSortPage;
