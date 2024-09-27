import React, { useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
    position: relative;
    width: 600px;
    min-width: 400px;
    height: 60px;
    border-radius: 999px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const GradientBorder = styled.div<{$isFocused: boolean}>`
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 999px;
    padding: 0;
    background: linear-gradient(#00C25B, #FFD600, #00FFD1, #80FF00);
    
    @keyframes rotate-gradient {
        to {
            transform: rotate(360deg);
        }
    }

    ${({ $isFocused }) =>
        $isFocused &&
        `
        animation: rotate-gradient 2s ease-in-out infinite;
    `}
`;

const SearchBar = styled.input`
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    border-radius: 999px;
    border: none;
    padding: 0 22px;
    color: black;
    outline: none;
    background: white;
    position: relative;
    box-sizing: border-box;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 100%;

    &:focus ~ ${GradientBorder} {
        animation: rotate-gradient 2s linear infinite;
    }
`;

const SearchImg = styled.img<{ $isPointer: boolean }>`
    width: 24px;
    height: 24px;
    display: flex;
    position: absolute;
    right: 22px;
    top: calc(50% - 12px);

    cursor: ${({ $isPointer }) => ($isPointer ? '' : 'pointer')};
`;

interface SearchProps {
    onSearch: (query: string) => void;
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<SearchProps> = ({ onSearch, query, setQuery }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = event.target.value;
        setQuery(newQuery);
        onSearch(newQuery);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSearch(query);
        }
    };

    const imageSrc =
        query === ''
            ? `${process.env.PUBLIC_URL}/images/search-bar.svg`
            : `${process.env.PUBLIC_URL}/images/search-bar-x.svg`;

    const handleSearchImg = () => {
        setQuery('');
        onSearch('');
    };

    return (
        <SearchContainer>
            <GradientBorder $isFocused={isFocused}/>
            <SearchBar
                type="text"
                placeholder="검색어를 입력하세요."
                value={query}
                onChange={handleInputChange}
                onKeyUp={handleKeyPress}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <SearchImg
                src={imageSrc}
                onClick={handleSearchImg}
                $isPointer={query === ''}
            />
        </SearchContainer>
    );
};

export default Search;
