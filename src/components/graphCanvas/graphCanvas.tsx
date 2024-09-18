import React from 'react';
import styled from 'styled-components';
import { Graph } from '@visx/network';
import { useWindowSize } from '../../hooks/getWindowSize';
import { useGraphCanvas } from '../../hooks/graph/useGraphCanvas';
import { NodeGraphHeightPadding, NodeRadius } from '../../utils/graphData';

export const GraphCanvasContainer = styled.div`
  width: 100%;
  position: relative;
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

const BottomLine = styled.line`
  stroke: #ccc;
  stroke-width: 3;
`;

const GraphCanvas: React.FC = () => {
  const { width, height } = useWindowSize();
  const { nodeGraphDatas, draggingCircle, CustomNode, CustomLink, handleMouseDown, handleMouseMove, handleMouseUp, handleDrop } = useGraphCanvas();

  const adjustedHeight = height * 0.8;
  const adjustedWidth = width * 0.98; 

  return (
    <GraphCanvasContainer>
      <GraphCanvasWapper width={width} height={adjustedHeight} onMouseMove={handleMouseMove} onMouseUp={() => handleMouseUp(handleDrop)}>

        {/* 그래프 노드-간선*/}
        <Graph
          graph={nodeGraphDatas}
          nodeComponent={CustomNode}
          linkComponent={CustomLink}
        />

        {/* 복사용 노드 */}
        <Circle cx={width / 2} cy={adjustedHeight - NodeRadius - 10} r={NodeRadius}
          onMouseDown={() => handleMouseDown({ id: nodeGraphDatas.nodes.length.toString(), cx: width / 2, cy: adjustedHeight - NodeRadius - 10, r: NodeRadius })}
        />

        {/* 구분선 */}
        <BottomLine x1={width * 0.01} y1={adjustedHeight - NodeGraphHeightPadding} x2={adjustedWidth} y2={adjustedHeight - NodeGraphHeightPadding} />

        {/* 복사 중인 노드 */}
        {draggingCircle && (
          <Circle
            cx={draggingCircle.cx}
            cy={draggingCircle.cy}
            r={draggingCircle.r}
            style={{ stroke: 'gray', fill: '#ccc', opacity: 0.85 }}
          />
        )}
        
      </GraphCanvasWapper>
    </GraphCanvasContainer>
  );
};

export default GraphCanvas;
