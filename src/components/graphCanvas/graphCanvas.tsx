import React from 'react';

import styled from 'styled-components';
import { Graph } from '@visx/network';

import { useWindowSize } from '../../hooks/getWindowSize';
import { useGraphCanvas } from '../../hooks/graph/useGraphCanvas';
import { NodeGraphHeightPadding, NodeGraphWidthPadding, NodeRadius } from '../../utils/graphData';

export const GraphCanvasContainer = styled.div`
  width: 100%;
`;

export const GraphCanvasWapper = styled.svg`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Circle = styled.circle`
  fill: white;
  stroke: black;
  stroke-width: 2;
`;

const GraphCanvasRange = styled.div<{$width: number, $height: number}>`
  display: flex;
  position: absolute;
  left: calc(50% - ${props => props.$width / 2}px);
  width: ${props => props.$width}px;
  height: ${props => props.$height}px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  pointer-events: none;
`;

const GraphCanvas: React.FC = () => {
  const { width, height } = useWindowSize();
  const { nodeGraphDatas, draggingCircle, CustomNode, CustomLink, handleMouseDown, handleMouseMove, handleMouseUp, handleDrop } = useGraphCanvas();

  const adjustedHeight = height * 0.8;
  const headerHeight = height * 0.1;

  return (
    <GraphCanvasContainer>
      <GraphCanvasRange $width={width * 0.98} $height={adjustedHeight - NodeGraphHeightPadding} />
      <GraphCanvasWapper
        width={width} 
        height={adjustedHeight}
        onMouseMove={handleMouseMove}
        onMouseUp={() => handleMouseUp(handleDrop)}
      >
        <Graph
          graph={nodeGraphDatas}
          nodeComponent={CustomNode}
          linkComponent={CustomLink}
        />

        {/* 복사용 노드 */}
        <Circle cx={width / 2} cy={adjustedHeight - NodeRadius - 10} r={NodeRadius}
          onMouseDown={() => handleMouseDown({ id: nodeGraphDatas.nodes.length.toString(), cx: width / 2, cy: adjustedHeight - NodeRadius - 10, r: NodeRadius })}
        />

        {/* 복사 중인 노드 */}
        {draggingCircle && (
          <Circle 
            cx={draggingCircle.cx} 
            cy={draggingCircle.cy} 
            r={draggingCircle.r}
            style={{ fill: 'gray', opacity: 0.5 }}
          />
        )}

      </GraphCanvasWapper>
    </GraphCanvasContainer>
  );
};

export default GraphCanvas;
