import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../../context/themeContext';
import ToggleSwitch from '../common/toggleSwitch';

const StyledHeader = styled.header<{ theme: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme: themeType }) => (themeType === 'light' ? '#ffffff' : '#15202b')};
    text-align: center;
    text-transform: uppercase;
    font-family: 'Raleway', cursive;
    position: relative;
    width: 100%;
    height: 10%;
    color: ${({ theme: themeType }) => (themeType === 'light' ? '#000' : '#fff')};
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

const Header: React.FC = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    const header_onClicked = () => {
        navigate('/');
    };

    return (
        <StyledHeader theme={theme}>
            <HeadTitle onClick={header_onClicked}>Algo-Canvas</HeadTitle>
            <ToggleContainer>
                <ToggleSwitch onToggle={toggleTheme} />
            </ToggleContainer>
        </StyledHeader>
    );
};

export default Header;
