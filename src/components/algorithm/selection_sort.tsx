import React, { useState } from 'react';
import styled from 'styled-components';
import BarCanvas from '../barCanvas/barCanvas';
import { useWindowSize } from '../../hooks/getWindowSize';
import InputForm from '../barCanvas/barInput';
import { BarGraphData } from '../../utils/Data';

const StyleCanvasMain = styled.div`
    width: 100%;
    height: 85%;

    display: flex;
    justify-content: center;
`

const StyleCanvasUI = styled.div`
    width: 100%;
    height: 15%;
    
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 1%;
`

const Selection_Sort_Canvas: React.FC = () => {
    const {width, height} = useWindowSize();
    const [barGraphData, setBarGraphData] = useState<BarGraphData[]>([]);
    const [delay, setDelay] = useState<number>(1000);
    
    const handleAdd = (inputValue: string) => {
        const newValue: BarGraphData = {
            data: parseInt(inputValue),
            focus: 0
        };
        
        const newData = [...barGraphData, newValue];
         setBarGraphData(newData);
    };

    const handleReset = () => {
        setBarGraphData([]);
    };

    const handleStart = async () => {
        for (let i = 0; i < barGraphData.length - 1; i++) {
            let minIndex = i;

            const newBarGraphData = barGraphData.map((item, index) => ({
                ...item,
                focus: index === i || index === minIndex ? 1 : 0
            }));

            setBarGraphData(newBarGraphData);

            for (let j = i + 1; j < barGraphData.length; j++) {
                newBarGraphData[j].focus = 1;
                setBarGraphData([...newBarGraphData]);

                if (barGraphData[j].data < barGraphData[minIndex].data) {
                    minIndex = j;
                }

                await new Promise(resolve => setTimeout(resolve, delay / 2));

                newBarGraphData[j].focus = 0;
                setBarGraphData([...newBarGraphData]);
            }

            if (minIndex !== i) {
                const temp = barGraphData[i].data;
                barGraphData[i].data = barGraphData[minIndex].data;
                barGraphData[minIndex].data = temp;

                await new Promise(resolve => setTimeout(resolve, delay));
                setBarGraphData([...barGraphData]);
            }
        }

        setBarGraphData(barGraphData.map(item => ({ ...item, focus: 0 })));
    };

    return (
        <>
            <StyleCanvasMain>
                <BarCanvas barGraphData={barGraphData} width={width * 0.8} height={height * 0.7} />
            </StyleCanvasMain>
            <StyleCanvasUI>
                <InputForm handleAdd={handleAdd} handleReset={handleReset} handleStart={handleStart} />
            </StyleCanvasUI>
        </>
    );
};

export default Selection_Sort_Canvas;
