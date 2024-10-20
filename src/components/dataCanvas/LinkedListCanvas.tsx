import React from 'react';
import styled, { keyframes } from 'styled-components';

// 애니메이션 정의
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

const CanvasContainer = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
  overflow-x: auto;
`;

const NodeContainer = styled.div<{ isSearching: boolean;  $isAdding: boolean; $isRemoving: boolean;}>`
  display: flex;
  align-items: center;
  background-color: ${({ isSearching }) => (isSearching ? '#aaf' : '#f0f0f0')};
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-right: 20px;
  position: relative;
  animation: ${({ $isAdding, $isRemoving }) =>
    $isAdding ? fadeIn : $isRemoving ? fadeOut : 'none'} 0.5s ease forwards;
`;

const DataSection = styled.div`
  padding: 10px;
  border-right: 1px solid #ccc;
  min-width: 30px;
  text-align: center;
`;

const PointerSection = styled.div`
  padding: 10px;
  min-width: 150px;
  text-align: center;
  background-color: #e0e0e0;
`;

const Line = styled.div`
  min-width: 40px;
  height: 2px;
  background-color: #000;
  margin: 0;
`;

const Arrow = styled.div`
  width: 0;
  height: 0;
  border-left: 10px solid #000;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
`;

const ArrowLineWapper = styled.div<{ $isAdding: boolean; $isRemoving: boolean;}>`
  min-width: 50px;
  display: flex;
  align-items: center;
  margin-right: 5px;
  animation: ${({ $isAdding, $isRemoving }) =>
    $isAdding ? fadeIn : $isRemoving ? fadeOut : 'none'} 0.5s ease forwards;
`;

const HeadArrow = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const HeadLabel = styled.div`
  margin: 15px;
  font-size: 12px;
  font-weight: bold;
`;

interface LinkedListCanvasProps {
  linkedList: string[];
  searchIndex: number | null;
  inputIndex: number; // 추가된 props
  isAdding: boolean; 
  isRemoving: boolean; 
}

const LinkedListCanvas: React.FC<LinkedListCanvasProps> = ({ linkedList, searchIndex, inputIndex, isAdding, isRemoving }) => {
  return (
    <CanvasContainer>
      {linkedList.length === 0 ? (
        <p>연결리스트가 비어 있습니다.</p>
      ) : (
        linkedList.map((node, index) => (
          <React.Fragment key={index}>
            {index === 0 && (
              <>
                <HeadArrow>
                  <HeadLabel>head</HeadLabel>
                </HeadArrow>
                <ArrowLineWapper
                  $isAdding={isAdding && inputIndex === 0}
                  $isRemoving={isRemoving && inputIndex === 0}>
                  <Line />
                  <Arrow />
                </ArrowLineWapper>
              </>
            )}
            <NodeContainer
              isSearching={searchIndex === index || (searchIndex !== null && index < searchIndex)}
              $isAdding={isAdding && index === inputIndex}
              $isRemoving={isRemoving && index === inputIndex}
            >
              <DataSection>{node}</DataSection>
              <PointerSection>
                {index === linkedList.length - 1 ? 'NULL' : `*${index + 1}번째 요소의 주소`}
              </PointerSection>
            </NodeContainer>
            {index < linkedList.length - 1 && (
              <ArrowLineWapper
              $isAdding={isAdding && index === inputIndex-1}
              $isRemoving={isRemoving && index === inputIndex-1}>
                <Line />
                <Arrow />
              </ArrowLineWapper>
            )}
          </React.Fragment>
        ))
      )}
    </CanvasContainer>
  );
};

export default LinkedListCanvas;
