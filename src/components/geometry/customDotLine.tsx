import React from 'react';
import { Dot } from '../../utils/dotData';
import styled from 'styled-components';
import { useTheme } from '../../context/themeContext';

const DotLine = styled.polyline<{$theme: string, $isCompeleted: boolean}>`
    stroke: ${props => props.$theme === 'light' ? '#2ecc71' : '#27ae60'};
    stroke-width: 3;
    fill: #2ecc71;

    fill-opacity: ${props => props.$isCompeleted ? 0.25 : 0};
`;

interface CustomLineProps {
    dots: Dot[];
    isCompeleted: boolean;
}

const CustomDotLine: React.FC<CustomLineProps> = ({ dots, isCompeleted }) => {
    
    const {theme} = useTheme();

    if (dots.length === 0) return null;

    const pointsString = dots.concat(dots[0]).map(dot => `${dot.x},${dot.y}`).join(" ");

    return (
        <DotLine points={pointsString} $theme={theme} $isCompeleted={isCompeleted}/>
    );
};

export default CustomDotLine;
