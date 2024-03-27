import React from 'react';
import Box from '../../components/home/box';
import './home.css';

const boxes = [
    {
        title: "BFS",
        imgSrc: "/images/bfs.jpg",
        tags: ['bfs', '그래프탐색'],
        link: "/bfs"
    },
    {
        title: "DFS",
        imgSrc: "/images/dfs.jpg",
        tags: ['태그1'],
        link: "/dfs"
    },
    {
        title: "BFS",
        imgSrc: "/images/bfs.jpg",
        tags: ['태그1', '태그2', '태그3', '태그4', '태그5', '태그6'],
        link: "/bfs"
    },
    {
        title: "BFS",
        imgSrc: "/images/bfs.jpg",
        tags: ['태그1', '태그2', '태그3'],
        link: "/bfs"
    },
    {
        title: "BFS",
        imgSrc: "/images/bfs.jpg",
        tags: ['태그1', '태그2', '태그3'],
        link: "/bfs"
    },
    {
        title: "BFS",
        imgSrc: "/images/bfs.jpg",
        tags: ['태그1', '태그2', '태그3'],
        link: "/bfs"
    },
    {
        title: "BFS",
        imgSrc: "/images/bfs.jpg",
        tags: ['태그1', '태그2', '태그3'],
        link: "/bfs"
    },
    {
        title: "BFS",
        imgSrc: "/images/bfs.jpg",
        tags: ['태그1', '태그2', '태그3'],
        link: "/bfs"
    },
    {
        title: "BFS",
        imgSrc: "/images/bfs.jpg",
        tags: ['태그1', '태그2', '태그3'],
        link: "/bfs"
    },
    {
        title: "BFS",
        imgSrc: "/images/bfs.jpg",
        tags: ['태그1', '태그2', '태그3'],
        link: "/bfs"
    },
];

export default function Home() {
    return (
        <div className='home'>
            <div className='boxes'>
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
    );
}
