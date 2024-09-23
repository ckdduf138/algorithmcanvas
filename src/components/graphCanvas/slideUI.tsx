import React, { useState } from "react";
import styled from "styled-components";
import { useWindowSize } from "../../hooks/getWindowSize";
import Button from "../common/buttons";
import DelaySlider from "../common/delaySlider";
import { useTheme } from "../../context/themeContext";

const Container = styled.div<{ $isOpen : boolean, $height: number, $theme: string}>`
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    bottom: 10%;
    left: 0;
    right: 0;
    height: ${(props) => (props.$isOpen ? props.$height + 'px' : '0')};
    background-color: ${(props) => (props.$theme === 'light' ? '#f0f0f0' : '#333333')};
    gap: 1%;
    overflow: hidden;
    transition: height 0.3s ease-in-out;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

const ToggleButton = styled.button<{$isOpen : boolean, $height: number, $theme: string}>`
    position: fixed;
    bottom: ${(props) => (props.$isOpen ? props.$height + 'px' : '10%')};
    right: 1%;
    transform: translateX(-50%);
    color: ${(props) => (props.$theme === 'light' ? '#333333' : '#f0f0f0')};;
    background-color: ${(props) => (props.$theme === 'light' ? '#f0f0f0' : '#333333')};
    border: none;
    border-radius: 30% 30% 0 0;;
    padding: 2px 20px;
    cursor: pointer;
    transition: bottom 0.3s ease-in-out;
    font-size: 20px;
`;

interface SlideUIProps {
    dataSize: number;
    isRunning: React.MutableRefObject<boolean>;
    delayRef: React.MutableRefObject<number>;
    onclickBtnReset: () => void;
    onclickBtnRandom: () => void;
    onclickBtnStart: () => void;
};

const SlideUI: React.FC<SlideUIProps> = ({ dataSize, isRunning, delayRef, onclickBtnReset, onclickBtnRandom, onclickBtnStart }) => {
    const [isOpen, setIsOpen] = useState(false);

    const { height } = useWindowSize();

    const { theme } = useTheme();

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const handleDelayChange = (value: number) => {
        delayRef.current = 1000 / value;
    };

    return (
    <>
        <Container $isOpen={isOpen} $height={height * 0.13} $theme={theme}>
            <Button onClick={onclickBtnReset} disabled={dataSize <= 0 || isRunning.current}>Reset</Button>
            <Button onClick={onclickBtnRandom} disabled={isRunning.current}>Random</Button>
            <Button onClick={onclickBtnStart} disabled={dataSize <= 0 || isRunning.current}>Start</Button>
            <DelaySlider onDelayChange={handleDelayChange}/> 
        </Container>
        <ToggleButton $isOpen={isOpen} $height={height * 0.23} $theme={theme} onClick={toggleOpen}>
            {isOpen ?  '⮟' : '⮝'}
        </ToggleButton>
    </>
    );
};

export default SlideUI;
