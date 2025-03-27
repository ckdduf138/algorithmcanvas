import React from "react";
import styled from "styled-components";
import Button from "../common/buttons";
import DelaySlider from "../common/delaySlider";
import { useTheme } from "../../context/themeContext";
import SegmentedControl, { SegmentOption } from "../common/segmentedControl";

const Container = styled.div<{$theme: string}>`
    display: flex;
    flex-wrap: wrap;
    position: relative;
    align-items: center;
    justify-content: center;
    padding: 30px 0;
    bottom: 10%;
    width: 100%;
    min-width: 650px;
    background-color: ${(props) => (props.$theme === 'light' ? '#f0f0f0' : '#333333')};
    gap: 30px;
    row-gap: 30px;
    overflow: hidden;
`;

interface SlideUIProps {
    dataSize: number;
    isRunning: 'play' | 'pause' | 'ready';
    delayRef: React.MutableRefObject<number>;
    segmentedControl?: boolean;
    options?: SegmentOption[];
    selected?: string;
    setOption?: (option: string) => void;
    onclickBtnReset: () => void;
    onclickBtnRandom: () => void;
    onclickBtnStart: () => void;
};

const BottomUI: React.FC<SlideUIProps> = ({ dataSize, isRunning, delayRef, segmentedControl, options, selected, setOption, onclickBtnReset, onclickBtnRandom, onclickBtnStart }) => {
    const { theme } = useTheme();

    const handleDelayChange = (value: number) => {
        delayRef.current = 1000 / value;
    };

    const handleChange = (value: string) => {
        if(setOption) {
            setOption(value);
        }
    };

    return (
        <Container $theme={theme}>
            <Button 
                disabled={dataSize <= 0} 
                rightImg={isRunning === 'play' ? `${process.env.PUBLIC_URL}/images/pause-button.svg` : `${process.env.PUBLIC_URL}/images/play-button.svg`} 
                onClick={onclickBtnStart}>{isRunning === 'play' ? 'Pause' : 'Play'}
            </Button> 

            <Button 
                disabled={isRunning !== 'ready'}
                rightImg={`${process.env.PUBLIC_URL}/images/shuffle-button.svg`}
                onClick={onclickBtnRandom} 
            >Random
            </Button>
            
            <Button  
                disabled={dataSize <= 0 || isRunning !== 'ready'}
                rightImg={`${process.env.PUBLIC_URL}/images/reset-button.svg`}
                onClick={onclickBtnReset}
            >Reset
            </Button>
            
            {segmentedControl && options && selected &&
                <SegmentedControl options={options} selectedValue={selected} onChange={handleChange} />
            }

            <DelaySlider onDelayChange={handleDelayChange}/> 
        </Container>
    );
};

export default BottomUI;
