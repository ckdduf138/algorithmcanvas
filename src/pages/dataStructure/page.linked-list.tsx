import React, { useState } from 'react';
import Layout from '../../components/layout/layout';
import LinkedListCanvas from '../../components/dataCanvas/LinkedListCanvas';
import LinkedListCanvasUI from '../../components/dataCanvas/LinkedListCanvasUI';

const LinkedListPage: React.FC = () => {
  const [linkedList, setLinkedList] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [inputIndex, setInputIndex] = useState<number>(0);
  const [searchIndex, setSearchIndex] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false); // 추가된 상태
  const [isRemoving, setIsRemoving] = useState(false); // 삭제된 상태
  const [isAnimating, setIsAnimating] = useState(false); // 애니메이션 상태
  const [saveIndex, setSaveIndex] = useState<number>(0);

  const handleInsertAtIndex = () => {
    if (inputValue.trim() === '') {
      alert('추가할 데이터가 필요합니다.');
      return;
    }
    if (inputIndex < 0 || inputIndex > linkedList.length) {
      alert('유효한 인덱스를 입력하세요.');
      return;
    }

    setSaveIndex(inputIndex);

    setIsAnimating(true); // 애니메이션 시작
    // 탐색 애니메이션 먼저 실행
    animateSearch(inputIndex - 1, () => {
      // 탐색 애니메이션 후 리스트 업데이트
      const newList = [...linkedList];
      newList.splice(inputIndex, 0, inputValue);
      setLinkedList(newList); // 리스트 업데이트 후

      // 리스트 업데이트가 완료된 후 삽입 애니메이션 실행
      setIsAdding(true); // fadeIn 애니메이션 시작
      setTimeout(() => {
        setIsAdding(false); // 애니메이션 종료
        setIsAnimating(false); // 모든 애니메이션 종료
      }, 500); // fade 애니메이션 시간과 맞춤
      setInputValue('');
      setSearchIndex(null);
    });
  };

  const handleDeleteAtIndex = () => {
    if (inputIndex < 0 || inputIndex >= linkedList.length) {
      alert('유효한 인덱스를 입력하세요.');
      return;
    }
    setSaveIndex(inputIndex);
    setIsAnimating(true); // 애니메이션 시작
    // 탐색 애니메이션 먼저 실행
    animateSearch(inputIndex - 1, () => {
      // 탐색 애니메이션 후 삭제 진행
      setIsRemoving(true); // fadeOut 애니메이션 시작
      setTimeout(() => {
        const newList = [...linkedList];
        newList.splice(inputIndex, 1);
        setLinkedList(newList);
        setIsRemoving(false); // 애니메이션 종료
        setIsAnimating(false); // 모든 애니메이션 종료
      }, 500); // fade 애니메이션 시간에 맞춤
      setSearchIndex(null);
    });
  };

  const handleSearchByName = () => {
    if (inputValue.trim() === '') {
      alert('데이터를 입력하세요');
      return;
    }
    setIsAnimating(true); // 애니메이션 시작
    const index = linkedList.indexOf(inputValue);
    if (index !== -1) {
      animateSearch(index, () => {
        alert(`첫번째 ${inputValue}는 인덱스 ${index}에 있습니다.`);
        setIsAnimating(false); // 애니메이션 종료
      });
    } else {
      setSearchIndex(null);
      alert(`${inputValue}을(를) 찾을 수 없습니다.`);
      setIsAnimating(false); // 애니메이션 종료
    }
  };

  const handleSearchByIndex = () => {
    const idx = inputIndex;
    if (idx >= 0 && idx < linkedList.length) {
      setIsAnimating(true); // 애니메이션 시작
      animateSearch(idx, () => {
        alert(`인덱스 ${idx}의 값은 ${linkedList[idx]}입니다.`);
        setIsAnimating(false); // 애니메이션 종료
      });
    } else {
      setSearchIndex(null);
      alert('유효한 인덱스를 입력하세요.');
    }
  };

  const animateSearch = (targetIndex: number, callback: () => void) => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex > targetIndex) {
        clearInterval(interval);
        setSearchIndex(null); // 마지막 인덱스 후 검색 인덱스 초기화
        callback(); // 애니메이션 후 콜백 호출
      } else {
        setSearchIndex(currentIndex);
        currentIndex++;
      }
    }, 500); // 0.5초 간격
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
        isAnimating={isAnimating} // 애니메이션 상태 전달
      />
    </Layout>
  );
};

export default LinkedListPage;
