import React, { useState } from 'react';
import styled from 'styled-components';
import { Graph } from '@visx/network';
import { useWindowSize } from '../../hooks/getWindowSize';
import { CirclePosition, EdgePosition, Link, Node, NodeGraphHeightPadding, NodeRadius } from '../../utils/graphData';
import Tooltip from '../common/tooltip';
import EdgeToggle from './edgeToggle';
import { useTheme } from '../../context/themeContext';
import { generateUUID } from '../../utils/common';
import CustomLine from './customLine';
import { Circle } from './customCircle';

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

interface GraphCanvasProps {
  nodeGraphDatas: { nodes: Node[], links: Link[] };
  draggingCircle: CirclePosition | null;
  selectedEdge: boolean;
  isWeighted: boolean;
  draggingEdge: EdgePosition | null;
  CustomNode: React.FC<{node: Node}>;
  CustomLink: React.FC<{ link: Link }>;
  delayRef: React.MutableRefObject<number>;
  isRunning: 'play' | 'pause' | 'ready';
  handleMouseDown: (circle: CirclePosition) => void
  handleEdgeClick: (weight: boolean) => void;
};

const GraphCanvas: React.FC<GraphCanvasProps> = ({
  nodeGraphDatas, draggingCircle, selectedEdge, isWeighted, draggingEdge, CustomNode, CustomLink, isRunning,
  handleMouseDown, handleEdgeClick}
) => {
  const { width, height } = useWindowSize();

  const {theme} = useTheme();

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
      <GraphCanvasWapper 
        width={width} 
        height={adjustedHeight} >

        {/* 생성 중인 간선 */}
        {draggingEdge && (
          <CustomLine
            x1={draggingEdge.x1}
            y1={draggingEdge.y1} 
            x2={draggingEdge.x2 ?? 0}
            y2={draggingEdge.y2 ?? 0}
            dashed={false}
            weight={draggingEdge.weight}
            isNegativeWeightAllowed={false}
            direction={draggingEdge.direction}
            $theme={theme}
            focusStatus='inactive'
            arrowId='arrowhead_dragging'
          />
        )}
        
        {/* 그래프 노드-간선 */}
        <Graph
          graph={nodeGraphDatas}
          nodeComponent={CustomNode}
          linkComponent={CustomLink}
        />

        {/* 구분선 */}
        <BottomLine x1={width * 0.01} y1={adjustedHeight - NodeGraphHeightPadding} x2={adjustedWidth} y2={adjustedHeight - NodeGraphHeightPadding} />

        {/* 복사용 노드 */}
        <Circle cx={width / 3 * 1} cy={adjustedHeight - NodeRadius - 10} r={NodeRadius} $theme={theme} $focusStatus='inactive'
          onPointerDown ={() => {
            if (isRunning === 'ready') {handleMouseDown({ id: generateUUID(), cx: (width / 3) * 1, cy: adjustedHeight - NodeRadius - 10 + window.scrollY, radius: NodeRadius });
          }}}
          onMouseOver={() => handleMouseOverNode(width / 3 * 1, adjustedHeight - NodeRadius * 2)}
          onMouseOut={handleMouseOutEdge}
        />

        {/* 간선 선택 여부 */}
        <EdgeToggle
          x1={width / 3 * 2 - 40} 
          y1={adjustedHeight - 100} 
          x2={width / 3 * 2 + 40} 
          y2={adjustedHeight - 20}
          onClick={handleEdgeClick}
          onMouseOver={() => handleMouseOverEdge(width / 3 * 2, adjustedHeight - 100)}
          onMouseOut={handleMouseOutEdge}
          strokeWidth={10}
          selectedEdge={selectedEdge}
          isWeighted={isWeighted}
        />

        {/* 복사 중인 노드 */}
        {draggingCircle && (
          <Circle 
            cx={draggingCircle.cx}
            cy={draggingCircle.cy}
            r={draggingCircle.radius}
            $theme={theme}
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
