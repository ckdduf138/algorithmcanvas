import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Graph } from '@visx/network';
import { useWindowSize } from '../../hooks/getWindowSize';
import { Circle, Line } from '../../hooks/graph/useGraphCanvas';
import { CirclePosition, EdgePosition, Link, Node, NodeGraphHeightPadding, NodeRadius } from '../../utils/graphData';
import Tooltip from '../common/tooltip';
import EdgeToggle from './edgeToggle';
import { useSVGEvents } from '../../hooks/graph/useSvgEvents';
import { useTheme } from '../../context/themeContext';
import SlideUI from './slideUI';
import { generateUUID } from '../../utils/common';

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
  selectedNode: Node | null;
  draggingEdge: EdgePosition | null;
  CustomNode: React.FC<{node: Node}>;
  CustomLink: React.FC<{ link: Link }>;
  delayRef: React.MutableRefObject<number>;
  isRunning: React.MutableRefObject<boolean>;
  handleMouseDown: (circle: CirclePosition) => void
  handleEdgeClick: () => void;
  handleRandomizeGraphData: (numNodes: number) => void;
  handleResetGraphData: () => void;
  handleStart: (startNodeId: string) => Promise<void>;
};

const GraphCanvas: React.FC<GraphCanvasProps> = ({
  nodeGraphDatas, draggingCircle, selectedEdge, selectedNode, draggingEdge, CustomNode, CustomLink, delayRef, isRunning,
  handleMouseDown, handleEdgeClick, handleRandomizeGraphData, handleResetGraphData, handleStart}
) => {
  const { width, height } = useWindowSize();

  const { svgRef, handleMouseMove, handleMouseUp } = useSVGEvents({
    initialMouseMove: () => {},
    initialMouseUp: () => {},
  });

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

  const onclickBtnReset = () => {
    handleResetGraphData();
  };

  const onclickBtnRandom = () => {
    handleRandomizeGraphData(5); 
  };

  const onclickBtnStart = async () => {
    if(selectedNode) {
      await handleStart(selectedNode.id);
    }
    else {
      alert('시작할 노드를 선택해주세요.');
    }
  };

  return (
    <GraphCanvasContainer>
      <GraphCanvasWapper 
        ref={svgRef}
        width={width} 
        height={adjustedHeight} 
        onMouseMove={() => handleMouseMove} 
        onMouseUp={() => handleMouseUp}>

        {/* 생성 중인 간선 */}
        {draggingEdge && (
          <Line 
            x1={draggingEdge.x1}
            y1={draggingEdge.y1}
            x2={draggingEdge.x2 ?? 0}
            y2={draggingEdge.y2 ?? 0}
            $theme={theme}
            style={{ stroke: '#e74c3c' }}
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
        <Circle cx={width / 3 * 1} cy={adjustedHeight - NodeRadius - 10} r={NodeRadius} $theme={theme}
          onMouseDown={() => handleMouseDown({ id: generateUUID(), cx: width / 3 * 1, cy: adjustedHeight - NodeRadius - 10, radius: NodeRadius })}
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
          $selectedEdge={selectedEdge}
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

      {/* UI */}
    <SlideUI 
      dataSize={nodeGraphDatas.nodes.length}
      isRunning={isRunning}
      delayRef={delayRef} 
      onclickBtnRandom={onclickBtnRandom}
      onclickBtnReset={onclickBtnReset}
      onclickBtnStart={onclickBtnStart} />
    </GraphCanvasContainer>
  );
};

export default GraphCanvas;
