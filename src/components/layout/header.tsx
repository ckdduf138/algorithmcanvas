import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.header`
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: #15202b;
    text-align: center;
    text-transform: uppercase;
    font-family: 'Raleway', cursive;
    position: relative;
    width:100%;
    height:10%;
`;

const HeadTitle = styled.div`
    display: block;
    padding: 20px;
    text-decoration: none;
    letter-spacing: 30px;
    color: white;
    cursor: pointer;
    font-size: 30px;
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
