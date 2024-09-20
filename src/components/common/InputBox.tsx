import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/themeContext';

const InputContainer = styled.div`
    display: flex;
    position: relative;
    width: 400px;
    max-width: 100%;
`;

const Input = styled.input<{$isValidBtnAdd: boolean, theme: string}>`
    width: 100%;
    padding: 1rem 2rem;
    min-height: 42px;
    border: 1px solid ${({ $isValidBtnAdd }) => $isValidBtnAdd ? 'green' : 'red'};
    background-color: ${({ theme }) => (theme === 'light' ? '#ffffff' : '#15202b')};
    border-radius: 50px;
    color: ${({ theme }) => (theme === 'light' ? 'black' : 'white')};
    font-size: 16px;
    outline: 2px solid ${({ $isValidBtnAdd }) => $isValidBtnAdd ? 'green' : 'red'};

    &::placeholder {
        color: ${({ theme }) => (theme === 'light' ? 'black' : 'white')};
    }

    &:focus {
        outline: 4px solid ${({ $isValidBtnAdd }) => $isValidBtnAdd ? 'green' : 'red'};;
    }
`;


const SvgButton = styled.button<{$isValidBtnAdd: boolean}>`
    position: absolute;
    top: 10%;
    right: 5px;
    height: 80%;
    aspect-ratio: 1;
    border-radius: 50px;
    border: none;
    cursor: ${({ $isValidBtnAdd }) => $isValidBtnAdd ? 'pointer' : ''};
    opacity: ${({ $isValidBtnAdd }) => $isValidBtnAdd ? 1 : 0.5};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s;

    &:hover {
        opacity: 0.8;
    }

    svg {
        width: 28px;
        height: 28px;
        stroke: black;
        stroke-width: 2;
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
    }
`;

interface InputBoxProps {
    placeholder: string;
    inputValue: string;
    isValidBtnAdd: boolean;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onclickBtnAdd: () => void;
}

const InputBox: React.FC<InputBoxProps> = ({ placeholder, inputValue, isValidBtnAdd, handleInputChange, handleKeyPress, onclickBtnAdd }) => {
    const { theme } = useTheme();

    return (
        <InputContainer>
            <Input
                type='text'
                placeholder={placeholder}
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                $isValidBtnAdd={isValidBtnAdd}
                theme={theme}
            />
            <SvgButton
                onClick={isValidBtnAdd ? onclickBtnAdd : undefined}
                $isValidBtnAdd={isValidBtnAdd}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12h14"></path>
                    <path d="M13 18l6 -6"></path>
                    <path d="M13 6l6 6"></path>
                </svg>
            </SvgButton>
        </InputContainer>
    );
}

export default InputBox;
