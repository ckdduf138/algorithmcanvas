import React from 'react';
import { Dot, DotStatus } from '../../utils/dotData';
import { useTheme } from '../../context/themeContext';
import styled from 'styled-components';

const getStrokeColor = (focusStatus: DotStatus, theme: string) => {
    if (focusStatus === 'inactive') {
        return theme === 'light' ? '#333' : '#fff';
    }
    switch (focusStatus) {
        case 'active':
            return theme === 'light' ? '#e74c3c' : '#c0392b';
        case 'completed':
            return theme === 'light' ? '#2ecc71' : '#27ae60';   
        default:
            return theme === 'light' ? '#e74c3c' : '#c0392b';
    }
};

const CircleDot = styled.circle<{$theme: string, $focusStatus: DotStatus}>`
    fill: ${props => getStrokeColor(props.$focusStatus ?? 'inactive', props.$theme)};
`;


interface CustomLineProps {
    dot: Dot
}

const CustomDot: React.FC<CustomLineProps> = ({ dot }) => {
    
    const {theme} = useTheme();

    return (
        <CircleDot cx={dot.x} cy={dot.y} r={5} $theme={theme} $focusStatus={dot.focus}/>
    );
};

export default CustomDot;
