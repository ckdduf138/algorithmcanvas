import React, { useState } from 'react';
import styled from 'styled-components';

import Box from '../components/home/box';
import Layout from '../components/layout/layout';
import Search from '../components/home/search';
import { boxes } from '../utils/box';

const HomeSearch = styled.div`
    display: flex;
    justify-content: center;
    padding: 10px;
`;

const HomeBoxes = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;

const Home = () => {
    const [filteredBoxes, setFilteredBoxes] = useState(boxes);
    
    const home_onSearch = (query: string) => {
        if (query.trim() === '') {
            setFilteredBoxes(boxes);
        } else {
            const filtered = boxes.filter(box => box.tags.includes(query));
            setFilteredBoxes(filtered);
        }
    };

    return (
        <Layout>
            <HomeSearch>
                <Search onSearch={home_onSearch} />
            </HomeSearch>
            <HomeBoxes>
                {filteredBoxes.map((box, index) => (
                    <Box
                        key={index}
                        title={box.title}
                        imgSrc={box.imgSrc}
                        tags={box.tags}
                        link={box.link}
                    />
                ))}
            </HomeBoxes>
        </Layout>
    );
};

export default Home;
