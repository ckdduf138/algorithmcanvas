import React, { useState } from "react";
import styled from "styled-components";
import { useWindowSize } from "../../hooks/getWindowSize";
import Button from "../common/buttons";
import DelaySlider from "../common/delaySlider";
import { useTheme } from "../../context/themeContext";
import SegmentedControl, { SegmentOption } from "../common/segmentedControl";
import { ReactSVG } from "react-svg";

const Container = styled.div<{ $isOpen : boolean, $height: number, $theme: string}>`
    display: flex;
    flex-wrap: wrap;
    position: fixed;
    align-items: center;
    justify-content: center;
    bottom: 10%;
    left: 0;
    right: 0;
    width: 100%;
    min-width: 650px;
    height: ${(props) => (props.$isOpen ? props.$height + 'px' : '0px')};
    background-color: ${(props) => (props.$theme === 'light' ? '#f0f0f0' : '#333333')};
    gap: 30px;
    row-gap: 30px;
    overflow: hidden;
    transition: height 0.3s ease-in-out;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

const ToggleButton = styled.button<{$isOpen : boolean, $height: number, $theme: string}>`
    position: absolute;
    bottom: ${(props) => (props.$isOpen ? props.$height + 'px' : '10%')};
    right: 30px;
    transform: translateX(-50%);
    color: ${(props) => (props.$theme === 'light' ? '#333333' : '#f0f0f0')};
    background-color: ${(props) => (props.$theme === 'light' ? '#f0f0f0' : '#333333')};
    border: none;
    border-radius: 30% 30% 0 0;
    padding: 2px 20px;
    cursor: pointer;
    transition: bottom 0.3s ease-in-out;
    user-select: none;

    svg path {
        stroke: ${(props) => (props.$theme === 'light' ? '#000' : '#fff')};
        fill: ${(props) => (props.$theme === 'light' ? '#000' : '#fff')};
    }
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

const SlideUI: React.FC<SlideUIProps> = ({ dataSize, isRunning, delayRef, segmentedControl, options, selected, setOption, onclickBtnReset, onclickBtnRandom, onclickBtnStart }) => {
    const [isOpen, setIsOpen] = useState(false);

    const { height } = useWindowSize();

    const { theme } = useTheme();

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const handleDelayChange = (value: number) => {
        delayRef.current = 1000 / value;
    };

    const handleChange = (value: string) => {
        if(setOption) {
            setOption(value);
        }
    };

    return (
    <>
        <Container $isOpen={isOpen} $height={height * 0.1} $theme={theme}>
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
        <ToggleButton $isOpen={isOpen} $height={height * 0.18} $theme={theme} onClick={toggleOpen}>
            {isOpen ? <ReactSVG src={`${process.env.PUBLIC_URL}/images/caret-down.svg`}/>  : <ReactSVG src={`${process.env.PUBLIC_URL}/images/caret-up.svg`}/>}
        </ToggleButton>
    </>
    );
};

export default SlideUI;
