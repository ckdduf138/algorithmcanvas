import React from 'react';
import styled from 'styled-components';

import { useTheme } from '../../context/themeContext';

const FooterContainer = styled.footer<{ theme: string }>`
    width: 100%;
    min-height: 10%;
    text-align: center;
    padding: 10px 0px 10px 0px;
    background-color: ${({ theme: themeType }) => (themeType === 'light' ? '#f7f8f9' : '#0b131b')};
`;

const FooterText = styled.p<{ theme: string }>`
    color: ${props => props.theme === 'light' ? '#8A8F95' : '#b8bcbf'};
    margin: 0;
    font-size: 16px;

    &.title {
        font-size: 24px;
        font-weight: bold;
    }
`;

const EmailLink = styled.a<{ theme: string }>`
    color: ${props => props.theme === 'light' ? '#8A8F95' : '#b8bcbf'};
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const Footer: React.FC = () => {
    const { theme } = useTheme();

    return (
        <FooterContainer theme={theme}>
            <FooterText className="title">algorithm-canvas</FooterText>

            <FooterText>
                Contact: <EmailLink href="mailto:acanvas2024@gmail.com">acanvas2024@gmail.com</EmailLink>
            </FooterText>

            <FooterText>© 2024 - 2025</FooterText>
        </FooterContainer>
    );
};

export default Footer;
