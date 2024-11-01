import React, { useEffect, useRef, useState } from 'react';
import Layout from '../../components/layout/layout';
import StackCanvas from '../../components/dataCanvas/StackCanvas';
import StackQueueCanvasUI from '../../components/dataCanvas/StackQueueCanvasUI';
import { useAlert } from '../../context/alertContext';

const StackPage: React.FC = () => {
  const [stack, setStack] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [stackSize, setStackSize] = useState<number>(0);
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const stackRef = useRef<HTMLDivElement>(null);

  const { sendAlert, resetAlert } = useAlert();

  const handlePush = () => {
    if (stack.length < stackSize || stackSize === 0) {

      if(stackRef.current) {
        stackRef.current.scrollTop = -stackRef.current.scrollHeight;
      }
      
      setStack(prevStack => {
        setIsAdding(true);
        return [...prevStack, inputValue];
      });
      setInputValue('');
      setTimeout(() => {
        setIsAdding(false);
      }, 500);
    } else {
      sendAlert('warning', '스택이 가득 찼습니다.');
    }
  };

  const handlePop = () => {
    if(stackRef.current) {
      stackRef.current.scrollTop = -stackRef.current.scrollHeight;
    }

    setIsRemoving(true);

    const newStack = [...stack];

    setTimeout(() => {
      newStack.pop();
      setStack(newStack);
      setIsRemoving(false);
    }, 500);
  };

  const handleStackSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = Number(event.target.value);
    if (isNaN(newSize)) {
      return;
    }
    setStackSize(newSize);
    setStack([]);
  };

  useEffect(() => {
    return() => {
      resetAlert();
    }
  },[resetAlert]);

  return (
    <Layout subTitle="스택(STACK)">
      <StackCanvas 
        stackRef={stackRef}
        stack={stack}
        isAdding={isAdding}
        isRemoving={isRemoving}
        stackSize={stackSize}
      />
      <StackQueueCanvasUI
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
