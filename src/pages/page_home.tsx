import React from 'react';
import styled from 'styled-components';

import Box from '../components/home/box';
import Layout from '../components/layout/layout';
import Search from '../components/home/search';

const PageHome = styled.div`
    background-color: #15202b;
`;

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

const boxes = [
    {
        title: "BFS",
        imgSrc: `${process.env.PUBLIC_URL}/images/bfs.jpg`,
        tags: ['bfs', '그래프탐색'],
        link: `bfs`
    },
    {
        title: "DFS",
        imgSrc: `${process.env.PUBLIC_URL}/images/dfs.jpg`,
        tags: ['태그1'],
        link: `/dfs`
    },
    {
        title: "BFS",
        imgSrc: `${process.env.PUBLIC_URL}/images/bfs.jpg`,
        tags: ['태그1', '태그2', '태그3', '태그4', '태그5', '태그6'],
        link: `bfs`
    },
    {
        title: "BFS",
        imgSrc: `${process.env.PUBLIC_URL}/images/bfs.jpg`,
        tags: ['태그1', '태그2', '태그3'],
        link: `bfs`
    },
    {
        title: "BFS",
        imgSrc: `${process.env.PUBLIC_URL}/images/bfs.jpg`,
        tags: ['태그1', '태그2', '태그3'],
        link: `bfs`
    },
    {
        title: "BFS",
        imgSrc: `${process.env.PUBLIC_URL}/images/bfs.jpg`,
        tags: ['태그1', '태그2', '태그3'],
        link: `bfs`
    },
    {
        title: "BFS",
        imgSrc: `${process.env.PUBLIC_URL}/images/bfs.jpg`,
        tags: ['태그1', '태그2', '태그3'],
        link: `bfs`
    },
    {
        title: "BFS",
        imgSrc: `${process.env.PUBLIC_URL}/images/bfs.jpg`,
        tags: ['태그1', '태그2', '태그3'],
        link: `bfs`
    },
    {
        title: "BFS",
        imgSrc: `${process.env.PUBLIC_URL}/images/bfs.jpg`,
        tags: ['태그1', '태그2', '태그3'],
        link: `bfs`
    },
];

const Home = () => {
    const home_onSearch = (query: string) => {
        console.log('검색어:', query);
    };

    return (
        <Layout>
            <PageHome>
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
            </PageHome>
        </Layout>
    );
};

export default Home;
