import React, { Component } from 'react';
import Box from '../../components/home/box';
import './page_home.css';
import Layout from '../../components/layout/layout';
import Search from '../../components/home/search';

const boxes = [
    {
        title: "BFS",
        imgSrc: `${process.env.PUBLIC_URL}/images/bfs.jpg`,
        tags: ['bfs', '그래프탐색'],
        link: `${process.env.PUBLIC_URL}/bfs`
    },
    {
        title: "DFS",
        imgSrc: `${process.env.PUBLIC_URL}/images/dfs.jpg`,
        tags: ['태그1'],
        link: `${process.env.PUBLIC_URL}/dfs`
    },
    {
        title: "BFS",
        imgSrc: `${process.env.PUBLIC_URL}/images/bfs.jpg`,
        tags: ['태그1', '태그2', '태그3', '태그4', '태그5', '태그6'],
        link: `${process.env.PUBLIC_URL}/bfs`
    },
    {
        title: "BFS",
        imgSrc: `${process.env.PUBLIC_URL}/images/bfs.jpg`,
        tags: ['태그1', '태그2', '태그3'],
        link: `${process.env.PUBLIC_URL}/bfs`
    },
    {
        title: "BFS",
        imgSrc: `${process.env.PUBLIC_URL}/images/bfs.jpg`,
        tags: ['태그1', '태그2', '태그3'],
        link: `${process.env.PUBLIC_URL}/bfs`
    },
    {
        title: "BFS",
        imgSrc: `${process.env.PUBLIC_URL}/images/bfs.jpg`,
        tags: ['태그1', '태그2', '태그3'],
        link: `${process.env.PUBLIC_URL}/bfs`
    },
    {
        title: "BFS",
        imgSrc: `${process.env.PUBLIC_URL}/images/bfs.jpg`,
        tags: ['태그1', '태그2', '태그3'],
        link: `${process.env.PUBLIC_URL}/bfs`
    },
    {
        title: "BFS",
        imgSrc: `${process.env.PUBLIC_URL}/images/bfs.jpg`,
        tags: ['태그1', '태그2', '태그3'],
        link: `${process.env.PUBLIC_URL}/bfs`
    },
    {
        title: "BFS",
        imgSrc: `${process.env.PUBLIC_URL}/images/bfs.jpg`,
        tags: ['태그1', '태그2', '태그3'],
        link: `${process.env.PUBLIC_URL}/bfs`
    },
    {
        title: "BFS",
        imgSrc: `${process.env.PUBLIC_URL}/images/bfs.jpg`,
        tags: ['태그1', '태그2', '태그3'],
        link: `${process.env.PUBLIC_URL}/bfs`
    },
];

class Home extends Component {

    home_onSearch = (query: string) => {
        console.log('검색어:', query);
    };

    render() {
        return (
            <Layout>
                <div className='page_home'>
                    <div className='home_search'>
                        <Search onSearch={this.home_onSearch} />
                    </div>
                    <div className='home_boxes'>
                        {boxes.map((box, index) => (
                            <Box
                                key={index}
                                title={box.title}
                                imgSrc={box.imgSrc}
                                tags={box.tags}
                                link={box.link}
                            />
                        ))}
                    </div>
                </div>
            </Layout>
        );
    }
}

export default Home;
