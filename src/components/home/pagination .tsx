import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/themeContext';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    nextPage: () => void;
    prevPage: () => void;
    goToPage: (page: number) => void;
}

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const PaginationButton = styled.button`
    background-color: transparent;
    border: none;
    font-size: 22px;
    cursor: pointer;
    margin: 0 5px;
    padding: 5px;
`;

const PageNumber = styled.div<{ theme: string }>`
    display: flex;
    justify-content: center;
    width: 40px;

    font-size: 22px;
    cursor: pointer;
    color: ${({ theme: themeType }) => (themeType === 'light' ? '#000' : '#fff')};

    &:hover {
        background-color: ${({ theme: themeType }) => (themeType === 'light' ? '#f7f8f9' : '#f7f8f9')};
    }

    &.active {
        color: ${({ theme: themeType }) => (themeType === 'light' ? '#fff' : '#000')};
        background-color: ${({ theme: themeType }) => (themeType === 'light' ? '#0b131b' : '#f7f8f9')};
    }
`;

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, nextPage, prevPage, goToPage }) => {
    const { theme } = useTheme();
    
    const pageNumbers = [];
    for (let i = 0; i < totalPages; i++) {
        pageNumbers.push(i + 1);
    }

    return (
        <PaginationContainer>
            <PaginationButton onClick={prevPage} disabled={currentPage === 0}>{'<'}</PaginationButton>
            {pageNumbers.map((pageNumber) => (
                <PageNumber
                    theme = {theme}
                    key={pageNumber}
                    className={currentPage === pageNumber - 1 ? 'active' : ''}
                    onClick={() => goToPage(pageNumber - 1)}
                >
                    {pageNumber}
                </PageNumber>
            ))}
            <PaginationButton onClick={nextPage} disabled={currentPage === totalPages - 1}>{'>'}</PaginationButton>
        </PaginationContainer>
    );
};

export default Pagination;
