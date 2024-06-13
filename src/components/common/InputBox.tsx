import React from 'react'
import styled from 'styled-components';
import { useTheme } from '../../context/themeContext';

const InputContainer = styled.div`
    display: flex;
    position: relative;
    width: 20%;
`;

const Input = styled.input<{$isValidBtnAdd: boolean, theme: string}>`
    display: flex;
    width: 100%;
    min-width: 120px;
    min-height: 52px;
    border: none;
    border-bottom: 2px solid ${({ $isValidBtnAdd }) => $isValidBtnAdd ? 'green' : 'red'};
    background-color: ${({ theme }) => (theme === 'light' ? '#ffffff' : '#15202b')};
    font-size: 16px;
    outline: none;
`;

const InputImg = styled.img`
    display: flex;
    position: absolute;
    padding-right: 1%;
    height: 80%;

    right: 0px;
    transform: translate(0, -50%);
    top: 50%;
    cursor: pointer;

`;

interface InputBoxProps {
    inputValue: string;
    isValidBtnAdd: boolean
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onclickBtnAdd: () => void;
}

const InputBox: React.FC<InputBoxProps> = ({ inputValue, isValidBtnAdd, handleInputChange, handleKeyPress, onclickBtnAdd }) => {
    const { theme } = useTheme();

    return (
        <InputContainer>
            <Input
                type="text"
                placeholder="숫자 입력"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}

                $isValidBtnAdd={isValidBtnAdd}
                theme={theme}
                />
            <InputImg src={`${process.env.PUBLIC_URL}/images/input-enter.png`} onClick={onclickBtnAdd} />
        </InputContainer>
    );
}

export default InputBox