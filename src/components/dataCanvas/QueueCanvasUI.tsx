import React, { useState, useEffect } from 'react';
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
  gap: 1%;
  position: relative;
  row-gap: 20px;
  padding-bottom: 10px;
  padding-top: 2%;
  padding-bottom: 2%;
`;

interface QueueCanvasUIProps {
  queue: string[];
  inputValue: string;
  queueSize: number;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setQueueSize: React.Dispatch<React.SetStateAction<number>>;
  handlePush: () => void;
  handlePop: () => void;
  handleQueueSize: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const QueueCanvasUI: React.FC<QueueCanvasUIProps> = ({
  queue,
  inputValue,
  queueSize,
  setInputValue,
  handlePush,
  handlePop,
  handleQueueSize,
}) => {
  const [isValidBtnAdd, setIsValidBtnAdd] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setIsValidBtnAdd(value.trim() !== '');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && isValidBtnAdd) {
      handlePush();
    }
  };

  useEffect(() => {
    // Push 버튼 클릭 후 입력 값 검증
    setIsValidBtnAdd(inputValue.trim() !== '');
  }, [inputValue]); // inputValue가 변경될 때마다 검사

  return (
    <StyleCanvasUI>
      <InputBox
        placeholder='추가할 데이터를 입력하세요.'
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        handleKeyPress={handleKeyPress}
        isValidBtnAdd={isValidBtnAdd}
        onclickBtnAdd={handlePush}
      />
      <InputBox
        placeholder='큐 크기를 설정하세요.'
        inputValue={queueSize.toString()}
        handleInputChange={handleQueueSize}
        handleKeyPress={handleKeyPress}
        isValidBtnAdd={true}
      />
      <Button onClick={handlePush} disabled={(!isValidBtnAdd || queueSize === queue.length) && queueSize !== 0}>
        Push
      </Button>
      <Button onClick={handlePop} disabled={queue.length === 0}>
        Pop
      </Button>
    </StyleCanvasUI>
  );
};

export default QueueCanvasUI;
