import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/themeContext';

interface RadioButtonProps {
    value: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
}

const RadioInput = styled.input`
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ccc;
    outline: none;
    margin-right: 5px;
    cursor: pointer;

    &:checked {
        border-color: #007bff;
        background-color: #007bff;
    }
`;

const RadioLabel = styled.label`
    display: flex;
    align-items: center;
    margin-right: 10px;
    cursor: pointer;
`;

const RadioButton: React.FC<RadioButtonProps> = ({ value, checked, onChange, label }) => {
    const { theme } = useTheme();

    return (
        <RadioLabel>
            <RadioInput type="radio" value={value} checked={checked} onChange={onChange} />
            <span style={{ color: theme === 'light' ? '#000' : '#fff' }}>{label}</span>
        </RadioLabel>
    );
};

export default RadioButton;
