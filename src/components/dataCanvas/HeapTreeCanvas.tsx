import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/themeContext';

const ScrollWrapper = styled.div`
  width: 800px; // 최대 너비
  height: 700px; // 최대 높이
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
    isComparing ? (theme === 'light' ? '#ffc107' : '#ffca28') : isRoot ? (theme === 'light' ? '#ff5722' : '#e64a19') : (theme === 'light' ? '#007bff' : '#2196f3')};
  stroke: #000;
  stroke-width: 2;
  transition: fill 0.3s ease;
`;

const NodeText = styled.text<{ theme: string }>`
  font-size: 12px;
  fill: ${({ theme }) => (theme === 'light' ? '#fff' : '#fff')};
  text-anchor: middle;
  dominant-baseline: middle;
`;

const nodeRadius = 20; // 각 노드의 반지름
const levelHeight = 70; // 각 레벨 간 높이 간격

interface HeapTreeCanvasProps {
  heap: number[];
  compareIndices: number[]; // 비교 중인 노드들의 인덱스
}

const HeapTreeCanvas: React.FC<HeapTreeCanvasProps> = ({ heap, compareIndices }) => {
  const { theme } = useTheme(); // 테마 가져오기

  const calculateDimensions = (heap: number[]) => {
    const totalLevels = Math.floor(Math.log2(heap.length)) + 1;
    const maxNodesAtLevel = 2 ** (totalLevels - 1); // 마지막 레벨의 최대 노드 수
    // 리프 노드 간의 간격 계산
    const leafGap = nodeRadius * 2 + 20; // 간격에 따라 조정
    const width = Math.max(maxNodesAtLevel * (leafGap + nodeRadius), 800); // 리프 노드 수와 간격에 맞춰 너비 설정

    const height = levelHeight * totalLevels; // 높이는 레벨 수에 비례
    return { width, height };
  };

  const { width, height } = calculateDimensions(heap);

  const calculateNodeGaps = (heap: number[]) => {
    const levelNodeGaps: number[] = [];
    const totalLevels = Math.floor(Math.log2(heap.length)) + 1;
    const leafLevel = totalLevels - 1;
    const leafGap = nodeRadius * 2 + 20;
    levelNodeGaps[leafLevel] = leafGap;

    for (let level = leafLevel - 1; level >= 0; level--) {
      const childGap = levelNodeGaps[level + 1];
      const parentGap = 2 * (childGap + nodeRadius * 2);
      levelNodeGaps[level] = parentGap;
    }

    return levelNodeGaps;
  };

  const nodeGaps = calculateNodeGaps(heap);

  const getNodePosition = (index: number): { x: number; y: number } => {
    const level = Math.floor(Math.log2(index + 1));
    const maxNodesAtLevel = 2 ** level;
    const gap = nodeGaps[level];
    const xGap = gap / 2;

    if (index === 0) {
      return { x: width / 2, y: nodeRadius };
    }

    const parentIndex = Math.floor((index - 1) / 2);
    const parentPos = getNodePosition(parentIndex);
    const isLeftChild = index === 2 * parentIndex + 1;

    const childOffset = xGap / 2 + nodeRadius;
    const x = isLeftChild ? parentPos.x - childOffset : parentPos.x + childOffset;
    const y = parentPos.y + levelHeight;

    return { x, y };
  };

  return (
    <ScrollWrapper>
      <TreeWrapper viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
        {heap.map((value, index) => {
          const { x, y } = getNodePosition(index);
          const parentIndex = Math.floor((index - 1) / 2);
          const parentPos = parentIndex >= 0 ? getNodePosition(parentIndex) : null;
          const isComparing = compareIndices.includes(index);
          return (
            <React.Fragment key={index}>
              {parentPos && (
                <line
                  x1={parentPos.x}
                  y1={parentPos.y}
                  x2={x}
                  y2={y}
                  stroke="#000"
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
