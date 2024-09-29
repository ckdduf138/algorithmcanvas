import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/themeContext';

export interface SegmentOption {
    value: string;
    label: string;
    disabled?: boolean;
}

const SegmentedControlWrapper = styled.div`
    display: flex;
    border: 2px solid #ccc;
    border-radius: 25px;
    overflow: hidden;
    min-width: 200px;
    min-height: 42px;
`;

const SegmentedOption = styled.div<{ $selected: boolean; $theme: string, $disabled?: boolean, $optionCount: number }>`
    display: flex;
    min-width: ${({$optionCount}) => 100 / $optionCount}%;
    cursor: pointer;
    text-align: center;
    align-items: center;
    justify-content: center;
    background-color: ${({ $selected, $theme }) => ($selected ? ($theme === 'light' ? '#007bff' : '#555') : 'transparent')};
    color: ${({ $selected, $theme }) => ($selected ? '#fff' : $theme === 'light' ? '#000' : '#ccc')};
    font-size: 14px;
    transition: background-color 0.3s ease, color 0.3s ease;
    border-right: 1px solid #ccc;
    user-select: none;
    
    &:last-child {
        border-right: none;
    }

    &:hover {
        background-color: ${({ $theme }) => ($theme === 'light' ? '#e7e7e7' : '#666')};
    }

    ${({ $disabled }) => $disabled && `
        cursor: not-allowed;
        opacity: 0.5;
    `}
`;

interface SegmentedControlProps {
    options: SegmentOption[];
    selectedValue: string;
    onChange: (value: string) => void;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({ options, selectedValue, onChange }) => {
    const { theme } = useTheme();

    return (
        <SegmentedControlWrapper>
            {options.map((option) => (
                <SegmentedOption
                    key={option.value}
                    $selected={selectedValue === option.value}
                    $theme={theme}
                    $disabled={option.disabled}
                    $optionCount={options.length}
                    onClick={() => !option.disabled && onChange(option.value)}
                >
                    {option.label}
                </SegmentedOption>
            ))}
        </SegmentedControlWrapper>
    );
};

export default SegmentedControl;
