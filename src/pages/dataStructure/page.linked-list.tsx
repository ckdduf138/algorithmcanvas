import React, { useState } from 'react';
import Layout from '../../components/layout/layout';
import LinkedListCanvas from '../../components/dataCanvas/LinkedListCanvas';
import LinkedListCanvasUI from '../../components/dataCanvas/LinkedListCanvasUI';

const LinkedListPage: React.FC = () => {
  const [linkedList, setLinkedList] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [inputIndex, setInputIndex] = useState<number>(0);
  const [searchIndex, setSearchIndex] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [saveIndex, setSaveIndex] = useState<number>(0);

  const handleInsertAtIndex = () => {
    if (inputValue.trim() === '') {
      alert('추가할 데이터가 필요합니다.');
      return;
    }
    if (inputIndex < 0 || inputIndex > linkedList.length) {
      animateSearchThroughList(() => {
        alert('유효한 인덱스를 입력하세요.');
        // 유효하지 않은 인덱스일 경우 전체 리스트 탐색
        setIsAnimating(false);
      });
      return;
    }

    setSaveIndex(inputIndex);
    setIsAnimating(true);
    animateSearch(inputIndex - 1, () => {
      const newList = [...linkedList];
      newList.splice(inputIndex, 0, inputValue);
      setLinkedList(newList);
      setIsAdding(true);
      setTimeout(() => {
        setIsAdding(false);
        setIsAnimating(false);
      }, 500);
      setInputValue('');
      setSearchIndex(null);
    });
  };

  const handleDeleteAtIndex = () => {
    if (inputIndex < 0 || inputIndex >= linkedList.length) {
      animateSearchThroughList(() => {
        alert('유효한 인덱스를 입력하세요.');
        // 유효하지 않은 인덱스일 경우 전체 리스트 탐색
        setIsAnimating(false);
      });
      return;
    }
    
    setSaveIndex(inputIndex);
    setIsAnimating(true);
    animateSearch(inputIndex - 1, () => {
      setIsRemoving(true);
      setTimeout(() => {
        const newList = [...linkedList];
        newList.splice(inputIndex, 1);
        setLinkedList(newList);
        setIsRemoving(false);
        setIsAnimating(false);
      }, 500);
      setSearchIndex(null);
    });
  };

  const handleSearchByName = () => {
    if (inputValue.trim() === '') {
      alert('데이터를 입력하세요');
      return;
    }
    setIsAnimating(true);
    const index = linkedList.indexOf(inputValue);
    if (index !== -1) {
      animateSearch(index, () => {
        alert(`첫번째 ${inputValue}는 인덱스 ${index}에 있습니다.`);
        setIsAnimating(false);
      });
    } else {
      animateSearchThroughList(() => {
        alert(`${inputValue}을(를) 찾을 수 없습니다.`);
        setIsAnimating(false);
      });
    }
  };

  const handleSearchByIndex = () => {
    const idx = inputIndex;
    if (idx >= 0 && idx < linkedList.length) {
      setIsAnimating(true);
      animateSearch(idx, () => {
        alert(`인덱스 ${idx}의 값은 ${linkedList[idx]}입니다.`);
        setIsAnimating(false);
      });
    } else {
      // 유효하지 않은 인덱스일 경우 전체 리스트 탐색
      animateSearchThroughList(() => {
        setSearchIndex(null);
        alert('유효한 인덱스를 입력하세요.');
        setIsAnimating(false);
      });
    }
  };

  const animateSearch = (targetIndex: number, callback: () => void) => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex > targetIndex) {
        clearInterval(interval);
        setSearchIndex(null);
        callback();
      } else {
        setSearchIndex(currentIndex);
        currentIndex++;
      }
    }, 500);
  };

  const animateSearchThroughList = (callback: () => void) => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex >= linkedList.length) {
        clearInterval(interval);
        setSearchIndex(null);
        callback();
      } else {
        setSearchIndex(currentIndex);
        currentIndex++;
      }
    }, 500);
  };

  return (
    <Layout subTitle="연결리스트(linked-list)">
      <LinkedListCanvas
        linkedList={linkedList}
        searchIndex={searchIndex}
        inputIndex={saveIndex}
        isAdding={isAdding}
        isRemoving={isRemoving}
      />
      <LinkedListCanvasUI
        linkedList={linkedList}
        inputValue={inputValue}
        inputIndex={inputIndex}
        setInputValue={setInputValue}
        setInputIndex={setInputIndex}
        handleInsertAtIndex={handleInsertAtIndex}
        handleDeleteAtIndex={handleDeleteAtIndex}
        handleSearchByName={handleSearchByName}
        handleSearchByIndex={handleSearchByIndex}
        isAnimating={isAnimating}
      />
    </Layout>
  );
};

export default LinkedListPage;
