import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../../context/themeContext';

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

const colorChange = keyframes`
  from {
    background-color: #f0f0f0; // 기본 색상
  }
  to {
    background-color: #aaf; // 변경할 색상
  }
`;

const CanvasContainer = styled.div`
  width: 90%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
  overflow-x: auto;
`;

const NodeContainer = styled.div<{ isSearching: boolean; $isAdding: boolean; $isRemoving: boolean; $theme: string; }>`
  display: flex;
  align-items: center;
  background-color: ${({ isSearching, $theme }) => (isSearching ? '#aaf' : $theme === 'light' ? '#f0f0f0' : '#444')};
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-right: 20px;
  position: relative;
  animation: ${({ $isAdding, $isRemoving }) =>
    $isAdding ? fadeIn : $isRemoving ? fadeOut : 'none'} 0.5s ease forwards, 
    ${({ isSearching }) => (isSearching ? colorChange : 'none')} 1s ease forwards;
`;

const DataSection = styled.div`
  padding: 10px;
  border-right: 1px solid #ccc;
  min-width: 30px;
  text-align: center;
`;

const PointerSection = styled.div<{ isNext: boolean; $theme: string }>`
  padding: 10px;
  min-width: 150px;
  text-align: center;
  background-color: #e0e0e0;
  animation: ${({ isNext }) => (isNext ? colorChange : 'none')} 0.5s ease forwards;
`;

const Line = styled.div<{ isNext: boolean; $theme: string }>`
  min-width: 40px;
  height: 2px;
  background-color: ${({ $theme }) => ($theme === 'light' ? '#000' : '#fff')};
  margin: 0;
  animation: ${({ isNext }) => (isNext ? colorChange : 'none')} 0.8s ease forwards;
`;

const Arrow = styled.div<{ isNext: boolean; $theme: string }>`
  width: 0;
  height: 0;
  border-left: 10px solid ${({ $theme }) => ($theme === 'light' ? '#000' : '#fff')};
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  animation: ${({ isNext }) => (isNext ? 'arrowColorChange 0.8s ease forwards' : 'none')};

  @keyframes arrowColorChange {
    from {
      border-left-color: ${({ $theme }) => ($theme === 'light' ? '#000' : '#fff')};
    }
    to {
      border-left-color: #aaf;
    }
  }
`;

const ArrowLineWapper = styled.div<{ $isAdding: boolean; $isRemoving: boolean; isNext: boolean; }>`
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

const HeadLabel = styled.div<{ $theme: string }>` // 테마 prop 추가
  margin: 15px;
  font-size: 12px;
  font-weight: bold;
  color: ${({ $theme }) => ($theme === 'light' ? '#000' : '#fff')}; // 테마에 따라 색상 변경
`;

interface LinkedListCanvasProps {
  linkedList: string[];
  searchIndex: number | null;
  inputIndex: number; // 추가된 props
  isAdding: boolean;
  isRemoving: boolean;
}

const LinkedListCanvas: React.FC<LinkedListCanvasProps> = ({ linkedList, searchIndex, inputIndex, isAdding, isRemoving }) => {
  const { theme } = useTheme(); // 테마 가져오기
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
                  <HeadLabel $theme={theme}>head</HeadLabel> {/* 테마 전달 */}
                </HeadArrow>
                <ArrowLineWapper
                  $isAdding={isAdding && inputIndex === 0}
                  $isRemoving={isRemoving && inputIndex === 0}
                  isNext={searchIndex === 0}>
                  <Line isNext={searchIndex === 0} $theme={theme} />
                  <Arrow isNext={searchIndex === 0} $theme={theme} />
                </ArrowLineWapper>
              </>
            )}
            <NodeContainer
              isSearching={searchIndex === index}
              $isAdding={isAdding && index === inputIndex}
              $isRemoving={isRemoving && index === inputIndex}
              $theme={theme} // 테마 전달
            >
              <DataSection>{node}</DataSection>
              <PointerSection isNext={searchIndex !== null && ( index === searchIndex - 1 || index === searchIndex)} $theme={theme}>
                {index === linkedList.length - 1 ? 'NULL' : `*${index + 1}번째 요소의 주소`}
              </PointerSection>
            </NodeContainer>
            {index < linkedList.length - 1 && (
              <ArrowLineWapper
                $isAdding={isAdding && index === inputIndex - 1}
                $isRemoving={isRemoving && index === inputIndex - 1}
                isNext={searchIndex !== null && index === searchIndex - 1}>
                <Line isNext={searchIndex !== null && index === searchIndex - 1} $theme={theme} />
                <Arrow isNext={searchIndex !== null && index === searchIndex - 1} $theme={theme} />
              </ArrowLineWapper>
            )}
          </React.Fragment>
        ))
      )}
    </CanvasContainer>
  );
};

export default LinkedListCanvas;
