import React, { useState } from 'react';
import Layout from '../../components/layout/layout';
import HeapTreeCanvas from '../../components/dataCanvas/HeapTreeCanvas';
import HeapTreeCanvasUI from '../../components/dataCanvas/HeapTreeCanvasUI';

const HeapTreePage: React.FC = () => {
  const [heap, setHeap] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isMinHeap, setIsMinHeap] = useState<boolean>(true); // 최소힙(true) 또는 최대힙(false)
  const [compareIndices, setCompareIndices] = useState<number[]>([]); // 현재 비교 중인 인덱스들
  const [isAnimating, setIsAnimating] = useState<boolean>(false); // 애니메이션 진행 중 여부

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // 최소힙 삽입 로직 (애니메이션 추가)
  const insertMinHeap = async (newValue: number) => {
    setIsAnimating(true); // 애니메이션 시작
    const newHeap = [...heap, newValue];
    let i = newHeap.length - 1;

    setHeap(newHeap);

    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      setCompareIndices([i, parent]); // 비교 중인 노드들 표시
      await sleep(500); // 애니메이션 대기 시간

      if (newHeap[parent] <= newHeap[i]) break;
      [newHeap[parent], newHeap[i]] = [newHeap[i], newHeap[parent]];
      setHeap([...newHeap]); // 변경 사항 반영
      i = parent;
    }

    setCompareIndices([]); // 비교 끝
    setIsAnimating(false); // 애니메이션 종료
  };

  // 최대힙 삽입 로직 (애니메이션 추가)
  const insertMaxHeap = async (newValue: number) => {
    setIsAnimating(true); // 애니메이션 시작
    const newHeap = [...heap, newValue];
    let i = newHeap.length - 1;

    setHeap(newHeap);

    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      setCompareIndices([i, parent]); // 비교 중인 노드들 표시
      await sleep(500); // 애니메이션 대기 시간

      if (newHeap[parent] >= newHeap[i]) break;
      [newHeap[parent], newHeap[i]] = [newHeap[i], newHeap[parent]];
      setHeap([...newHeap]); // 변경 사항 반영
      i = parent;
    }

    setCompareIndices([]); // 비교 끝
    setIsAnimating(false); // 애니메이션 종료
  };

  const deleteHeapRoot = async () => {
    if (heap.length === 0) return;
    setIsAnimating(true); // 애니메이션 시작
  
    const newHeap = [...heap];
    const lastValue = newHeap.pop();
    if (lastValue !== undefined) {
      newHeap[0] = lastValue;
      setHeap([...newHeap]);
  
      let i = 0;
      while (true) {
        const smallestOrLargest = await compareChildren(newHeap, i);
        if (smallestOrLargest === i) break;
  
        [newHeap[i], newHeap[smallestOrLargest]] = [newHeap[smallestOrLargest], newHeap[i]];
        setHeap([...newHeap]); // 변경 사항 반영
        i = smallestOrLargest;
      }
    }
    
    setCompareIndices([]); // 비교 끝
    setIsAnimating(false); // 애니메이션 종료
  };
  
  const compareChildren = async (newHeap: number[], i: number) => {
    const leftChild = 2 * i + 1;
    const rightChild = 2 * i + 2;
    let smallestOrLargest = i;
  
    // Left child comparison
    setCompareIndices([i, leftChild]);
    await sleep(500); // 애니메이션 대기 시간
    if (leftChild < newHeap.length) {
      if (isMinHeap && newHeap[leftChild] < newHeap[smallestOrLargest]) {
        smallestOrLargest = leftChild;
      } else if (!isMinHeap && newHeap[leftChild] > newHeap[smallestOrLargest]) {
        smallestOrLargest = leftChild;
      }
    }
    // Right child comparison
    setCompareIndices([i, rightChild]);
    await sleep(500); // 애니메이션 대기 시간
    if (rightChild < newHeap.length) {
      if (isMinHeap && newHeap[rightChild] < newHeap[smallestOrLargest]) {
        smallestOrLargest = rightChild;
      } else if (!isMinHeap && newHeap[rightChild] > newHeap[smallestOrLargest]) {
        smallestOrLargest = rightChild;
      }
    }
  
    return smallestOrLargest;
  };
  

  const handleInsert = () => {
    const value = Number(inputValue);
    if(isAnimating){
      alert('실행 중에는 입력할 수 없습니다.');
      return;
    }
    if (isNaN(value)) {
      alert('숫자를 입력하세요.');
      return;
    }
    isMinHeap ? insertMinHeap(value) : insertMaxHeap(value);
    setInputValue('');
  };

  const toggleHeapType = () => {
    setHeap([]);  // 힙을 초기화
    setIsMinHeap(!isMinHeap);
  };

  return (
    <Layout subTitle='힙 트리(Heap Tree)'>
      <HeapTreeCanvas heap={heap} compareIndices={compareIndices} />
      <HeapTreeCanvasUI
        inputValue={inputValue}
        isMinHeap={isMinHeap}
        setInputValue={setInputValue}
        toggleHeapType={toggleHeapType}
        handleInsert={handleInsert}
        handleDelete={deleteHeapRoot}
        isAnimating={isAnimating} // 애니메이션 상태 전달
        isHeapEmpty={heap.length === 0} // 힙 비어있는지 여부 전달
      />
    </Layout>
  );
};

export default HeapTreePage;
