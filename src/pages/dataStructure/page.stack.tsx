import React, { useState } from 'react';
import Layout from '../../components/layout/layout';
import StackCanvas from '../../components/dataCanvas/StackCanvas';
import DataCanvasUI from '../../components/dataCanvas/DataCanvasUI';

const StackPage: React.FC = () => {
  const [stack, setStack] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [stackSize, setStackSize] = useState<number>(0);
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handlePush = () => {
    if (!inputValue.trim()) {
      alert('추가할 데이터를 입력하세요.');
      return;
    }
    if (stack.length < stackSize || stackSize === 0) {
      setStack(prevStack => {
        setIsAdding(true);
        return [...prevStack, inputValue];
      });
      setInputValue('');
      setTimeout(() => {
        setIsAdding(false);
      }, 500);
    } else {
      alert('스택이 가득 찼습니다.');
    }
  };

  const handlePop = () => {
    if (stack.length > 0) {
      setIsRemoving(true);
      const newStack = [...stack];
      setTimeout(() => {
        newStack.pop();
        setStack(newStack);
        setIsRemoving(false);
      }, 500);
    } else {
      alert('스택에 데이터가 없습니다.');
    }
  };

  const handleStackSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = Number(event.target.value);
    setStackSize(newSize);
    setStack([]);
  };

  return (
    <Layout subTitle="스택(STACK)">
      <StackCanvas 
        stack={stack}
        stackSize={stackSize}
        isAdding={isAdding}
        isRemoving={isRemoving}
      />
      <DataCanvasUI
        data={stack}
        inputValue={inputValue}
        maxSize={stackSize}
        setInputValue={setInputValue} 
        setMaxSize={setStackSize}
        handlePush={handlePush}
        handlePop={handlePop}
        handleMaxSizeChange={handleStackSizeChange}
        addItemPlaceholder="추가할 데이터를 입력하세요"
        sizePlaceholder="스택 크기" 
      />
    </Layout>
  );
};

export default StackPage;
