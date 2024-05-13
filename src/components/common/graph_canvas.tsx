// Canvas.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import Node, { node_size } from './node';

const StyleCanvasMain = styled.div`
    width: 100%;
    height: 85%;
    position: relative;
`

const StyleCanvasUI = styled.div`
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: space-around;
    align-items: center;
`

const ToolButton = styled.button`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    background-color: #fff;
    cursor: pointer;
`

const GraphCanvas = () => {
    const [nodes, setNodes] = useState<any[]>([]);

    const addNode = (position: { x: number, y: number }) => {
        setNodes([...nodes, { position }]);
    };

    const handleToolClick = () => {
        // 도구 클릭 시, 중앙에 노드 추가
        const canvasCenterX = (window.innerWidth / 2) - (node_size / 2);
        const canvasCenterY = (window.innerHeight / 2) - (node_size / 2);
        addNode({ x: canvasCenterX, y: canvasCenterY });
    };

    return (
        <>
            <StyleCanvasMain>
                {nodes.map((node, index) => (
                    <Node key={index} position={node.position} />
                ))}
            </StyleCanvasMain>
            <StyleCanvasUI>
                {/* UI에 있는 원을 클릭하여 중앙에 노드 생성 */}
                <ToolButton onClick={handleToolClick}></ToolButton>
            </StyleCanvasUI>
        </>
    );
};

export default GraphCanvas;
