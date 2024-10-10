import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../../context/themeContext';

const QueueContainer = styled.div<{ theme: string }>`
  display: flex;
  flex: auto;
  width: 100%;
  flex-direction: column;
  padding: 20px 0px;
  position: relative;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};  /* 테마에 따른 텍스트 색 */
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100px);
  }
`;

const QueueRow = styled.div`
  display: flex;
  width: 80%;
  min-height: 100px;
  justify-content: space-around;
  align-items: center;
  position: relative;
  padding: 60px 0;
  overflow-x: auto;
`;

const QueueItem = styled.div<{ $isAdding: boolean; $isRemoving: boolean; $theme: string }>`
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
  position: relative;
  color: ${({ $theme }) => ($theme === 'light' ? '#000' : '#fff')};
  animation: ${({ $isAdding, $isRemoving }) => 
    $isAdding ? fadeIn : $isRemoving ? fadeOut : 'none'} 0.5s ease forwards;
`;

const ArrowLineWapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const ArrowLine = styled.div`
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-left: 20px solid #ddd; 
`;

const TopLine = styled.div`
  width: 80%;
  height: 10px;
  background-color: #ddd;
  position: relative;
`;

const BottomLine = styled.div`
  width: 80%;
  height: 10px;
  background-color: #ddd;
  position: relative;
`;

const BottomTextWapper = styled.div`
  display: flex;
  width: 80%;
  padding: 10px 0px;
`;

const PUSH = styled.div` 
  display: flex;
  width: 100%;
  font-size: 24px;
  font-weight: bold;
  position: relative;
  left: 0;
  justify-content: flex-start;
`;

const POP = styled.div`
  display: flex;
  width: 100%;
  font-size: 24px;
  font-weight: bold;
  position: relative;
  right: 0;
  justify-content: flex-end;
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

interface QueuecanvasProps {
  queueRef: React.RefObject<HTMLDivElement>
  queue: string[];
  isAdding: boolean;
  isRemoving: boolean
};

const QueueCanvas: React.FC<QueuecanvasProps> = ({ queueRef, queue, isAdding, isRemoving }) => {
  const { theme } = useTheme();

  return (
    <QueueContainer theme={theme}>
      <ArrowLineWapper>
        <TopLine />
        <ArrowLine />
      </ArrowLineWapper>

      <QueueRow ref={queueRef}>
  {queue.length === 0 ? (
    <p>큐가 비어 있습니다.</p>
  ) : (
    queue.map((item, index) => (
      <QueueItem
        key={index}
        $isAdding={isAdding && index === 0}
        $isRemoving={isRemoving && index === queue.length - 1}
        $theme={theme}
      >
        {item}
        {index === 0 && queue.length > 1 && (
          <>
            <Arrow style={{ left: '50%', transform: 'translateX(-50%)' }} />
            <Label style={{ left: '50%', transform: 'translateX(-50%)' }}>
              Rear
            </Label>
          </>
        )}
        {index === queue.length - 1 && queue.length > 1 && (
          <>
            <Arrow style={{ left: '50%', transform: 'translateX(-50%)' }} />
            <Label style={{ left: '50%', transform: 'translateX(-50%)' }}>
              Front
            </Label>
          </>
        )}
        {queue.length === 1 && index === 0 && (
          <>
            <Arrow style={{ left: '50%', transform: 'translateX(-50%)' }} />
            <Label style={{ left: '50%', transform: 'translateX(-50%)' }}>
              Rear&Front
            </Label>
          </>
        )}
      </QueueItem>
    ))
  )}
</QueueRow>


      <ArrowLineWapper>
        <BottomLine />
        <ArrowLine />
      </ArrowLineWapper>

      <BottomTextWapper>
        <PUSH>Enqueue</PUSH>
        <POP>Eequeque</POP>
      </BottomTextWapper>
    </QueueContainer>
  );
};

export default QueueCanvas;
