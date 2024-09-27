import React from 'react';
import DataCanvasUI from '../dataCanvas/DataCanvasUI';

interface QueueCanvasUIProps {
  queue: string[];
  inputValue: string;
  queueSize: number;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setQueueSize: React.Dispatch<React.SetStateAction<number>>;
  handlePush: () => void;
  handlePop: () => void;
  handleQueueSize: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const QueueCanvasUI: React.FC<QueueCanvasUIProps> = ({
  queue,
  inputValue,
  queueSize,
  setInputValue,
  setQueueSize,
  handlePush,
  handlePop,
  handleQueueSize,
}) => {
  return (
    <DataCanvasUI
      data={queue}
      inputValue={inputValue}
      maxSize={queueSize}
      setInputValue={setInputValue}
      setMaxSize={setQueueSize}
      handlePush={handlePush}
      handlePop={handlePop}
      handleMaxSizeChange={handleQueueSize}
      addItemPlaceholder="추가할 데이터를 입력하세요."
      sizePlaceholder="큐 크기를 설정하세요."
    />
  );
};

export default QueueCanvasUI;
