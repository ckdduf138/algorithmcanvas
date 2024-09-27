import React from 'react';
import styled from 'styled-components';

const EdgeToggleWrapper = styled.g`
  cursor: pointer;
`;

const OuterEdge = styled.path<{ $selectedEdge: boolean; $strokeWidth: number }>`
  stroke: ${({ $selectedEdge }) => ($selectedEdge ? '#007bff' : 'transparent')};
  stroke-width: ${({ $strokeWidth }) => $strokeWidth}px;
  fill: none;
  transition: stroke 0.3s;
`;

const InnerEdge = styled.path`
  stroke: #ccc;
  stroke-width: 10;
  fill: none;
  transition: stroke 0.3s;
`;

interface EdgeToggleProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  selectedEdge: boolean;
  isWeighted: boolean;
  strokeWidth: number;
  onClick: (isWeighted: boolean) => void;
  onMouseOver: () => void;
  onMouseOut: () => void;
}

const EdgeToggle: React.FC<EdgeToggleProps> = ({ x1, y1, x2, y2, selectedEdge, isWeighted, strokeWidth, onClick, onMouseOver, onMouseOut }) => {
  const edgePath = `M ${x1} ${y1} L ${x2} ${y2}`;

  const offset = strokeWidth / 2;
  const angle = Math.atan2(y2 - y1, x2 - x1);

  const offsetX = offset * Math.cos(angle + Math.PI / 2);
  const offsetY = offset * Math.sin(angle + Math.PI / 2);

  const outerEdgePath = `
    M ${x1 - offsetX} ${y1 - offsetY}
    L ${x2 - offsetX} ${y2 - offsetY}
    L ${x2 + offsetX} ${y2 + offsetY}
    L ${x1 + offsetX} ${y1 + offsetY}
    Z
  `;

  return (
    <EdgeToggleWrapper
      onClick={() => onClick(isWeighted)}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {/* 외곽선 */}
      <OuterEdge
        d={outerEdgePath}
        $selectedEdge={selectedEdge}
        $strokeWidth={strokeWidth}
      />
      {/* 내부 선 */}
      <InnerEdge d={edgePath} />
    </EdgeToggleWrapper>
  );
};

export default EdgeToggle;
