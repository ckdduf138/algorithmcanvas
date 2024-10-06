import React, { useRef, useState } from 'react';
import Layout from '../../components/layout/layout';
import QueueCanvas from '../../components/dataCanvas/QueueCanvas';
import DataCanvasUI from '../../components/dataCanvas/DataCanvasUI';

const QueuePage: React.FC = () => {
  const [queue, setQueue] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [queueSize, setQueueSize] = useState<number>(0);
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const queueRef = useRef<HTMLDivElement>(null);

  const handlePush = () => {
    if (!inputValue.trim()) {
      alert('추가할 데이터를 입력하세요.');
      return;
    }

    if (queue.length < queueSize || queueSize === 0) {

      if(queueRef.current) {
        queueRef.current.scrollLeft = 0;
      }

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

      if(queueRef.current) {
        queueRef.current.scrollLeft = queueRef.current.scrollWidth;
      }

      setIsRemoving(true);

      const newQueue = [...queue];

      setTimeout(() => {
        newQueue.shift();
        setQueue(newQueue);
        setIsRemoving(false);
      }, 500);
    } else {
      alert('큐에 데이터가 없습니다.');
    }
  };

  const handleQueueSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = Number(event.target.value);
    setQueueSize(newSize);
    setQueue([]);
  };

  return (
    <Layout subTitle="큐(QUEUE)">
      <QueueCanvas 
        queueRef={queueRef}
        queue={queue}
        isAdding={isAdding}
        isRemoving={isRemoving}
      />
      <DataCanvasUI
        data={queue}
        inputValue={inputValue}
        maxSize={queueSize}
        setInputValue={setInputValue}
        setMaxSize={setQueueSize}
        handlePush={handlePush}
        handlePop={handlePop}
        handleMaxSizeChange={handleQueueSizeChange}
        addItemPlaceholder="추가할 데이터를 입력하세요" 
        sizePlaceholder="큐 크기"
      />
    </Layout>
  );
};

export default QueuePage;
