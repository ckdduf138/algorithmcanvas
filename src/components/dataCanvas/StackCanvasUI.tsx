import React from 'react';
import DataCanvasUI from '../dataCanvas/DataCanvasUI';

interface StackCanvasUIProps {
  stack: string[];
  inputValue: string;
  stackSize: number;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setStackSize: React.Dispatch<React.SetStateAction<number>>;
  handlePush: () => void;
  handlePop: () => void;
  handleStackSize: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StackCanvasUI: React.FC<StackCanvasUIProps> = ({
  stack,
  inputValue,
  stackSize,
  setInputValue,
  setStackSize,
  handlePush,
  handlePop,
  handleStackSize,
}) => {
  return (
    <DataCanvasUI
      data={stack}
      inputValue={inputValue}
      maxSize={stackSize}
      setInputValue={setInputValue}
      setMaxSize={setStackSize}
      handlePush={handlePush}
      handlePop={handlePop}
      handleMaxSizeChange={handleStackSize}
      addItemPlaceholder="추가할 데이터를 입력하세요."
      sizePlaceholder="스택 크기를 설정하세요."
    />
  );
};

export default StackCanvasUI;
