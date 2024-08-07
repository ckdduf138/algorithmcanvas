import React, { useRef, useState } from 'react';

import Layout from '../../components/layout/layout';
import { BarGraphData } from '../../utils/graphData';
import { useAdd, useDelay, useRandom, useReset } from '../../hooks/sort/sort';
import BarCanvas from '../../components/barCanvas/barCanvas';
import BarCanvasUI from '../../components/barCanvas/barCanvas.UI';

const SelectionSortPage = () => {
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
        
        for (let i = 0; i < dataLength; i++) {
            let index = i;

            barGraphData[i].focus = 'highlight';
            setBarGraphData([...barGraphData]);

            for (let j = i + 1; j < dataLength; j++) {
                if (index !== j) {
                    barGraphData[j].focus = 'active';
                    setBarGraphData([...barGraphData]);
                }

                const shouldHighlightAsc = sortOrder === 'asc' && barGraphData[j].data < barGraphData[index].data;
                const shouldHighlightDesc = sortOrder === 'desc' && barGraphData[j].data > barGraphData[index].data;
                
                await new Promise(resolve => setTimeout(resolve, delayRef.current));

                if (shouldHighlightAsc || shouldHighlightDesc) {
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

            await new Promise(resolve => setTimeout(resolve, delayRef.current));

            [barGraphData[i].data, barGraphData[index].data] = [barGraphData[index].data, barGraphData[i].data];

            barGraphData[index].focus = 'inactive';
            barGraphData[i].focus = 'completed';
            setBarGraphData([...barGraphData]);
        }
    };

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
            />
        </Layout>
    );
};

export default SelectionSortPage;
