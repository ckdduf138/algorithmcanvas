import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/themeContext';
import { useWindowSize } from '../../hooks/getWindowSize'; // 창 크기 가져오는 훅

const ScrollWrapper = styled.div`
  width: 100%;
  height: 600px; // 최대 높이
  overflow: auto; // 스크롤이 필요할 경우 스크롤바 표시
`;

const TreeWrapper = styled.svg<{ width: number; height: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NodeCircle = styled.circle<{ isRoot?: boolean; isComparing?: boolean; theme: string }>`
  fill: ${({ isRoot, isComparing, theme }) =>
    isComparing
      ? theme === 'light'
        ? '#FFA500'
        : '#FFA500'
      : isRoot
      ? theme === 'light'
        ? '#6D9EEB '
        : '#6D9EEB '
      : theme === 'light'
      ? '#D9D9D9'
      : '#D9D9D9'}; 
  stroke: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  stroke-width: 2.5;
  transition: fill 0.5s ease;
`;


const NodeText = styled.text<{ theme: string }>`
  font-size: 28px;
  fill: ${({ theme }) => (theme === 'light' ? '#000' : '#000')};
  text-anchor: middle;
  dominant-baseline: middle;
`;

const nodeRadius = 40; // 각 노드의 반지름
const levelHeight = 100; // 각 레벨 간 높이 간격
const topBlank = 50;

interface HeapTreeCanvasProps {
  heap: number[];
  compareIndices: number[]; // 비교 중인 노드들의 인덱스
  autoScroll: boolean;
}

const HeapTreeCanvas: React.FC<HeapTreeCanvasProps> = ({ heap, compareIndices, autoScroll }) => {
  const { theme } = useTheme(); // 테마 가져오기
  const { width: windowWidth } = useWindowSize(); // 창 크기 가져오기
  const scrollRef = useRef<HTMLDivElement>(null);

  // Dimensions 및 nodeGaps 계산을 하나의 useMemo로 통합
  const { width, height, nodeGaps } = useMemo(() => {
    const totalLevels = Math.floor(Math.log2(heap.length)) + 1;
    const maxNodesAtLevel = 2 ** (totalLevels - 1);
    const leafGap = nodeRadius * 2 + 20;
    const width = Math.max(maxNodesAtLevel * (leafGap + nodeRadius), windowWidth * 0.98);
    const height = levelHeight * totalLevels + topBlank;

    const levelNodeGaps: number[] = [];
    const leafLevel = totalLevels - 1;
    levelNodeGaps[leafLevel] = leafGap;

    for (let level = leafLevel - 1; level >= 0; level--) {
      const parentGap = 2 * (levelNodeGaps[level + 1] + nodeRadius * 2);
      levelNodeGaps[level] = parentGap;
    }

    return { width, height, nodeGaps: levelNodeGaps };
  }, [heap, windowWidth]);

  const getNodePosition = useCallback(
    (index: number): { x: number; y: number } => {
      const level = Math.floor(Math.log2(index + 1));
      const gap = nodeGaps[level];
      const xGap = gap / 2;
  
      if (index === 0) {
        return { x: width / 2, y: nodeRadius + topBlank };
      }
  
      const parentIndex = Math.floor((index - 1) / 2);
      const parentPos = getNodePosition(parentIndex);
      const isLeftChild = index === 2 * parentIndex + 1;
  
      const childOffset = xGap / 2 + nodeRadius;
      const x = isLeftChild ? parentPos.x - childOffset : parentPos.x + childOffset;
      const y = parentPos.y + levelHeight;
  
      return { x, y };
    },
    [nodeGaps, width]
  );
  
  useEffect(() => {
    // 비교 중인 노드들 중 첫 번째 노드로 스크롤 이동
    if (compareIndices.length > 0 && scrollRef.current && autoScroll) {
      const { x, y } = getNodePosition(compareIndices[0]);
      scrollRef.current.scrollTo({
        left: x - scrollRef.current.clientWidth / 2,
        top: y - scrollRef.current.clientHeight / 2,
        behavior: 'smooth',
      });
    }
  }, [compareIndices, autoScroll, getNodePosition]);
  
  return (
    <ScrollWrapper ref={scrollRef}>
      <TreeWrapper viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
        {heap.map((value, index) => {
          const { x, y } = getNodePosition(index);
          const parentIndex = Math.floor((index - 1) / 2);
          const parentPos = parentIndex >= 0 ? getNodePosition(parentIndex) : null;
          const isComparing = compareIndices.includes(index);
          const isLeftChild = index === 2 * parentIndex + 1;
          const parentSin = isLeftChild ? Math.sin(3 * Math.PI / 4) * nodeRadius : Math.sin(Math.PI / 4) * nodeRadius;
          const parentCos = isLeftChild ? Math.cos(3 * Math.PI / 4) * nodeRadius : Math.cos(Math.PI / 4) * nodeRadius;
          return (
            <React.Fragment key={index}>
              {parentPos && (
                <line
                  x1={parentPos.x + parentCos}
                  y1={parentPos.y + parentSin}
                  x2={x}
                  y2={y}
                  stroke={theme === 'light' ? '#000' : '#fff'}
                  strokeWidth="2"
                />
              )}
              <NodeCircle cx={x} cy={y} r={nodeRadius} isRoot={index === 0} isComparing={isComparing} theme={theme} />
              <NodeText x={x} y={y} theme={theme}>
                {value}
              </NodeText>
            </React.Fragment>
          );
        })}
      </TreeWrapper>
    </ScrollWrapper>
  );
};

export default HeapTreeCanvas;
