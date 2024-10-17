import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../../context/themeContext';

const StackContainer = styled.div<{ theme: string }>`
  display: flex;
  flex: auto;
  width: 100%;
  flex-direction: column;
  padding: 20px 0px;
  position: relative;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-100px);
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
    transform: translateY(-100px);
  }
`;

const StackBox = styled.div`
  display: flex;
  flex-direction: column-reverse;
  background-color: transparent;
  border: 10px solid #ddd;
  border-top-color: transparent;
  position: relative;
  height: 500px;
  padding: 0 20px;
  overflow-y: auto;
  align-items: center;
`;

const StackRow = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 200px;
  padding: 10px;
  position: relative;
  margin-top: 50px;
  align-items: center;
`;

const StackItem = styled.div<{ $isAdding: boolean; $isRemoving: boolean; $theme: string }>`
  display: flex;
  min-width: 180px;
  min-height: 80px;
  justify-content: center;
  align-items: center;
  background-color: ${({ $theme }) => ($theme === 'light' ? '#fff' : '#444')};
  border: 1px solid #ccc;
  margin: 5px;
  text-align: center;
  border-radius: 4px;
  color: ${({ $theme }) => ($theme === 'light' ? '#000' : '#fff')};
  position: relative;
  animation: ${({ $isAdding, $isRemoving }) =>
    $isAdding ? fadeIn : $isRemoving ? fadeOut : 'none'} 0.5s ease forwards;
`;

const Arrow = styled.div<{ $theme: string }>`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 10px 0 10px;
  border-color: ${({ $theme }) => ($theme === 'light' ? '#000' : '#fff')} transparent transparent transparent;
  margin-bottom: 10px;
  position: absolute;
  top: -30px;
`;

const Label = styled.div<{ $theme: string }>`
  font-size: 16px;
  font-weight: bold;
  color: ${({ $theme }) => ($theme === 'light' ? '#000' : '#fff')};
  text-align: center;
  position: absolute;
  top: -60px;
`;

interface StackCanvasProps {
  stackRef: React.RefObject<HTMLDivElement>
  stack: string[];
  isAdding: boolean;
  isRemoving: boolean
};

const StackCanvas: React.FC<StackCanvasProps> = ({ stackRef, stack, isAdding, isRemoving }) => {
  const { theme } = useTheme();
  return (
    <StackContainer theme={theme}>
      <StackBox ref={stackRef}>
        <StackRow>
          {stack.length === 0 ? (
            <p>스택이 비어 있습니다.</p>
          ) : (
            stack.map((item, index) => (
              <StackItem
                key={index}
                $isAdding={isAdding && index === stack.length - 1}
                $isRemoving={isRemoving && index === stack.length - 1}
                $theme={theme}
              >
                {item}
                {index === stack.length - 1 && (
                  <>
                    <Arrow $theme={theme}/>
                    <Label $theme={theme}>Top</Label>
                  </>
                )}
              </StackItem>
            ))
          )}
        </StackRow>
      </StackBox>
    </StackContainer>
  );
};

export default StackCanvas;
