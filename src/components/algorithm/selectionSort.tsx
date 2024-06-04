import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import BarCanvasUI from '../barCanvas/barCanvas.UI';
import BarCanvas from '../barCanvas/barCanvas';
import { BarGraphData } from '../../utils/Data';

const StyleCanvasMain = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const StyleCanvasUI = styled.div`
    width: 100%;
    height: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1%;
    position: relative;
`;

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

    const handleStart = async () => {
        const dataLength = barGraphData.length;
        const sortedData = [...barGraphData];

        sortedData.forEach(data => {
            data.focus = 'inactive';
        });
        
        for (let i = 0; i < dataLength; i++) {
            let index = i;

            if (sortedData[i].focus !== 'completed') {
                sortedData[i].focus = 'active';
                setBarGraphData([...sortedData]);
            }

            for (let j = i + 1; j < dataLength; j++) {
                sortedData[j].focus = 'active';
                setBarGraphData([...sortedData]);

                if (sortOrder === 'asc' && sortedData[j].data < sortedData[index].data) {
                    index = j;
                } else if (sortOrder === 'desc' && sortedData[j].data > sortedData[index].data) {
                    index = j;
                }

                await new Promise(resolve => setTimeout(resolve, delayRef.current));

                sortedData[j].focus = 'inactive';
                setBarGraphData([...sortedData]);
            }

            if (index !== i) {
                const temp = sortedData[i].data;
                sortedData[i].data = sortedData[index].data;
                sortedData[index].data = temp;
            }

            sortedData[i].focus = 'completed';
            setBarGraphData([...sortedData]);
            
            await new Promise(resolve => setTimeout(resolve, delayRef.current));
        }
    };

    const handleDelay = (delay: number) => {
        setDelay(100 / delay);
    };

    return (
        <>
            <StyleCanvasMain>
                <BarCanvas barGraphData={barGraphData} />
            </StyleCanvasMain>
            <StyleCanvasUI>
                <BarCanvasUI handleAdd={handleAdd} handleReset={handleReset} setSortOrder={setSortOrder} handleStart={handleStart} handleDelay={handleDelay} />
            </StyleCanvasUI>
        </>
    );
};

export default SelectionSortCanvas;
