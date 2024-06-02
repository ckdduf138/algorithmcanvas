import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useTheme } from '../../context/themeContext';
import Text from './text';

const SliderContainer = styled.div`
    display: flex;
    align-items: center;
    font-family: Arial, sans-serif;
`;

const Slider = styled.input<{ theme: string }>`
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
        background: ${props => props.theme === 'light' ? '#8A8F95' : '#b8bcbf'};;
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
        <Text>{delay.toFixed(1)}x</Text>
        <Slider theme = {theme}
            type="range"
            min="0.5"
            max="5"
            step="0.1"
            value={delay}
            onChange={handleChange}
        />
        </SliderContainer>
    );
    };

export default DelaySlider;
