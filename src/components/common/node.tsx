// Node.tsx
import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';

export const node_size = 100;

const StyledNode = styled.div`
    width: ${node_size}px;
    height: ${node_size}px;
    border-radius: 50%;
    background-color: #ffffff;
    position: absolute;
    cursor: move;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3), 0px 3px 6px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s ease;
`

interface NodeProps {
    position: { x: number, y: number };
}

const Node: React.FC<NodeProps> = ({ position }) => {
    const handleDrag = (e: any, data: any) => {
        console.log("Node dragged to:", { x: data.x, y: data.y });
    };

    return (
        <Draggable
            defaultPosition={position}
            onStop={handleDrag}
        >
            <StyledNode />
        </Draggable>
    );
};

export default Node;
