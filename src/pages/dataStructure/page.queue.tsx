import React, { useState } from 'react';
import Layout from '../../components/layout/layout';
import QueueCanvasUI from '../../components/dataCanvas/QueueCanvasUI';
import QueueCanvas from '../../components/dataCanvas/QueueCanvas';

const QueuePage: React.FC = () => {
  const [queue, setQueue] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [queueSize, setQueueSize] = useState<number>(0);
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handlePush = () => {
    if (!inputValue.trim()) {
      alert('추가할 데이터를 입력하세요.');
      return;
    }
    if (queue.length < queueSize || queueSize === 0) {
      setQueue(prevQueue => {
        setIsAdding(true);
        return [inputValue, ...prevQueue];
      });
      setInputValue('');
      setTimeout(() => {
        setIsAdding(false);
      }, 500);
    } else {
      alert('큐가 가득 찼습니다.');
    }
  };

  const handlePop = () => {
    if (queue.length > 0) {
      setIsRemoving(true);
      const newQueue = [...queue];
      setTimeout(() => {
        newQueue.pop(); // 오른쪽에서 삭제
        setQueue(newQueue);
        setIsRemoving(false); // 애니메이션 후 false로 변경
      }, 500); // 애니메이션 시간에 맞게 조정
    } else {
      alert('큐에 데이터가 없습니다.');
    }
  };

  const handleQueueSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = Number(event.target.value);
    setQueueSize(newSize);
    setQueue([]);
  };

  return (
    <Layout subTitle="큐(QUEUE)">
      <QueueCanvas 
        queue={queue}        // 큐 상태 전달
        queueSize={queueSize} // 큐 크기 전달
        isAdding={isAdding}    // 추가 상태 전달
        isRemoving={isRemoving} // 삭제 상태 전달
      />
      <QueueCanvasUI
        queue={queue}
        inputValue={inputValue}
        queueSize={queueSize}
        setInputValue={setInputValue}
        setQueueSize={setQueueSize}
        handlePush={handlePush}
        handlePop={handlePop}
        handleQueueSize={handleQueueSize}
      />
    </Layout>
  );
};

export default QueuePage;
