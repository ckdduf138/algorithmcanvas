import React, { useState } from 'react';
import styled from 'styled-components';

import BarCanvasUI from '../barCanvas/barCanvas.UI';
import BarCanvas from '../barCanvas/barCanvas';
import { useWindowSize } from '../../hooks/getWindowSize';
import { BarGraphData } from '../../utils/Data';
import { useTheme } from '../../context/themeContext';
import DelaySlider from '../common/delaySlider';

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
    position: relative; /* 추가 */
`;

const Overlay = styled.div<{ $isVisible: boolean, theme: string }>`
    display: ${props => (props.$isVisible ? "flex" : "none")};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme: themeType }) => (themeType === 'light' ? 'rgba(11, 19, 27, 0.5)' : 'rgba(247, 248, 249, 0.5)')};
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const SelectionSortCanvas: React.FC = () => {
    const { theme } = useTheme();

    const { width, height } = useWindowSize();
    
    const [barGraphData, setBarGraphData] = useState<BarGraphData[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [delay, setDelay] = useState<number>(500);
    const [isBlocking, setIsBlocking] = useState<boolean>(false);
    
    const handleAdd = (inputValue: string) => {
        const newValue: BarGraphData = {
            data: parseInt(inputValue),
            focus: 'inactive'
        };
        
        const newData = [...barGraphData, newValue];
        setBarGraphData(newData);
    };

    const handleReset = () => {
        setBarGraphData([]);
    };

    const handleStart = async () => {
        setIsBlocking(true);
        
        const dataLength = barGraphData.length;

        barGraphData.forEach(data => {
            data.focus = 'inactive';
        });
        
        for (let i = 0; i < dataLength; i++) {
            let index = i;

            if (barGraphData[i].focus !== 'completed') {
                barGraphData[i].focus = 'active';
                setBarGraphData([...barGraphData]);
            }

            for (let j = i + 1; j < dataLength; j++) {
                barGraphData[j].focus = 'active';
                setBarGraphData([...barGraphData]);

                if (sortOrder === 'asc' && barGraphData[j].data < barGraphData[index].data) {
                    index = j;
                } else if (sortOrder === 'desc' && barGraphData[j].data > barGraphData[index].data) {
                    index = j;
                }

                await new Promise(resolve => setTimeout(resolve, delay));

                barGraphData[j].focus = 'inactive';
                setBarGraphData([...barGraphData]);
            }

            if (index !== i) {
                const temp = barGraphData[i].data;
                barGraphData[i].data = barGraphData[index].data;
                barGraphData[index].data = temp;
            }

            barGraphData[i].focus = 'completed';
            setBarGraphData([...barGraphData]);
            
            await new Promise(resolve => setTimeout(resolve, delay));
        }

        setIsBlocking(false);
    };

    const handleDelay = (delay: number) => {
        setDelay(500 / delay);
    };

    return (
        <>
            <StyleCanvasMain>
                <BarCanvas barGraphData={barGraphData} width={width * 0.8} height={height * 0.7} />
            </StyleCanvasMain>
            <StyleCanvasUI>
                <BarCanvasUI handleAdd={handleAdd} handleReset={handleReset} setSortOrder={setSortOrder} handleStart={handleStart} handleDelay={handleDelay} />
                <Overlay $isVisible={isBlocking} theme={theme}>
                </Overlay>
            </StyleCanvasUI>
        </>
    );
};

export default SelectionSortCanvas;
