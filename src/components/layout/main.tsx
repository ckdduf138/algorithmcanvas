import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/themeContext';

interface MainProps {
    children: React.ReactNode;
}

const StyleMain = styled.div<{ theme: string }>` // themeType props 추가
    width: 100%;
    height: 80%;
    background-color: ${({ theme: themeType }) => (themeType === 'light' ? '#ffffff' : '#15202b')};

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Main: React.FC<MainProps> = ({ children }) => {
    const { theme } = useTheme(); // 테마 컨텍스트에서 현재 테마 가져오기

    return (
        <StyleMain theme={theme}>
            {children}
        </StyleMain>
    );
};

export default Main;
