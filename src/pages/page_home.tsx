import React from 'react';
import styled from 'styled-components';
import Box from '../components/home/box';
import Layout from '../components/layout/layout';
import Search from '../components/home/search';
import { boxes } from '../utils/box';

const HomeSearch = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
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

const Home = () => {
    const home_onSearch = (query: string) => {
        console.log('검색어:', query);
    };

    return (
        <Layout subTitle=''>
            <HomeSearch>
                <Search onSearch={home_onSearch} />
            </HomeSearch>
            <HomeContent>
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
            </HomeContent>
        </Layout>
    );
};

export default Home;
