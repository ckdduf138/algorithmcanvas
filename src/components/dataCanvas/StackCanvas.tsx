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

const StackRow = styled.div`
  display: flex;
  width: 80%;
  min-height: 100px;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 20px 0;
  flex-direction: column;
`;

const StackItem = styled.div<{ $isAdding: boolean; $isRemoving: boolean; $theme: string }>`
  display: flex;
  min-width: 80px;
  min-height: 80px;
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

const StackCanvas: React.FC<{ stack: string[]; stackSize: number; isAdding: boolean; isRemoving: boolean }> = ({ stack, stackSize, isAdding, isRemoving }) => {
  const { theme } = useTheme();

  return (
    <StackContainer theme={theme}>
      <StackRow>
        {stack.length === 0 ? (
          <p>스택이 비어 있습니다.</p>
        ) : (
          [...stack].reverse().map((item, index) => (
            <StackItem
              key={index}
              $isAdding={isAdding && index === 0}
              $isRemoving={isRemoving && index === 0}
              $theme={theme}
            >
              {item}
            </StackItem>
          ))
        )}
      </StackRow>
    </StackContainer>
  );
};

export default StackCanvas;
