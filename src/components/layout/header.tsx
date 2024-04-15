import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.header`
    background-color: #15202b;
    text-align: center;
    text-transform: uppercase;
    font-family: 'Raleway', cursive;
    position: relative;
`;

const HeadTitle = styled.div`
    display: block;
    padding: 20px;
    text-decoration: none;
    letter-spacing: 30px;
    color: white;
    cursor: pointer;
`;

const Header: React.FC = () => {

    const navigate = useNavigate();

    const header_onClicked = () => {
        navigate('/');
    };

    return (
        <StyledHeader>
            <HeadTitle onClick={header_onClicked}>Algo-Canvas</HeadTitle>
        </StyledHeader>
    );
};

export default Header;
