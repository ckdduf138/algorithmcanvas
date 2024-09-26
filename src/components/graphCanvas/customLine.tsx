import React, { useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { NodeFocusStatus } from '../../utils/graphData';

const getStrokeColor = (focusStatus: NodeFocusStatus, theme: string) => {
    if (focusStatus === 'inactive') {
        return theme === 'light' ? 'black' : 'white';
    }

    switch (focusStatus) {
        case 'active':
            return theme === 'light' ? 'black' : 'white';
        case 'completed':
            return theme === 'light' ? '#3498db' : '#2980b9';   
    }
};

const getStrokeColorOverlay = (focusStatus: NodeFocusStatus, theme: string) => {
    if (focusStatus === 'inactive') {
        return theme === 'light' ? 'black' : 'white';
    }

    switch (focusStatus) {
        case 'active':
            return theme === 'light' ? '#3498db' : '#2980b9';
    }
};

// 애니메이션을 정의하는 keyframes
const drawAnimation = (totalLength: number) => keyframes`
    from {
        stroke-dashoffset: ${totalLength};
    }
    to {
        stroke-dashoffset: 0;
    }
`;

export const Line = styled.line<{ $focusStatus: NodeFocusStatus, $theme: string, $dashed: boolean }>`
    stroke: ${({ $focusStatus, $theme }) => getStrokeColor($focusStatus, $theme)};
    stroke-width: 5;
    stroke-opacity: 0.6;
    stroke-dasharray: ${({ $dashed }) => ($dashed ? '8,4' : 'none')};
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));
    cursor: pointer;
`;

const OverlayLine = styled.line<{ $focusStatus: NodeFocusStatus, $theme: string, $totalLength: number, $delay: number }>`
    stroke: ${({ $focusStatus, $theme }) => getStrokeColorOverlay($focusStatus, $theme)};
    stroke-width: 7;
    stroke-dasharray: ${({ $totalLength }) => $totalLength};
    stroke-dashoffset: ${({ $totalLength }) => $totalLength};
    animation: ${({ $totalLength, $delay }) => drawAnimation($totalLength)} ${({ $delay }) => $delay}ms linear forwards;
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));
`;

interface CustomLineProps {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    dashed?: boolean;
    $theme: string;
    onMouseDown?: (e: React.MouseEvent<SVGElement>) => void;
    focusStatus?: NodeFocusStatus;
    delay?: number;
}

const CustomLine: React.FC<CustomLineProps> = ({ x1, y1, x2, y2, $theme, dashed = false, onMouseDown, focusStatus = 'inactive', delay = 500 }) => {
    const lineRef = useRef<SVGLineElement>(null);
    const [totalLength, setTotalLength] = React.useState(0);

    useEffect(() => {
        if (lineRef.current) {
            const length = lineRef.current.getTotalLength();
            setTotalLength(length);
        }
    }, [x1, y1, x2, y2]);

    return (
        <>
            <Line 
                ref={lineRef} 
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                $focusStatus={focusStatus} 
                $theme={$theme}
                $dashed={dashed}
                onMouseDown={onMouseDown}
            />

            {focusStatus === 'active' && (
                <OverlayLine 
                    x1={x1} 
                    y1={y1} 
                    x2={x2} 
                    y2={y2} 
                    $focusStatus={focusStatus} 
                    $theme={$theme} 
                    $totalLength={totalLength} 
                    $delay={delay} 
                />
            )}
        </>
    );
};

export default CustomLine;
