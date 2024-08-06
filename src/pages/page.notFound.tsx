import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PageNotFoundContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    color: #343a40;
`;

const Heading = styled.h1`
    font-size: 3rem;
    margin-bottom: 1rem;
`;

const Message = styled.p`
    font-size: 1.5rem;
    margin-bottom: 2rem;
`;

const HomeLink = styled(Link)`
    text-decoration: none;
    font-size: 1.2rem;
    color: #007bff;
    border: 1px solid #007bff;
    padding: 0.5rem 1rem;
    border-radius: 4px;

    &:hover {
        background-color: #007bff;
        color: #fff;
    }
`;

const Image = styled.img`
    width: 300px;
    height: auto;
`;

const NotFoundPage = () => {
    return (
        <PageNotFoundContainer>
            <Image src={`${process.env.PUBLIC_URL}/images/404.png`}/>
            <Heading>404 - Not Found</Heading>
            <Message>준비중..</Message>
            <HomeLink to="/">Go back to Home</HomeLink>
        </PageNotFoundContainer>
    );
};

export default NotFoundPage;
