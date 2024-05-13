import React from 'react';
import styled from 'styled-components';

import Box from '../components/home/box';
import Layout from '../components/layout/layout';
import Search from '../components/home/search';
import { boxes } from '../utils/box';

const HomeSearch = styled.div`
    display: flex;
    justify-content: center;
    padding: 10px;
    top: 12.5%;
    position: absolute;
`;

const HomeBoxes = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    top: 20%;
    position: absolute;
    width:100%;
`;

const Home = () => {
    const home_onSearch = (query: string) => {
        console.log('검색어:', query);
    };

    return (
        <Layout>
            <HomeSearch>
                <Search onSearch={home_onSearch} />
            </HomeSearch>
            <HomeBoxes>
                {boxes.map((box, index) => (
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
