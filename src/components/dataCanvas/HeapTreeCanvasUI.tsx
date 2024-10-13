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
  row-gap: 20px;
  padding-top: 2%;
  padding-bottom: 2%;
`;

const ButtonWapper = styled.div`
  display: flex;
  gap: 20px;
`;

const ToggleLabel = styled.label`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const ToggleSwitch = styled.input`
  margin-left: 10px;
  width: 40px;
  height: 20px;
  -webkit-appearance: none;
  appearance: none;
  background-color: #ccc;
  border-radius: 15px;
  position: relative;
  outline: none;
  cursor: pointer;
  &:checked {
    background-color: #007bff;
  }
  &::before {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: white;
    top: 1px;
    left: 1px;
    transition: 0.3s;
  }
  &:checked::before {
    transform: translateX(20px);
  }
`;

interface HeapTreeCanvasUIProps {
  inputValue: string;
  isMinHeap: boolean;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  toggleHeapType: () => void;
  handleInsert: () => void;
  handleDelete: () => void;
  isAnimating: boolean; // 애니메이션 상태 추가
  isHeapEmpty: boolean; // 힙이 비어있는지 여부 추가
}
const options = [
  { value: 'min', label: '최소힙' },
  { value: 'max', label: '최대힙' },
];
const HeapTreeCanvasUI: React.FC<HeapTreeCanvasUIProps> = ({
  inputValue,
  isMinHeap,
  setInputValue,
  toggleHeapType,
  handleInsert,
  handleDelete,
  isAnimating, // 애니메이션 상태 사용
  isHeapEmpty, // 힙이 비어있는지 여부 사용
}) => {
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
        <Button onClick={handleInsert}
          disabled={isAnimating}
          rightImg={`${process.env.PUBLIC_URL}/images/add-circle.svg`}>
          Push
        </Button>
        <Button onClick={handleDelete}
          disabled={isAnimating || isHeapEmpty} // 힙이 비어있으면 비활성화
          rightImg={`${process.env.PUBLIC_URL}/images/minus-circle.svg`}>
          Pop
        </Button>
        <SegmentedControl
            options={options}
            selectedValue={isMinHeap ? 'min' : 'max'}
            onChange={toggleHeapType}
        />
      </ButtonWapper>
    </StyleCanvasUI>
  );
};

export default HeapTreeCanvasUI;
