import React from 'react';
import styled from 'styled-components';
import { useDragCopy } from '../../hooks/graph/useDragCopy ';

const StyleCanvasUI = styled.div`
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Circle = styled.circle`
  fill: white;
  stroke: black;
  stroke-width: 2;
`;

interface CanvasUIProps {
    handleDrop: (circle: { cx: number, cy: number, r: number }) => void;
}

const GraphCanvasUI: React.FC<CanvasUIProps> = ({ handleDrop }) => {
  const { draggingCircle, handleMouseDown, handleMouseMove, handleMouseUp } = useDragCopy();

  return (
    <StyleCanvasUI>
      <svg 
        width='120' 
        height='120' 
        onMouseMove={handleMouseMove} 
        onMouseUp={() => handleMouseUp(handleDrop)}
      >
        
        <Circle 
          cx='60' 
          cy='60' 
          r='50' 
          onMouseDown={() => handleMouseDown({ id: Date.now(), cx: 60, cy: 60, r: 50 })} 
        />
        
        {/* The dragging circle follows the mouse */}
        {draggingCircle && (
          <Circle 
            cx={draggingCircle.cx} 
            cy={draggingCircle.cy} 
            r={draggingCircle.r} 
            style={{ fill: 'gray', opacity: 0.5 }} 
          />
        )}
      </svg>
    </StyleCanvasUI>
  );
};

export default GraphCanvasUI;
