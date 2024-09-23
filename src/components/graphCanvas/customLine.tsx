import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { NodeFocusStatus, NodeRadius } from '../../utils/graphData';

const getStrokeColor = (focusStatus: NodeFocusStatus, theme: string) => {
    if (focusStatus === 'inactive') {
        return theme === 'light' ? 'black' : 'white';
    }
    switch (focusStatus) {
        case 'active':
            return theme === 'light' ? '#3498db' : '#2980b9';
        case 'selected':
            return theme === 'light' ? '#e74c3c' : '#c0392b';
        case 'highlight':
            return theme === 'light' ? '#f1c40f' : '#f39c12'; 
        case 'completed':
            return theme === 'light' ? '#2ecc71' : '#27ae60';
        default:
            return theme === 'light' ? '#d9d9d9' : '#333333';
    }
};


export const Line = styled.line<{$theme: string}>`
    stroke: ${props => props.$theme === 'light' ? 'black' : 'white'};
    stroke-width: 5;
    stroke-opacity: 0.6;
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));
    cursor: pointer;
`;

interface CustomLineProps {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    $theme?: any;
    onMouseDown?: (e: React.MouseEvent<SVGElement>) => void;
}

const CustomLine: React.FC<CustomLineProps> = ({ x1, y1, x2, y2, $theme, onMouseDown }) => {

    return (
        <Line 
            x1={x1}
            y1={y1} 
            x2={x2} 
            y2={y2}
            $theme={$theme}
            onMouseDown={onMouseDown}
      />
    );
};

export default CustomLine;
