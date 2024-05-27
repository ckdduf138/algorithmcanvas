import React from 'react';
import styled from 'styled-components';

interface TextProps {
    theme: string;
    children: React.ReactNode;
}

const StyledText = styled.span<{ theme: string }>`
    color: ${props => props.theme === 'light' ? '#8A8F95' : '#b8bcbf'};
`;

const Text: React.FC<TextProps> = ({ theme, children }) => {
    return (
        <StyledText theme={theme}>
            {children}
        </StyledText>
    );
};

export default Text;
