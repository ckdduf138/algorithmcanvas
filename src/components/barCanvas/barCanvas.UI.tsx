import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../common/buttons";
import RadioButton from "../common/radioButton";
import DelaySlider from "../common/delaySlider";

const InputBox = styled.input`
    display: flex;
    width: 10%;
    height: 10%;
    padding: 1%;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
`;

const RadioContainer = styled.div`
    display: flex;
`;

interface CanvasUIProps {
    handleAdd: (inputValue: string) => void;
    handleReset: () => void;
    setSortOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
    handleStart: () => void;
    handleDelay: (delay: number) => void;
}

const BarCanvasUI: React.FC<CanvasUIProps> = ({ handleAdd, handleReset, setSortOrder, handleStart, handleDelay }) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [dataLength, setDataLength] = useState<number>(0);
    const [isValidBtnAdd, setIsValidBtnAdd] = useState<boolean>(false);
    const [isValidBtnReset, setIsValidBtnReset] = useState<boolean>(false);
    const [isAscending, setIsAscending] = useState<boolean>(false);

    useEffect(() => {
        setIsValidBtnReset(dataLength > 0);
    }, [dataLength]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        setIsValidBtnAdd(/^\d+$/.test(value));
    };

    const onclickBtnAdd = () => {
        handleAdd(inputValue);
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

    const handleSetSort = (event: React.ChangeEvent<HTMLInputElement>) => {
        const sortOrder = event.target.value as "asc" | "desc";
        setSortOrder(sortOrder);
        setIsAscending(sortOrder === "asc");
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && isValidBtnAdd) {
            onclickBtnAdd();
        }
    };

    const handleDelayChange = (value: number) => {
        handleDelay(value);
    };

    return (
        <>
            <InputBox
                type="text"
                placeholder="정수 입력..."
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
            <Button onClick={onclickBtnAdd} disabled={!isValidBtnAdd}>Add</Button>
            <Button onClick={onclickBtnReset} disabled={!isValidBtnReset}>Reset</Button>
            <Button onClick={onclickBtnStart} disabled={!isValidBtnReset}>Start</Button>
            <RadioContainer>
                <RadioButton value="asc" checked={isAscending} onChange={handleSetSort} label="오름차순" />
                <RadioButton value="desc" checked={!isAscending} onChange={handleSetSort} label="내림차순" />
            </RadioContainer>
            <DelaySlider onDelayChange={handleDelayChange}/>            
        </>
    );
};

export default BarCanvasUI;
