import React, { useState } from 'react';
import styled from 'styled-components';
import BarCanvas from '../common/bar_canvas';
import { useWindowSize } from '../../hooks/getWindowSize';
import InputForm from '../common/bar_input';

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
    const [data, setData] = useState<number[]>([]);
    const [delay, setDelay] = useState<number>(1000);
    
    const handleAdd = (inputValue: string) => {
        const newData = [...data, parseInt(inputValue)];
        setData(newData);
    };

    const handleReset = () => {
        setData([]);
    };

    const handleStart = async () => {
        for (let i = 0; i < data.length - 1; i++) {
            let minIndex = i;

            for (let j = i + 1; j < data.length; j++) {
                if (data[j] < data[minIndex]) {
                minIndex = j;
                }
            }

            if (minIndex !== i) {
                const temp = data[i];
                data[i] = data[minIndex];
                data[minIndex] = temp;

                await new Promise(resolve => setTimeout(resolve, delay));
                setData([...data]);
            }
        }
    };

    return (
        <>
            <StyleCanvasMain>
                <BarCanvas data={data} width={width * 0.8} height={height * 0.7} />
            </StyleCanvasMain>
            <StyleCanvasUI>
                <InputForm handleAdd={handleAdd} handleReset={handleReset} handleStart={handleStart} />
            </StyleCanvasUI>
        </>
    );
};

export default Selection_Sort_Canvas;
