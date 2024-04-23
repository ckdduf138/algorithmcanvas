import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
    background-color: #0b131b;

    width:100%;
    height: 10%;
`;

const FooterText = styled.div`
    padding: 10px;
    color: #b8bcbf;
    text-align: center;
`;

const Footer: React.FC = () => {
    return (
        <StyledFooter>
            <FooterText>
                <div>Algo-Canvas</div>
                <div>© 2024 - 2024</div>
            </FooterText>
        </StyledFooter>
    );
};

export default Footer;
