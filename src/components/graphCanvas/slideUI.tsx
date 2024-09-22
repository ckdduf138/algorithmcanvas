import React, { useState } from "react";
import styled from "styled-components";
import { useWindowSize } from "../../hooks/getWindowSize";
import Button from "../common/buttons";
import DelaySlider from "../common/delaySlider";

const Container = styled.div<{ $isOpen : boolean, $height: number}>`
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    bottom: 10%;
    left: 0;
    right: 0;
    height: ${(props) => (props.$isOpen ? props.$height + 'px' : '0')};
    background-color: #f0f0f0;
    gap: 1%;
    overflow: hidden;
    transition: height 0.3s ease-in-out;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

const ToggleButton = styled.button<{$isOpen : boolean, $height: number}>`
    position: fixed;
    bottom: ${(props) => (props.$isOpen ? props.$height + 'px' : '10%')};
    right: 1%;
    transform: translateX(-50%);
    color: #333;
    background-color: #f0f0f0;
    border: none;
    border-radius: 30% 30% 0 0;;
    padding: 2px 20px;
    cursor: pointer;
    transition: bottom 0.3s ease-in-out;
    font-size: 20px;
`;

interface SlideUIProps {
    dataSize: number;
    isRunning: boolean;
    delayRef: React.MutableRefObject<number>;
    onclickBtnReset: () => void;
    onclickBtnRandom: () => void;
    onclickBtnStart: () => void;
};

const SlideUI: React.FC<SlideUIProps> = ({ dataSize, isRunning, delayRef, onclickBtnReset, onclickBtnRandom, onclickBtnStart }) => {
    const [isOpen, setIsOpen] = useState(false);

    const { height } = useWindowSize();

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const handleDelayChange = (value: number) => {
        delayRef.current = value;
    };

    return (
    <>
        <Container $isOpen={isOpen} $height={height * 0.13}>
            <Button onClick={onclickBtnReset} disabled={dataSize <= 0 && !isRunning}>Reset</Button>
            <Button onClick={onclickBtnRandom} disabled={isRunning}>Random</Button>
            <Button onClick={onclickBtnStart} disabled={dataSize <= 0 && !isRunning}>Start</Button>
            <DelaySlider onDelayChange={handleDelayChange}/> 
        </Container>
        <ToggleButton $isOpen={isOpen} $height={height * 0.23} onClick={toggleOpen}>
            {isOpen ?  '⮟' : '⮝'}
        </ToggleButton>
    </>
    );
};

export default SlideUI;
