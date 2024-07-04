import React, { useEffect, useRef, useState } from 'react';

import BarCanvasUI from '../barCanvas/barCanvas.UI';
import BarCanvas from '../barCanvas/barCanvas';
import { BarGraphData } from '../../utils/graphData';
import { generateRandomNumbers } from '../../utils/common';

const SelectionSortCanvas: React.FC = () => {
    const [barGraphData, setBarGraphData] = useState<BarGraphData[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [delay, setDelay] = useState<number>(500);
    const delayRef = useRef(delay);

    useEffect(() => {
        delayRef.current = delay;
    }, [delay]);

    const handleAdd = (inputValue: string) => {
        const newValue: BarGraphData = {
            data: parseInt(inputValue),
            focus: 'inactive'
        };
        setBarGraphData(prevData => [...prevData, newValue]);
    };

    const handleReset = () => {
        setBarGraphData([]);
    };

    const handleRandom = () => {
        const randomValues: number[] = generateRandomNumbers(0, 100, 20);
        
        const randomData: BarGraphData[] = randomValues.map((value) => ({
            data: value,
            focus: 'inactive'
        }));

        setBarGraphData(randomData);
    };

    const handleStart = async () => {
        const dataLength = barGraphData.length;

        barGraphData.forEach(data => {
            data.focus = 'inactive';
        });
        
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
                }
                else
                {
                    barGraphData[j].focus = 'inactive';
                    setBarGraphData([...barGraphData]);
                }
            }

            await new Promise(resolve => setTimeout(resolve, delayRef.current));

            if (index !== i) {
                const temp = barGraphData[i].data;
                barGraphData[i].data = barGraphData[index].data;
                barGraphData[index].data = temp;
            }

            barGraphData[index].focus = 'inactive';
            barGraphData[i].focus = 'completed';
            setBarGraphData([...barGraphData]);
        }
    };

    const handleDelay = (delay: number) => {
        setDelay(100 / delay);
    };

    return (
        <>
            <BarCanvas barGraphData={barGraphData} />
            <BarCanvasUI
                handleAdd={handleAdd}
                handleReset={handleReset}
                handleRandom={handleRandom}
                setSortOrder={setSortOrder}
                handleStart={handleStart}
                handleDelay={handleDelay}
            />
        </>
    );
};

export default SelectionSortCanvas;
