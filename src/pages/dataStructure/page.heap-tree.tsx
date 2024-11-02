import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/layout';
import HeapTreeCanvas from '../../components/dataCanvas/HeapTreeCanvas';
import HeapTreeCanvasUI from '../../components/dataCanvas/HeapTreeCanvasUI';
import { useAlert } from '../../context/alertContext';

const HeapTreePage: React.FC = () => {
  const [heap, setHeap] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isMinHeap, setIsMinHeap] = useState<boolean>(true);
  const [compareIndices, setCompareIndices] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const { sendAlert, resetAlert } = useAlert();

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const insertHeap = async (newValue: number) => {
    setIsAnimating(true);
    const newHeap = [...heap, newValue];
    let i = newHeap.length - 1;

    setHeap(newHeap);

    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      setCompareIndices([i, parent]);
      await sleep(500);

      const comparison = isMinHeap
        ? newHeap[parent] <= newHeap[i]
        : newHeap[parent] >= newHeap[i];
      if (comparison) break;

      [newHeap[parent], newHeap[i]] = [newHeap[i], newHeap[parent]];
      setHeap([...newHeap]);
      i = parent;
    }

    sendAlert('success', `${newValue}가 힙에 삽입되었습니다.`);
    setCompareIndices([]);
    setIsAnimating(false);
  };

  const deleteHeapRoot = async () => {
    if (heap.length === 0) {
      sendAlert('info', '힙이 비어 있습니다. 삭제할 요소가 없습니다.');
      return;
    }

    setIsAnimating(true);
    const newHeap = [...heap];
    const rootValue = newHeap[0];
    const lastValue = newHeap.pop();

    if (newHeap.length === 0) {
      setHeap([]);
    } else if (lastValue !== undefined) {
      newHeap[0] = lastValue;
      setHeap([...newHeap]);

      let i = 0;
      while (true) {
        if (2 * i + 1 >= newHeap.length) break;
        const swapIndex = await compareChildren(newHeap, i);

        if (swapIndex === i) break;

        [newHeap[i], newHeap[swapIndex]] = [newHeap[swapIndex], newHeap[i]];
        setHeap([...newHeap]);
        i = swapIndex;
      }
    }

    setCompareIndices([]);
    setIsAnimating(false);

    sendAlert('success', `루트 요소 ${rootValue}이(가) 힙에서 삭제되었습니다.`);
  };

  const compareChildren = async (newHeap: number[], i: number) => {
    const leftChild = 2 * i + 1;
    const rightChild = 2 * i + 2;
    let swapIndex = i;

    setCompareIndices([i, leftChild]);
    await sleep(500);
    if (leftChild < newHeap.length) {
      if (
        (isMinHeap && newHeap[leftChild] < newHeap[swapIndex]) ||
        (!isMinHeap && newHeap[leftChild] > newHeap[swapIndex])
      ) {
        swapIndex = leftChild;
      }
    }

    setCompareIndices([i, rightChild]);
    await sleep(500);
    if (rightChild < newHeap.length) {
      if (
        (isMinHeap && newHeap[rightChild] < newHeap[swapIndex]) ||
        (!isMinHeap && newHeap[rightChild] > newHeap[swapIndex])
      ) {
        swapIndex = rightChild;
      }
    }

    return swapIndex;
  };

  const handleInsert = () => {
    const value = Number(inputValue);
    if (isAnimating) {
      sendAlert('warning', '실행 중에는 입력할 수 없습니다.');
      return;
    }
    if (isNaN(value)) {
      sendAlert('warning', '정수를 입력하세요.');
      return;
    }
    insertHeap(value);
    setInputValue('');
  };

  const handleReset = () => {
    setHeap([]);
    sendAlert('info', '힙이 초기화되었습니다.');
  };

  const toggleHeapType = () => {
    setHeap([]);
    setIsMinHeap(!isMinHeap);
    sendAlert('info', `${isMinHeap ? '최대' : '최소'} 힙으로 변경되었습니다.`);
  };

  useEffect(() => {
    return () => {
      resetAlert();
    };
  }, [resetAlert]);

  return (
    <Layout subTitle="힙 트리(Heap Tree)">
      <HeapTreeCanvas heap={heap} compareIndices={compareIndices} />
      <HeapTreeCanvasUI
        inputValue={inputValue}
        isMinHeap={isMinHeap}
        setInputValue={setInputValue}
        toggleHeapType={toggleHeapType}
        handleInsert={handleInsert}
        handleDelete={deleteHeapRoot}
        handleReset={handleReset}
        isAnimating={isAnimating}
        isHeapEmpty={heap.length === 0}
      />
    </Layout>
  );
};

export default HeapTreePage;
