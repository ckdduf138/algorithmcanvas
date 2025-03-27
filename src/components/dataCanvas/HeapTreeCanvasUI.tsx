import React from 'react';
import styled from 'styled-components';
import Button from '../common/buttons';
import InputBox from '../common/InputBox';
import SegmentedControl from '../common/segmentedControl';

const StyleCanvasUI = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 30px;
  position: relative;
  row-gap: 30px;
  padding-top: 2%;
  padding-bottom: 2%;
`;

const ButtonWapper = styled.div`
  display: flex;
  gap: 20px;
`;

interface HeapTreeCanvasUIProps {
  inputValue: string;
  isMinHeap: boolean;
  isScroll: boolean;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  toggleHeapType: () => void;
  toggleAutoScroll: () => void;
  handleInsert: () => void;
  handleDelete: () => void;
  handleReset: () => void; // 리셋 핸들러 추가
  isAnimating: boolean; // 애니메이션 상태 추가
  isHeapEmpty: boolean; // 힙이 비어있는지 여부 추가
}


const HeapTreeCanvasUI: React.FC<HeapTreeCanvasUIProps> = ({
  inputValue,
  isMinHeap,
  isScroll,
  setInputValue,
  toggleHeapType,
  toggleAutoScroll,
  handleInsert,
  handleDelete,
  handleReset, // 리셋 핸들러 사용
  isAnimating, // 애니메이션 상태 사용
  isHeapEmpty, // 힙이 비어있는지 여부 사용
}) => {
  const isMinHeapOptions = [
    { value: 'min', label: '최소힙' , disabled: isAnimating},
    { value: 'max', label: '최대힙' , disabled: isAnimating},
  ];
  const isScrollOptions = [
    { value: 'scroll', label: '자동스크롤'},
    { value: 'notScroll', label: '수동스크롤'},
  ];
  return (
    <StyleCanvasUI>
      <InputBox
        placeholder="값 입력"
        inputValue={inputValue}
        handleInputChange={(e) => setInputValue(e.target.value)}
        handleKeyPress={(e) => {
          if (e.key === 'Enter' && !isAnimating) handleInsert();
        }}
        isValidBtnAdd={!!inputValue.trim()}
        onclickBtnAdd={handleInsert}
      />
      <ButtonWapper>
        <Button
          onClick={handleInsert}
          disabled={isAnimating || !inputValue.trim()}
          rightImg={`${process.env.PUBLIC_URL}/images/add-circle.svg`}
        >
          Push
        </Button>
        <Button
          onClick={handleDelete}
          disabled={isAnimating || isHeapEmpty} // 힙이 비어있으면 비활성화
          rightImg={`${process.env.PUBLIC_URL}/images/minus-circle.svg`}
        >
          Pop
        </Button>
        <Button
          onClick={handleReset} // 리셋 버튼 추가
          disabled={isAnimating}
          rightImg={`${process.env.PUBLIC_URL}/images/reset-button.svg`} // 리셋 아이콘 추가
        >
          Reset
        </Button>
      </ButtonWapper>
      <SegmentedControl
          options={isMinHeapOptions}
          selectedValue={isMinHeap ? 'min' : 'max'}
          onChange={toggleHeapType}
        />
      <SegmentedControl
        options={isScrollOptions}
        selectedValue={isScroll ? 'scroll' : 'notScroll'}
        onChange={toggleAutoScroll}
      />
    </StyleCanvasUI>
  );
};

export default HeapTreeCanvasUI;

