import React, { useState } from 'react';
import styled from 'styled-components';
import { Graph } from '@visx/network';
import { useWindowSize } from '../../hooks/getWindowSize';
import { Circle, useGraphCanvas } from '../../hooks/graph/useGraphCanvas';
import { NodeGraphHeightPadding, NodeRadius } from '../../utils/graphData';
import Tooltip from '../common/tooltip';

const GraphCanvasContainer = styled.div`
  width: 100%;
  position: relative;
`;

const GraphCanvasWapper = styled.svg`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const BottomLine = styled.line`
  stroke: #ccc;
  stroke-width: 3;
`;

const EdgeToggle = styled.line`
  stroke: #ccc;
  stroke-width: 10;
  cursor: pointer;
  transition: stroke 0.3s;

  &:hover {
    stroke: #aaa;
  }
`;

const GraphCanvas: React.FC = () => {
  const { width, height } = useWindowSize();
  const { nodeGraphDatas, draggingCircle, CustomNode, CustomLink, handleMouseDown, handleMouseMove, handleMouseUp, handleDrop } = useGraphCanvas();
  const [tooltip, setTooltip] = useState<{ visible: boolean; position: { x: number; y: number }; text: string; } | null>(null);

  const adjustedHeight = height * 0.8;
  const adjustedWidth = width * 0.98;

  const handleMouseOverNode = (x: number, y: number) => {
    setTooltip({
      visible: true,
      position: { x: x, y: y},
      text: '노드(Node)',
    });
  };

  const handleMouseOverEdge = (x: number, y: number) => {
    setTooltip({
      visible: true,
      position: { x: x, y: y},
      text: '간선(Edge)',
    });
  };

  const handleMouseOutEdge = () => {
    setTooltip(null);
  };

  return (
    <GraphCanvasContainer>
      <GraphCanvasWapper width={width} height={adjustedHeight} onMouseMove={handleMouseMove} onMouseUp={() => handleMouseUp(handleDrop)}>

        {/* 그래프 노드-간선 */}
        <Graph
          graph={nodeGraphDatas}
          nodeComponent={CustomNode}
          linkComponent={CustomLink}
        />

        {/* 구분선 */}
        <BottomLine x1={width * 0.01} y1={adjustedHeight - NodeGraphHeightPadding} x2={adjustedWidth} y2={adjustedHeight - NodeGraphHeightPadding} />

        {/* 복사용 노드 */}
        <Circle cx={width / 5 * 1} cy={adjustedHeight - NodeRadius - 10} r={NodeRadius}
          onMouseDown={() => handleMouseDown({ id: nodeGraphDatas.nodes.length.toString(), cx: width / 5 * 1, cy: adjustedHeight - NodeRadius - 10, r: NodeRadius })}
          onMouseOver={() => handleMouseOverNode(width / 5 * 1, adjustedHeight - NodeRadius * 2)}
          onMouseOut={handleMouseOutEdge}
        />

        {/* 간선 선택 여부 */}
        <EdgeToggle 
          x1={width / 5 * 2 - 40} 
          y1={adjustedHeight - 100} 
          x2={width / 5 * 2 + 40} 
          y2={adjustedHeight - 20}
          onMouseOver={() => handleMouseOverEdge(width / 5 * 2, adjustedHeight - 100)}
          onMouseOut={handleMouseOutEdge}
        />

        {/* 복사 중인 노드 */}
        {draggingCircle && (
          <Circle 
            cx={draggingCircle.cx}
            cy={draggingCircle.cy}
            r={draggingCircle.r}
            style={{ stroke: '#666666', fill: '#ccc', opacity: 0.85 }}
          />
        )}
      </GraphCanvasWapper>

      {/* 툴팁 */}
      {tooltip && (
        <Tooltip
          text={tooltip.text}
          position={tooltip.position}
          visible={tooltip.visible}
        />
      )}

    </GraphCanvasContainer>
  );
};

export default GraphCanvas;
