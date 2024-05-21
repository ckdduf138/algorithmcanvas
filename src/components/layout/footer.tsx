import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/themeContext';

const StyledFooter = styled.footer<{ theme: string }>`
    background-color: ${({ theme: themeType }) => (themeType === 'light' ? '#ffffff' : '#0b131b')};
    width: 100%;
    height: 10%;
`;

const FooterText = styled.div<{ theme: string }>`
    padding: 10px;
    color: ${({ theme: themeType }) => (themeType === 'light' ? '#8A8F95' : '#b8bcbf')};
    text-align: center;
`;

const Footer: React.FC = () => {
    const { theme } = useTheme();

    return (
        <StyledFooter theme={theme}>
            <FooterText theme={theme}>
                <div>Algo-Canvas</div>
                <div>© 2024 - 2024</div>
            </FooterText>
        </StyledFooter>
    );
};

export default Footer;
