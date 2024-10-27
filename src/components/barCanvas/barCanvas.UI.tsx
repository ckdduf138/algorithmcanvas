import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Button from "../common/buttons";
import DelaySlider from "../common/delaySlider";
import InputBox from "../common/InputBox";
import SegmentedControl from "../common/segmentedControl";

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
    padding-bottom: 10px;
    padding-top: 2%;
    padding-bottom: 2%;
`;

interface CanvasUIProps {
    handleAdd: (inputValue: string) => void;
    handleReset: () => void;
    setSortOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
    handleStart: () => void;
    handleRandom: () => void;
    handleDelay: (delay: number) => void;
    handlePause?: () => void;
    handleResume?: () => void;
    handleStop?: () => void;
}

const BarCanvasUI: React.FC<CanvasUIProps> = ({ handleAdd, handleReset, setSortOrder, handleStart, handleRandom, handleDelay, handlePause, handleResume, handleStop }) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [dataLength, setDataLength] = useState<number>(0);
    const [isAscending, setIsAscending] = useState<string>('asc');

    const [isValidBtnAdd, setIsValidBtnAdd] = useState<boolean>(false);
    const [isValidBtnReset, setIsValidBtnReset] = useState<boolean>(false);
    const [isValidBtnRandom, setIsValidBtnRandom] = useState<boolean>(true);
    const [isValidBtnStart, setIsValidBtnStart] = useState<boolean>(false);

    const isRunning = useRef<'play' | 'pause' | 'ready'>('ready');

    useEffect(() => {
        setIsValidBtnReset(dataLength > 0);
    }, [dataLength]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        setIsValidBtnAdd(/^\d+$/.test(value));
    };

    const onclickBtnAdd = () => {
        if (isValidBtnAdd === false) return;
        if (dataLength !== 0 && isRunning.current !== 'ready') return;
        
        handleAdd(inputValue);
        setInputValue('');

        setIsValidBtnAdd(false);
        setIsValidBtnStart(true);

        setDataLength(prev => prev + 1);
    };

    const onclickBtnReset = () => {
        handleReset();
        setDataLength(0);

        setIsValidBtnReset(false);
        setIsValidBtnStart(false);
    };

    const onclickBtnStart = async () => {
        if(isRunning.current === 'ready') {
            isRunning.current = 'play';

            setIsValidBtnAdd(false);
            setIsValidBtnReset(false);
            setIsValidBtnRandom(false);

            if(handleStop)
            handleStop();
            
            await handleStart();
    
            setIsValidBtnReset(true);
            setIsValidBtnRandom(true);
            setIsValidBtnStart(true);
        }
        else if(isRunning.current === 'play') {
            isRunning.current = 'pause';

            if(handlePause) handlePause();
        }
        else if(isRunning.current === 'pause') {
            isRunning.current = 'play';

            if(handleResume) handleResume();
        }
    };

    const onclickBtnRandom = async () => {
        isRunning.current = 'ready';

        if(handleStop)
        handleStop();

        handleRandom();
        setDataLength(20);

        setIsValidBtnReset(true);
        setIsValidBtnStart(true);
    };
    
    const handleSetSort = (value: string) => {
        setSortOrder(value as "asc" | "desc");
        setIsAscending(value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && isValidBtnAdd) {
            onclickBtnAdd();
        }
    };

    const handleDelayChange = (value: number) => {
        handleDelay(value);
    };

    const options = [
        { value: 'asc', label: '오름차순' },
        { value: 'desc', label: '내림차순' },
      ];

    return (
        <StyleCanvasUI>
            <InputBox
                placeholder='추가할 데이터를 입력하세요.'
                inputValue={inputValue}
                handleInputChange={handleInputChange}
                onclickBtnAdd={onclickBtnAdd}
                handleKeyPress={handleKeyPress}
                isValidBtnAdd={isValidBtnAdd}
            />
            <Button 
                disabled={!isValidBtnStart} 
                rightImg={isRunning.current === 'play' ? `${process.env.PUBLIC_URL}/images/pause-button.svg` : `${process.env.PUBLIC_URL}/images/play-button.svg`} 
                onClick={onclickBtnStart}>{isRunning.current === 'play' ? 'Pause' : 'Play'}
            </Button> 

            <Button disabled={!isValidBtnRandom} rightImg={`${process.env.PUBLIC_URL}/images/shuffle-button.svg`} onClick={onclickBtnRandom}>Random</Button>
            <Button disabled={!isValidBtnReset} rightImg={`${process.env.PUBLIC_URL}/images/reset-button.svg`} onClick={onclickBtnReset}>Reset</Button>

            <SegmentedControl options={options} selectedValue={isAscending} onChange={handleSetSort} />

            <DelaySlider onDelayChange={handleDelayChange}/>            
        </ StyleCanvasUI>
    );
};

export default BarCanvasUI;
