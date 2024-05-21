import React, { useEffect, useState } from "react";
import styled from "styled-components";

const InputBox = styled.input`
    display: flex;

    width: 40%;
    height: 10%;

    padding: 1%;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
`;

const Button = styled.button`
    display: flex;
    justify-content: center;
    
    width: 10%;

    padding: 1%;
    background-color: ${(props) => (props.disabled ? "#ccc" : "#007bff")};
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: ${(props) => (props.disabled ? "normal" : "pointer")};
    transition: background-color 0.3s;

    &:hover {
        background-color: ${(props) => (props.disabled ? "#ccc" : "#0056b3")};
    }
`;

interface InputFormProps {
    handleAdd: (inputValue: string) => void;
    handleReset: () => void;
    handleStart: () => void;
}

const InputForm: React.FC<InputFormProps> = ({ handleAdd: handleSubmit, handleReset, handleStart }) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [dataLength, setDataLength] = useState<number>(0);
    
    const [isValidBtnAdd, setIsValidBtnAdd] = useState<boolean>(false);
    const [isValidBtnReset, setIsValidBtnReset] = useState<boolean>(false);

    useEffect(() => {
        setIsValidBtnReset(dataLength > 0);
    }, [dataLength]);
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);

        setIsValidBtnAdd(/^\d+$/.test(value));
    };

    const onclickBtnAdd = () => {
        handleSubmit(inputValue);
        setInputValue('');
        setIsValidBtnAdd(false);
        setDataLength(prev => prev + 1);
    };

    const onclickBtnReset = () => {
        handleReset();
        setDataLength(0);
    };

    
    const onclickBtnStart = () => {
        handleStart();
    };

    return (
        <>
            <InputBox
                type="text"
                placeholder="정수 입력..."
                value={inputValue}
                onChange={handleInputChange}
            />
            <Button onClick={onclickBtnAdd} disabled={!isValidBtnAdd}>Add</Button>
            <Button onClick={onclickBtnReset} disabled={!isValidBtnReset}>Reset</Button>
            <Button onClick={onclickBtnStart} disabled={!isValidBtnReset}>Start</Button>
        </>
    );
};

export default InputForm;
