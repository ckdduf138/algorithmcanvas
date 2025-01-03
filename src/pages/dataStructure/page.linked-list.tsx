import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/layout';
import LinkedListCanvas from '../../components/dataCanvas/LinkedListCanvas';
import LinkedListCanvasUI from '../../components/dataCanvas/LinkedListCanvasUI';
import { useAlert } from '../../context/alertContext';

const LinkedListPage: React.FC = () => {
  const [linkedList, setLinkedList] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [inputIndex, setInputIndex] = useState<number>(0);
  const [searchIndex, setSearchIndex] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [saveIndex, setSaveIndex] = useState<number>(0);
  const { sendAlert, resetAlert } = useAlert();

  const handleIndexOperation = (operation: 'insert' | 'delete') => {
    const currentInputIndex = inputIndex;
  
    if (currentInputIndex < 0 || (operation === 'insert' && currentInputIndex > linkedList.length) || (operation === 'delete' && currentInputIndex >= linkedList.length)) {
      animateSearch(linkedList.length, () => {
        sendAlert('warning', '유효한 인덱스를 입력하세요.');
        setIsAnimating(false);
      });
      return;
    }
  
    setSaveIndex(currentInputIndex);
    setIsAnimating(true);
    
    // 애니메이션 실행
    animateSearch(currentInputIndex - 1, () => {
      if (operation === 'insert') {
        const inputedElement = inputValue;
        const newList = [...linkedList];
        newList.splice(currentInputIndex, 0, inputValue);
        setLinkedList(newList);
        setIsAdding(true);
        
        setTimeout(() => {
          setIsAdding(false);
          setIsAnimating(false);
        }, 500);
        
        setInputValue('');
        setSearchIndex(null);
        sendAlert('success', `인덱스 ${currentInputIndex}에 ${inputedElement}(이)가 연결 리스트에 추가되었습니다.`);
      } else if (operation === 'delete') {
        setIsRemoving(true);
        setTimeout(() => {
          const deletedElement = linkedList[currentInputIndex];
          const newList = [...linkedList];
          newList.splice(currentInputIndex, 1);
          setLinkedList(newList);
          setIsRemoving(false);
          setIsAnimating(false);
          sendAlert('success', `인덱스 ${currentInputIndex}의 ${deletedElement}(이)가 연결 리스트에서 삭제되었습니다.`);
        }, 500);
        setSearchIndex(null);
      }
    });
  };
  
  const handleInsertAtIndex = () => {
    if (inputValue.trim() === '') {
      sendAlert('info', '추가할 데이터를 입력하세요.');
      return;
    }
    handleIndexOperation('insert');
  };
  
  const handleDeleteAtIndex = () => {
    handleIndexOperation('delete');
  };

  const handleSearchByName = () => {
    if (inputValue.trim() === '') {
      sendAlert('info', '검색할 데이터를 입력하세요.');
      return;
    }
    setIsAnimating(true);
    const index = linkedList.indexOf(inputValue);
    if (index !== -1) {
      animateSearch(index, () => {
        sendAlert('success', `첫 번째 ${inputValue}는 인덱스 ${index}에 있습니다.`);
        setIsAnimating(false);
      });
    } else {
      animateSearch(linkedList.length, () => {
        sendAlert('warning', `${inputValue}을(를) 찾을 수 없습니다.`);
        setIsAnimating(false);
      });
    }
  };

  const handleSearchByIndex = () => {
    const idx = inputIndex;
    if (idx >= 0 && idx < linkedList.length) {
      setIsAnimating(true);
      animateSearch(idx, () => {
        sendAlert('success', `인덱스 ${idx}의 값은 ${linkedList[idx]}입니다.`);
        setIsAnimating(false);
      });
    } else {
      animateSearch(linkedList.length, () => {
        setSearchIndex(null);
        sendAlert('warning', '유효한 인덱스를 입력하세요.');
        setIsAnimating(false);
      });
    }
  };

  const animateSearch = (targetIndex: number, callback: () => void) => { 
    let currentIndex = 0;

    if (targetIndex === -1) {
        setSearchIndex(null);
        callback();
        return;
    }

    if (targetIndex < -1) {
        sendAlert('warning', '유효한 인덱스를 입력하세요.');
        setSearchIndex(null);
        callback();
        return;
    }

    setSearchIndex(currentIndex);
    currentIndex++;

    const interval = setInterval(() => {
        if (currentIndex > targetIndex) {
            clearInterval(interval);
            setSearchIndex(null);
            callback();
        } else {
            setSearchIndex(currentIndex);
            currentIndex++;
        }
    }, 1000);
  };

  useEffect(() => {
    return () => {
      resetAlert();
    };
  }, [resetAlert]);

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
