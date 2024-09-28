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
  justify-content: flex-end;
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

const StackBox = styled.div<{ boxSize: number; theme: string}>`
  background-color: transparent;
  border: 1px solid ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  border-top-color : transparent;
  position: relative;
  width: 231px;
  height: ${({ boxSize }) => boxSize}px;
  max-height: 700px;
  overflow-y: auto;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

const StackRow = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 200px;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
  position: relative;
  margin-top: 50px;
`;

const StackItem = styled.div<{ $isAdding: boolean; $isRemoving: boolean; $theme: string }>`
  display: flex;
  width: 180px;
  height: 80px;
  justify-content: center;
  align-items: center;
  background-color: ${({ $theme }) => ($theme === 'light' ? '#fff' : '#444')};
  border: 1px solid #ccc;
  margin: 5px;
  text-align: center;
  border-radius: 4px;
  color: ${({ $theme }) => ($theme === 'light' ? '#000' : '#fff')};
  animation: ${({ $isAdding, $isRemoving }) =>
    $isAdding ? fadeIn : $isRemoving ? fadeOut : 'none'} 0.5s ease forwards;
`;

const Arrow = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 10px 0 10px;
  border-color: #000 transparent transparent transparent;
  margin-bottom: 10px;
  position: absolute;
  top: -30px;
`;

const Label = styled.div`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  position: absolute;
  top: -50px;
`;

const StackCanvas: React.FC<{ stack: string[]; stackSize: number;  isAdding: boolean; isRemoving: boolean }> = ({
  stack,
  stackSize,
  isAdding,
  isRemoving,
}) => {
  const { theme } = useTheme();
  const boxSize = Math.max(Math.min(stackSize > 0 ? stackSize * 92.5 + 30 + 50 : stack.length * 92.5 + 30 + 50, 700), 150);
  return (
    <StackContainer theme={theme}>
      <StackBox boxSize={boxSize} theme={theme}>
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
                  <Arrow />
                  <Label>Top</Label>
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
