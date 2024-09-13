import React, { useState } from 'react';
import styled from 'styled-components';

const SearchBar = styled.input`
    width: 400px;
    height: 40px;
    border-radius: 5px;
`;

interface SearchProps {
    onSearch: (query: string) => void;
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<SearchProps> = ({ onSearch, query, setQuery }) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = event.target.value;
        setQuery(newQuery);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        onSearch(query);
    };

    return (
        <SearchBar
            type="text"
            placeholder="검색어를 입력하세요..."
            value={query}
            onChange={handleInputChange}
            onKeyUp={handleKeyPress}
        />
    );
};

export default Search;
