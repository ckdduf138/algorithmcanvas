import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/themeContext';
import { ReactSVG } from 'react-svg';

const ToggleWContainer = styled.div`
    display: flex;
    gap: 8px;
`;

const ToggleImgWapper = styled.div<{ $theme: string }>`
    svg {
        width: 26px;
    }
    
    svg path {
        stroke: ${({ $theme }) => ($theme === 'light' ? '#1e1e1e' : '#fff')};
    }
`;

const ToggleLabel = styled.label<{ $theme: string }>`
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
        background-color: ${({ $theme }) => ($theme === 'light' ? '#2196F3' : '#bbb')};
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
        background-color: #fff;
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
        <ToggleWContainer>
            <ToggleImgWapper $theme={theme}>
                <ReactSVG src={`${process.env.PUBLIC_URL}/images/dark-light-toggle-sun.svg`} /> 
            </ToggleImgWapper>

            <ToggleLabel $theme={theme}>
                <input type="checkbox" checked={theme === 'dark'} onChange={onToggle} />
                <ToggleSlider theme={theme} />
            </ToggleLabel>
            
            <ToggleImgWapper $theme={theme}>
                <ReactSVG src={`${process.env.PUBLIC_URL}/images/dark-light-toggle-moon.svg`} /> 
            </ToggleImgWapper>

        </ToggleWContainer>

    );
};

export default ToggleSwitch;
