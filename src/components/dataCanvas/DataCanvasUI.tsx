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

interface DataCanvasUIProps {
  data: string[];
  inputValue: string;
  maxSize: number;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setMaxSize: React.Dispatch<React.SetStateAction<number>>;
  handlePush: () => void;
  handlePop: () => void;
  handleMaxSizeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addItemPlaceholder: string;
  sizePlaceholder: string;
}

const DataCanvasUI: React.FC<DataCanvasUIProps> = ({
  data,
  inputValue,
  maxSize,
  setInputValue,
  handlePush,
  handlePop,
  handleMaxSizeChange,
  addItemPlaceholder,
  sizePlaceholder,
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
    setIsValidBtnAdd(inputValue.trim() !== '');
  }, [inputValue]);

  return (
    <StyleCanvasUI>
      <InputBox
        placeholder={addItemPlaceholder}
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        handleKeyPress={handleKeyPress}
        isValidBtnAdd={isValidBtnAdd}
        onclickBtnAdd={handlePush}
      />
      <InputBox
        placeholder={sizePlaceholder}
        inputValue={maxSize.toString()}
        title={sizePlaceholder}
        handleInputChange={handleMaxSizeChange}
        handleKeyPress={handleKeyPress}
        isValidBtnAdd={true}
      />
      <ButtonWapper>
        <Button 
          onClick={handlePush} 
          disabled={!isValidBtnAdd || (maxSize === data.length && maxSize !== 0)} 
          rightImg={`${process.env.PUBLIC_URL}/images/add-circle.svg`}>
          Push
        </Button>
        <Button 
          onClick={handlePop} 
          disabled={data.length === 0}
          rightImg={`${process.env.PUBLIC_URL}/images/minus-circle.svg`}>
          Pop
        </Button>
      </ButtonWapper>

    </StyleCanvasUI>
  );
};

export default DataCanvasUI;
