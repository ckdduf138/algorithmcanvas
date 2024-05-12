import React, { useState } from 'react';
import styled from 'styled-components';
import BarCanvas from '../common/bar_canvas';
import { useWindowSize } from '../../hooks/getWindowSize';

const StyleCanvasMain = styled.div`
    width: 100%;
    height: 85%;

    display: flex;
    justify-content: center;
`

const StyleCanvasUI = styled.div`
    width: 100%;
    height: 15%;
    
    display: flex;
    align-items: center;
    flex-direction: column;
`

const InputBox = styled.input`
    margin-bottom: 10px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

interface InputFormProps {
    handleSubmit: (inputValue: string) => void;
}

const InputForm: React.FC<InputFormProps> = ({ handleSubmit }) => {

    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleFormSubmit = () => {
        handleSubmit(inputValue);
    };

    return (
        <>
            <InputBox
                type="text"
                placeholder="Enter something..."
                value={inputValue}
                onChange={handleInputChange}
            />
            <Button onClick={handleFormSubmit}>Add</Button>
        </>
    );
};

const Selection_Sort_Canvas: React.FC = () => {
    const { width, height } = useWindowSize();
    const [data, setData] = useState<number[]>([]);
    
    const handleSubmit = (inputValue: string) => {
        const newData = [...data, parseInt(inputValue)];
        setData(newData);
    };

    return (
        <>
            <StyleCanvasMain>
                <BarCanvas data={data} width={width * 0.8} height={height * 0.7} />
            </StyleCanvasMain>
            <StyleCanvasUI>
                <InputForm handleSubmit={handleSubmit} />
            </StyleCanvasUI>
        </>
    );
};

export default Selection_Sort_Canvas;
