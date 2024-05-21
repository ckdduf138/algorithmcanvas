import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/themeContext';

const ToggleLabel = styled.label<{ theme: string }>`
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;

    & input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    & input:checked + span {
        background-color: ${({ theme: themeType }) => (themeType === 'light' ? '#2196F3' : '#bbb')};
    }

    & input:checked + span:before {
        transform: translateX(26px);
    }
`;

const ToggleSlider = styled.span<{ theme: string }>`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme: themeType }) => (themeType === 'light' ? '#ccc' : '#15202b')};
    transition: .4s;
    border-radius: 34px;

    &:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: ${({ theme: themeType }) => (themeType === 'light' ? '#fff' : '#000')};
        transition: .4s;
        border-radius: 50%;
    }
`;

interface ToggleSwitchProps {
    onToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ onToggle }) => {
    const { theme } = useTheme();

    return (
        <ToggleLabel theme={theme}>
            <input type="checkbox" checked={theme === 'dark'} onChange={onToggle} />
            <ToggleSlider theme={theme} />
        </ToggleLabel>
    );
};

export default ToggleSwitch;
