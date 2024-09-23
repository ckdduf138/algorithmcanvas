import React from 'react';
import styled from 'styled-components';

const TooltipText = styled.div<{ $visible: boolean; $position: { x: number; y: number } }>`
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 10px 7px;
  border-radius: 10px;
  font-size: 12px;
  white-space: nowrap;
  position: absolute;
  left: ${({ $position }) => `${$position.x}px`};
  top: ${({ $position }) => `${$position.y}px`};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.3s linear, transform 0.3s linear;
  transform: translate(-50%, 0);
  pointer-events: none;
`;

const TooltipArrow = styled.div`
  content: '';
  border-width: 6px;
  border-style: solid;
  border-color: transparent;
  border-top-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
  z-index: 1;
`;

interface TooltipProps {
  text: string;
  position: { x: number; y: number };
  visible: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ text, position, visible }) => {
  return (
    <>
      <TooltipText $position={position} $visible={visible}>
        {text}
        <TooltipArrow />
      </TooltipText>
    </>
  );
};

export default Tooltip;
