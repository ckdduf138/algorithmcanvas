import React from 'react';
import Box from '../../components/home/box';
import './home.css';

const boxes = [
    {
        title: "BFS",
        imgSrc: "/images/bfs.jpg",
        tags: ['태그1', '태그2', '태그3'],
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
    {
        title: "BFS",
        imgSrc: "/images/bfs.jpg",
        tags: ['태그1', '태그2', '태그3'],
        link: "/bfs"
    },
    // 추가적으로 필요한 박스 정보를 배열에 추가하세요
];

export default function Home() {
    return (
        <div className='home'>
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
    );
}
