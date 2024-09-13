import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Node, NodeGraphData } from '../../utils/graphData';
import { useWindowSize } from '../../hooks/getWindowSize';
import { useDragCopy } from '../../hooks/graph/useDragCopy ';

const GraphCanvasWapper = styled.svg`
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

interface GraphCanvasProps {
  nodeGraphData: NodeGraphData[];
  handleDrop: (circle: { cx: number, cy: number, r: number }) => void;
}

const GraphCanvas: React.FC<GraphCanvasProps> = ({ nodeGraphData, handleDrop }) => {
  const { width, height } = useWindowSize();

  const adjustedHeight = height * 0.8;
  const headerHeight = height * 0.1;

  const { draggingCircle, handleMouseDown, handleMouseMove, handleMouseUp } = useDragCopy();

  return (
    <GraphCanvasWapper
      width={width} 
      height={adjustedHeight}
      onMouseMove={handleMouseMove} 
      onMouseUp={() => handleMouseUp(handleDrop)}>
      {nodeGraphData.map((data) => (
        <Circle key={data.node.id} cx={data.node.x} cy={data.node.y} r={data.node.r} />
      ))}

      {/* 복사용 노드 */}
      <Circle cx={width / 2} cy={adjustedHeight - headerHeight} r='50' 
        onMouseDown={() => handleMouseDown({ id: Date.now(), cx: width / 2, cy: adjustedHeight - headerHeight, r: 50 })}
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
  );
};

export default GraphCanvas;
