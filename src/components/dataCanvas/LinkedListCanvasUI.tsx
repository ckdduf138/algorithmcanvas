import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../common/buttons';
import InputBox from '../common/InputBox';

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
  padding-top: 7%;
  padding-bottom: 2%;
`;

const ButtonWapper = styled.div`
  display: flex;
  gap: 20px;
`;

interface LinkedListCanvasUIProps {
  linkedList: string[];
  inputValue: string;
  inputIndex: number; // 숫자 타입으로 변경
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setInputIndex: React.Dispatch<React.SetStateAction<number>>; // 숫자 타입으로 변경
  handleInsertAtIndex: () => void;
  handleDeleteAtIndex: () => void;
  handleSearchByName: () => void;
  handleSearchByIndex: () => void;
  isAnimating: boolean; // 애니메이션 중인지 여부
}

const LinkedListCanvasUI: React.FC<LinkedListCanvasUIProps> = ({
  linkedList,
  inputValue,
  inputIndex,
  setInputValue,
  setInputIndex,
  handleInsertAtIndex,
  handleDeleteAtIndex,
  handleSearchByName,
  handleSearchByIndex,
  isAnimating, // 애니메이션 상태 전달
}) => {
  const [isValidBtnAdd, setIsValidBtnAdd] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setIsValidBtnAdd(value.trim() !== '');
  };

  const handleIndexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10); // 문자열을 숫자로 변환
    setInputIndex(isNaN(value) ? 0 : value); // 숫자가 유효하지 않으면 기본값 0
  };

  useEffect(() => {
    setIsValidBtnAdd(inputValue.trim() !== '');
  }, [inputValue]);

  return (
    <StyleCanvasUI>
      <InputBox
        placeholder={'데이터를 입력하세요'}
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        handleKeyPress={(e) => {
          if (e.key === 'Enter' && !isAnimating) handleInsertAtIndex(); // 애니메이션 중이 아닐 때만 작동
        }}
        isValidBtnAdd={isValidBtnAdd}
        onclickBtnAdd={handleInsertAtIndex}
      />
      <InputBox
        placeholder={'인덱스를 입력하세요'}
        inputValue={inputIndex.toString()} // 숫자를 문자열로 변환하여 출력
        handleInputChange={handleIndexChange}
        isValidBtnAdd={true}
        title='인덱스'
      />
      <ButtonWapper>
        <Button
          onClick={handleInsertAtIndex}
          disabled={!isValidBtnAdd || isAnimating} // 애니메이션 중일 때 비활성화
          rightImg={`${process.env.PUBLIC_URL}/images/add-circle.svg`}
        >
          삽입
        </Button>
        <Button
          onClick={handleDeleteAtIndex}
          disabled={linkedList.length === 0 || isAnimating} // 애니메이션 중일 때 비활성화
          rightImg={`${process.env.PUBLIC_URL}/images/minus-circle.svg`}
        >
          삭제
        </Button>
        <Button
          onClick={handleSearchByName}
          disabled={linkedList.length === 0 || isAnimating} // 애니메이션 중일 때 비활성화
          rightImg={`${process.env.PUBLIC_URL}/images/search-bar.svg`}
        >
          이름 검색
        </Button>
        <Button
          onClick={handleSearchByIndex}
          disabled={linkedList.length === 0 || isAnimating} // 애니메이션 중일 때 비활성화
          rightImg={`${process.env.PUBLIC_URL}/images/search-bar.svg`}
        >
          인덱스 검색
        </Button>
      </ButtonWapper>
    </StyleCanvasUI>
  );
};

export default LinkedListCanvasUI;
