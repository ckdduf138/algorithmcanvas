import React, { useState } from 'react';
import Layout from '../../components/layout/layout';
import StackCanvasUI from '../../components/dataCanvas/StackCanvasUI';
import StackCanvas from '../../components/dataCanvas/StackCanvas';

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
        return [...prevStack, inputValue];  // Stack의 맨 끝에 추가
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
        newStack.pop(); // Stack의 마지막에서 제거
        setStack(newStack);
        setIsRemoving(false); // 애니메이션 후 false로 변경
      }, 500); // 애니메이션 시간에 맞게 조정
    } else {
      alert('스택에 데이터가 없습니다.');
    }
  };

  const handleStackSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = Number(event.target.value);
    setStackSize(newSize);
    setStack([]);  // 크기를 바꾸면 스택을 초기화
  };

  return (
    <Layout subTitle="스택(STACK)">
      <StackCanvas 
        stack={stack}        // 스택 상태 전달
        stackSize={stackSize} // 스택 크기 전달
        isAdding={isAdding}    // 추가 상태 전달
        isRemoving={isRemoving} // 삭제 상태 전달
      />
      <StackCanvasUI
        stack={stack}
        inputValue={inputValue}
        stackSize={stackSize}
        setInputValue={setInputValue}
        setStackSize={setStackSize}
        handlePush={handlePush}
        handlePop={handlePop}
        handleStackSize={handleStackSize}
      />
    </Layout>
  );
};

export default StackPage;
