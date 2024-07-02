export interface BoxProps {
    title: string;
    imgSrc: string;
    tags: string[];
    link: string;
    description: string;
}

export const boxes: BoxProps[] = [
    {
        title: "선택정렬",
        imgSrc: `${process.env.PUBLIC_URL}/images/bfs.jpg`,
        tags: ['정렬'],
        link: `selection_sort`,
        description: '설명',
    },
    {
        title: "삽입정렬",
        imgSrc: `${process.env.PUBLIC_URL}/images/bfs.jpg`,
        tags: ['정렬'],
        link: `bfs`,
        description: '설명',
    },
    {
        title: "버블정렬",
        imgSrc: `${process.env.PUBLIC_URL}/images/bfs.jpg`,
        tags: ['정렬'],
        link: `bfs`,
        description: '설명',
    },
    {
        title: "병합정렬",
        imgSrc: `${process.env.PUBLIC_URL}/images/bfs.jpg`,
        tags: ['정렬'],
        link: `bfs`,
        description: '설명',
    },
    {
        title: "힙정렬",
        imgSrc: `${process.env.PUBLIC_URL}/images/bfs.jpg`,
        tags: ['정렬'],
        link: `bfs`,
        description: '설명',
    },
    {
        title: "퀵정렬",
        imgSrc: `${process.env.PUBLIC_URL}/images/bfs.jpg`,
        tags: ['정렬'],
        link: `bfs`,
        description: '설명',
    },
        {
        title: "BFS",
        imgSrc: `${process.env.PUBLIC_URL}/images/bfs.jpg`,
        tags: ['그래프탐색'],
        link: `bfs`,
        description: '설명',
    },
    {
        title: "DFS",
        imgSrc: `${process.env.PUBLIC_URL}/images/dfs.jpg`,
        tags: ['그래프탐색'],
        link: `bfs`,
        description: '설명',
    },
];