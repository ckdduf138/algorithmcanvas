import React from 'react';
import styled from 'styled-components';

import { useTheme } from '../../context/themeContext';

interface TextProps {
    children: React.ReactNode;
    fontSize?: string;
}

const StyledText = styled.span<{ theme: string, fontSize?: string }>`
    color: ${props => props.theme === 'light' ? '#8A8F95' : '#b8bcbf'};

    font-size: ${props => props.fontSize};
`;

const Text: React.FC<TextProps> = ({ children, fontSize }) => {
    const { theme } = useTheme();

    return (
        <StyledText theme={theme} fontSize={fontSize}>
            {children}
        </StyledText>
    );
};

export default Text;
