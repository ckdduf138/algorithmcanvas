import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../../context/themeContext';
import ToggleSwitch from '../common/toggleSwitch';

const StyledHeader = styled.header<{ theme: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => (theme === 'light' ? '#ffffff' : '#15202b')};
    text-align: center;
    text-transform: uppercase;
    font-family: 'Raleway', fantasy;
    position: relative;
    width: 100%;
    height: 10%;
    color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
`;

const HeadTitle = styled.div`
    letter-spacing: 30px;
    cursor: pointer;
    font-size: 30px;
`;

const ToggleContainer = styled.div`
    position: absolute;
    right: 2%;
    display: flex;
    align-items: center;
`;

const Subtitle = styled.div<{ theme: string }>`
    position: absolute;
    left: 2%;
    font-size: 20px;
    color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
`;


interface HeaderProps {
    subTitle: string;
}

const Header: React.FC<HeaderProps> = ({ subTitle }) => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    const header_onClicked = () => {
        navigate('/');
    };

    return (
        <StyledHeader theme={theme}>
            <Subtitle theme={theme}>{subTitle}</Subtitle>
            <HeadTitle onClick={header_onClicked}>Algo-Canvas</HeadTitle>
            <ToggleContainer>
                <ToggleSwitch onToggle={toggleTheme} />
            </ToggleContainer>
        </StyledHeader>
    );
};

export default Header;
