import React, { useState } from 'react';
import styled from 'styled-components';
import Box from '../components/home/box';
import Layout from '../components/layout/layout';
import Search from '../components/home/search';
import { boxes } from '../utils/box';
import { useTheme } from '../context/themeContext';

const HomeSearch = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 20px 0px;
`;

const HomeContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
    width: 100%;
`;

const HomeBoxes = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
`;
const NoSearch = styled.div<{ theme: string }>`
    text-align: center;
    font-family: 'Raleway', fantasy;
    font-size: 30px;
    line-height: 200px;
    width: 100%;
    height: 10%;
    color: ${({ theme }) => (theme === 'light' ? '#0b131b' : '#f7f8f9')};
`;

const HomePage = () => {
    const [filteredBoxes, setFilteredBoxes] = useState(boxes);
    const [query, setQuery] = useState('');
    const { theme } = useTheme();

    const home_onSearch = (query: string) => {
        const lowerCaseQuery = query.toLowerCase().trim().replace(/\s+/g, '').replace(/-/g, '');
    
        const exactMatchBoxes = boxes.filter(box => box.title.toLowerCase() === lowerCaseQuery);
        
        if (exactMatchBoxes.length > 0) {
            setFilteredBoxes(exactMatchBoxes);
        }

        const filtered = boxes.filter(box => {
            const processedTags = box.tags.map(tag => 
                tag.toLowerCase().replace(/\s+/g, '').replace(/-/g, '')
            );
    
            const titleMatch = box.title.toLowerCase().includes(lowerCaseQuery);
            const tagMatch = processedTags.some(tag => tag.includes(lowerCaseQuery));
    
            return titleMatch || tagMatch;
        });
    
        setFilteredBoxes(filtered);
    };

    const handleTagClick = (tag: string) => {
        setQuery(tag);
        home_onSearch(tag);
    };
    
    return (
        <Layout subTitle=''>
            <HomeSearch>
                <Search onSearch={home_onSearch} query={query} setQuery={setQuery} />
            </HomeSearch>
            <HomeContent>
                <HomeBoxes>
                    {filteredBoxes.length > 0 ? (
                        filteredBoxes.map((box, index) => (
                            <Box
                                key={index}
                                title={box.title}
                                algorithmType={box.algorithmType}
                                imgSrc={box.imgSrc}
                                gifSrc={box.gifSrc}
                                tags={box.tags}
                                link={box.link}
                                description={box.description}
                                onTagClick={handleTagClick}
                            />
                        ))
                    ) : (
                        <NoSearch theme={theme}>검색 결과가 없습니다.</NoSearch>
                    )}
                </HomeBoxes>
            </HomeContent>
        </Layout>
    );
};

export default HomePage;
