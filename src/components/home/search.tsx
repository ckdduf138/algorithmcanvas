import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
    position: relative;
    width: 600px;
    min-width: 400px;
    height: 45px;
    display: inline-block;
`;

const SearchBar = styled.input`
    width: 100%;
    height: 100%;
    border-radius: 999px;
    border: none;
    padding: 0 22px;
    color: black;
    outline: none;
    background: white;
    position: relative;
    z-index: 1;
    box-sizing: border-box;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 100%;
`;

const GradientBorder = styled.div`
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 999px;
    z-index: 0;
    padding: 0;
`;

const SearchImg = styled.img<{ $isPointer: boolean }>`
    width: 24px;
    height: 24px;
    display: flex;
    position: absolute;
    right: 16px;
    top: calc(50% - 12px);
    z-index: 2;

    cursor: ${({ $isPointer }) => ($isPointer ? '' : 'pointer')};
`;

interface SearchProps {
    onSearch: (query: string) => void;
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<SearchProps> = ({ onSearch, query, setQuery }) => {
    const gradientRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [angle, setAngle] = useState(0);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (isFocused) {
            intervalRef.current = window.setInterval(() => {
                setAngle(prevAngle => (prevAngle + 1) % 360);
            }, 30);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isFocused]);

    useEffect(() => {
        if (gradientRef.current) {
            gradientRef.current.style.background = `linear-gradient(${angle}deg, #00C25B, #FFD600, #00FFD1, #80FF00)`;
        }
    }, [angle]);

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
            <GradientBorder ref={gradientRef} />
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
