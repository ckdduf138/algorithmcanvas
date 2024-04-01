import React, { Component } from 'react';

interface SearchProps {
    onSearch: (query: string) => void;
}

interface SearchState {
    query: string;
}

class Search extends Component<SearchProps, SearchState> {
    constructor(props: SearchProps) {
        super(props);
        this.state = {
            query: '',
        };
    }

    handleSearch = () => {
        this.props.onSearch(this.state.query);
    };

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ query: event.target.value });
    };

    handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            this.handleSearch();
        }
    };

    render() {
        return (
            <div>
                <input
                    type="text"
                    placeholder="검색어를 입력하세요..."
                    value={this.state.query}
                    onChange={this.handleInputChange}
                    onKeyPress={this.handleKeyPress}
                />
                <button onClick={this.handleSearch}>검색</button>
            </div>
        );
    }
}

export default Search;
