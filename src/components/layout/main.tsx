import React from 'react';
import styled from 'styled-components';

interface MainProps {
    children: React.ReactNode;
}

const StyleMain = styled.div`
    width:100%;
    height:80%;
    background-color: #15202b;
    
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const Main: React.FC<MainProps> = ({ children }) => {
    return (
        <StyleMain>
            {children}
        </StyleMain>
    );
};

export default Main;
