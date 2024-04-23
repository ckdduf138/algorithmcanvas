export interface BoxProps {
    title: string;
    imgSrc: string;
    tags: string[];
    link: string;
}

export const boxes: BoxProps[] = [
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