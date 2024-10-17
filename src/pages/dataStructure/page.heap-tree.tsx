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
    if (heap.length === 0) return; // 힙이 비어있으면 아무것도 하지 않음
    setIsAnimating(true); // 애니메이션 시작
    
    const newHeap = [...heap];
    const lastValue = newHeap.pop();
  
    // 루트만 남아있을 경우 바로 삭제 처리
    if (newHeap.length === 0) {
      setHeap([]); // 힙을 빈 배열로 설정 (루트 삭제)
    } else if (lastValue !== undefined) {
      newHeap[0] = lastValue; // 마지막 값을 루트로 대체
      setHeap([...newHeap]); // 새로운 힙 설정
  
      let i = 0;
      while (true) {
        // 리프 노드에 도달했는지 확인 (리프 노드는 자식이 없는 노드)
        if (2 * i + 1 >= newHeap.length) {
          break; // 리프 노드에 도달하면 애니메이션을 스킵하고 루프 종료
        }
  
        const smallestOrLargest = await compareChildren(newHeap, i); // 자식들과 비교하여 가장 작은/큰 값 선택
  
        if (smallestOrLargest === i) {
          // 애니메이션을 스킵하고 루프 종료
          break;
        }
  
        // 애니메이션을 보여줄 필요가 없으면, 즉시 교체하고 루프를 계속
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
    if (isAnimating) {
      alert('실행 중에는 입력할 수 없습니다.');
      return;
    }
    if (inputValue.trim() === '') { // 값이 없으면
      alert('값을 입력하세요.'); // 경고 메시지
      return;
    }
    if (isNaN(value)) {
      alert('숫자를 입력하세요.');
      return;
    }
    isMinHeap ? insertMinHeap(value) : insertMaxHeap(value);
    setInputValue('');
  };

  const handleReset = () => {
    setHeap([]);  // 힙을 초기화
  }

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
        handleReset={handleReset}
        isAnimating={isAnimating} // 애니메이션 상태 전달
        isHeapEmpty={heap.length === 0} // 힙 비어있는지 여부 전달
      />
    </Layout>
  );
};

export default HeapTreePage;
