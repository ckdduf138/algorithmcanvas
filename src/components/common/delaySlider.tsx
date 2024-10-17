import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useTheme } from '../../context/themeContext';

const SliderContainer = styled.div`
    display: flex;
    align-items: center;
    font-family: Arial, sans-serif;
`;

const SliderText = styled.div<{ theme: string }>`
    color: ${props => props.theme === 'light' ? '#000' : '#fff'};
    font-size: 16px;
    user-select: none;
`;

const Slider = styled.input<{ theme: string }>`
    position: relative;
    -webkit-appearance: none;
    width: 300px;
    height: 10px;
    background: #d3d3d3;
    outline: none;
    border-radius: 5px;
    margin: 0 10px;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 25px;
        height: 25px;
        background: #007bff;
        cursor: pointer;
        border-radius: 50%;
    }

    &::-moz-range-thumb {
        width: 25px;
        height: 25px;
        background: #4CAF50;
        cursor: pointer;
        border-radius: 50%;
    }

    &:before {
        content: '0.5x';
        position: absolute;
        left: 5px;
        top: -28px;
        color: ${props => props.theme === 'light' ? '#8A8F95' : '#b8bcbf'};
        font-size: 16px;
    }

    &:after {
        content: '5.0x';
        position: absolute;
        right: 5px;
        top: -28px;
        color: ${props => props.theme === 'light' ? '#8A8F95' : '#b8bcbf'};
        font-size: 16px;
    }
`;

interface DelaySliderProps {
  onDelayChange: (delay: number) => void;
}

const DelaySlider: React.FC<DelaySliderProps> = ({ onDelayChange }) => {
    const { theme } = useTheme();
    const [delay, setDelay] = useState<number>(1);

    useEffect(() => {
        onDelayChange(delay);
    }, [delay, onDelayChange]);
    

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDelay(parseFloat(event.target.value));
    };

    return (
        <SliderContainer>
        <SliderText theme={theme}>{delay.toFixed(1)}x</SliderText>
        <Slider 
            theme={theme}
            type='range'
            min='0.5'
            max='5'
            step='0.1'
            value={delay}
            onChange={handleChange}
        />
        </SliderContainer>
    );
    };

export default DelaySlider;
