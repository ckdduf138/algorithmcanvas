import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../../context/themeContext';

const QueueContainer = styled.div<{ theme: string }>`
  width: 70em;
  height: 40em;
  display: flex;
  padding: 20px;
  position: relative;
  overflow-y: auto;
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};  /* 테마에 따른 텍스트 색 */
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
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
    transform: translateX(20px);
  }
`;

const QueueRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 10px;
`;

const QueueItem = styled.div<{ isAdding: boolean; isRemoving: boolean; theme: string }>`
  width: 80px;
  height: 80px;
  background-color: ${({ theme }) => (theme === 'light' ? '#fff' : '#444')};  /* 테마에 따른 아이템 배경 */
  border: 1px solid #ccc;
  margin: 5px;
  text-align: center;
  border-radius: 4px;
  position: relative;
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};  /* 테마에 따른 텍스트 색상 */
  animation: ${({ isAdding, isRemoving }) => 
    isAdding ? fadeIn : isRemoving ? fadeOut : 'none'} 0.3s ease forwards;
`;

const TopLine = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  height: 1px;
  background-color: #ddd;
  position: absolute;
  top: 15em;
`;

const BottomLine = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  height: 1px;
  background-color: #ddd;
  position: absolute;
  bottom: 15em;
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

const QueueCanvas: React.FC<{ queue: string[]; queueSize: number; isAdding: boolean; isRemoving: boolean }> = ({ queue, queueSize, isAdding, isRemoving }) => {
  const { theme } = useTheme();  // 현재 테마 가져오기
  const queueWidth = queueSize > 0 ? `${queueSize * 90}px` : '0';

  return (
    <QueueContainer theme={theme}>
      <TopLine width={queueWidth} />
      <QueueRow>
        {queue.length === 0 ? (
          <p>큐가 비어 있습니다.</p>
        ) : (
          queue.map((item, index) => (
            <QueueItem
              key={index}
              isAdding={isAdding && index === 0}
              isRemoving={isRemoving && index === queue.length - 1}
              theme={theme}
            >
              {item}
              {index === 0 && (
                <>
                  <Arrow style={{ left: '50%', transform: 'translateX(-50%)' }} />
                  <Label style={{ left: '50%', transform: 'translateX(-50%)' }}>
                    Rear
                  </Label>
                </>
              )}
              {index === queue.length - 1 && (
                <>
                  <Arrow style={{ left: '50%', transform: 'translateX(-50%)' }} />
                  <Label style={{ left: '50%', transform: 'translateX(-50%)' }}>
                    Front
                  </Label>
                </>
              )}
            </QueueItem>
          ))
        )}
      </QueueRow>
      <BottomLine width={queueWidth} />
    </QueueContainer>
  );
};

export default QueueCanvas;
