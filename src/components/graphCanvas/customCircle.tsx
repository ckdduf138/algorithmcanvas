import React, { useState } from 'react';
import styled from 'styled-components';
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


const DeleteButton = styled.g<{ $show: boolean }>`
    cursor: pointer;
    opacity: ${props => (props.$show ? '1' : '0')};
    transform: translate(${NodeRadius - 10}px, -${NodeRadius + 10}px);
    transition: opacity 1s ease;
`;

export const Circle = styled.circle<{ $focusStatus?: NodeFocusStatus, $theme: string }>`
    fill: #D9D9D9;
    stroke: ${props => getStrokeColor(props.$focusStatus ?? 'inactive', props.$theme)};
    stroke-width: ${props => props.$focusStatus === 'inactive' ? '3' : '5'};;
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));
    cursor: pointer;
    transition: stroke 0.3s ease, stroke-width 0.3s ease;
`;

const CircleText = styled.text<{$theme: string}>`
    fill: black;
    font-size: 32px;
    dominant-baseline: middle;
    text-anchor: middle;
    pointer-events: none;
    user-select: none;
`;

interface CustomCircleProps {
    id: string;
    r: number;
    $focusStatus: NodeFocusStatus;
    $theme?: any;
    text: string;
    isRunning: boolean
    onMouseDown?: (e: React.MouseEvent<SVGElement>) => void;
    onDelete?: (id: string) => void;
}

const CustomCircle: React.FC<CustomCircleProps> = ({ id, r, $focusStatus, $theme, text, isRunning, onMouseDown, onDelete }) => {
    const [showDelete, setShowDelete] = useState(false);

    let timer: NodeJS.Timeout | null = null;

    const handleMouseEnter = () => {
        if(isRunning) return;
        
        if (timer) clearTimeout(timer);
        
        setShowDelete(true);

        timer = setTimeout(() => {
            setShowDelete(false);
        }, 2000);
    };

    const handleMouseLeave = () => {
        if (timer) clearTimeout(timer);

        timer = setTimeout(() => {
            setShowDelete(false);
        }, 2000);
    };

    const handleDeleteClick = (e: React.MouseEvent<SVGElement>) => {
        e.stopPropagation();
        
        if (onDelete) {
            onDelete(id);
        }
    };

    return (
        <>
            <Circle 
                $focusStatus={$focusStatus} 
                id={id} 
                r={r} 
                $theme={$theme}
                onMouseDown={onMouseDown}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
            <CircleText x={0} y={0} $theme={$theme}>{text}</CircleText>
            <DeleteButton $show={showDelete} onClick={handleDeleteClick}>
                <path d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5229 4.47715 20 10 20C15.5229 20 20 15.5229 20 10C19.994 4.47961 15.5204 0.00597656 10 0ZM13.3333 12.1558C13.672 12.4675 13.6938 12.9947 13.3821 13.3333C13.0705 13.672 12.5433 13.6938 12.2046 13.3821C12.1877 13.3666 12.1714 13.3503 12.1558 13.3333L10 11.1783L7.845 13.3333C7.51395 13.653 6.98641 13.6439 6.66668 13.3128C6.3548 12.9899 6.3548 12.4779 6.66668 12.155L8.82168 10L6.66668 7.845C6.34695 7.51395 6.35613 6.98641 6.68719 6.66668C7.01012 6.3548 7.52207 6.3548 7.845 6.66668L10 8.82168L12.1558 6.66668C12.4675 6.32805 12.9947 6.30617 13.3333 6.61785C13.672 6.92953 13.6938 7.45672 13.3821 7.79535C13.3666 7.8123 13.3503 7.82855 13.3333 7.84418L11.1783 10L13.3333 12.1558Z" fill="#A9B1BC"/>
            </DeleteButton>
        </>
    );
};

export default CustomCircle;
