import React, { useState } from 'react';
import styled from 'styled-components';

const SearchBar = styled.input`
    width: 400px;
    height: 40px;
    border-radius: 5px;
`;

const SearchButton = styled.button`
    width: 80px;
    border-radius: 10%;
    cursor: pointer;
`;

interface SearchProps {
    onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
    const [query, setQuery] = useState<string>('');

    const handleSearch = () => {
        onSearch(query);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <>
            <SearchBar
                type="text"
                placeholder="검색어를 입력하세요..."
                value={query}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
            <SearchButton onClick={handleSearch}>검색</SearchButton>
        </>
    );
};

export default Search;
