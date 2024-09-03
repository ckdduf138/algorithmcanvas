export const tagColors: { [key: string]: string } = {
    '정렬': '#E6E6FA',
    '배열': '#FFEFD5',
    '그래프': '#7FFFD4',
};

export interface BoxProps {
    title: string;
    imgSrc: string;
    gifSrc: string;
    tags: string[];
    link: string;
    description: string;
}

export const boxes: BoxProps[] = [
    {
        title: "선택정렬",
        imgSrc: `${process.env.PUBLIC_URL}/images/sort.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/sort.gif`,
        tags: ['정렬', '배열'],
        link: `selection_sort`,
        description: '배열을 순회하면서 가장 작은(또는 큰) 원소를 선택하여 맨 앞부터 차례대로 정렬하는 방식입니다.' +
        '원소의 개수가 적을 때 유용하지만, 시간 복잡도가 O(n^ 2) 으로 큰 배열에서는 성능이 저하될 수 있습니다.',
    },
    {
        title: "삽입정렬",
        imgSrc: `${process.env.PUBLIC_URL}/images/sort.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/sort.gif`,
        tags: ['정렬', '배열'],
        link: `insertion_sort`,
        description: '배열을 정렬된 부분과 정렬되지 않은 부분으로 나누고, 정렬되지 않은 부분의 원소를 정렬된 부분에 삽입하여 정렬하는 방식입니다.' + 
        '배열이 거의 정렬된 상태에서는 빠르게 동작하며, 시간 복잡도는 최선의 경우 O(n), 최악의 경우 O(n^ 2) 입니다.',
    },
    {
        title: "버블정렬",
        imgSrc: `${process.env.PUBLIC_URL}/images/sort.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/sort.gif`,
        tags: ['정렬', '배열'],
        link: `bubble_sort`,
        description: '인접한 두 원소를 비교하며 큰 값을 뒤로 보내면서 정렬하는 방식입니다.' +
        '간단하지만 비효율적인 정렬 방법으로, 시간 복잡도는 항상 O(n^2)입니다.',
    },
    {
        title: "병합정렬",
        imgSrc: `${process.env.PUBLIC_URL}/images/sort.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/sort.gif`,
        tags: ['정렬', '배열'],
        link: `merge_sort`,
        description: '배열을 반으로 나눈 후 각 부분을 재귀적으로 정렬하고, 정렬된 부분을 합병하여 전체를 정렬하는 방식입니다.' +
        '분할 정복 알고리즘 중 하나로, 시간 복잡도는 항상 O(n log n)입니다.',
    },
    {
        title: "힙정렬",
        imgSrc: `${process.env.PUBLIC_URL}/images/sort.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/sort.gif`,
        tags: ['정렬', '배열'],
        link: `heap_sort`,
        description: '최대 힙 또는 최소 힙을 구성하여 정렬하는 방식으로, 힙을 구성하는 시간이 O(n)이고, 정렬하는 시간이 O(n log n)입니다.' +
        '데이터를 정렬하는 동안 추가적인 메모리를 사용하지 않는 장점이 있습니다.',
    },
    {
        title: "퀵정렬",
        imgSrc: `${process.env.PUBLIC_URL}/images/sort.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/sort.gif`,
        tags: ['정렬', '배열'],
        link: `quick_sort`,
        description: '피벗을 기준으로 작은 값은 왼쪽, 큰 값은 오른쪽으로 분할하여 정렬하는 방식입니다.' +
        '평균적으로 O(n log n)의 시간 복잡도를 가지지만, 최악의 경우 O(n^ 2) 이 될 수 있습니다.',
    },
        {
        title: "BFS",
        imgSrc: `${process.env.PUBLIC_URL}/images/bfs.jpg`,
        gifSrc: `${process.env.PUBLIC_URL}/images/sort.gif`,
        tags: ['그래프'],
        link: `bfs`,
        description: '루트 노드에서 시작하여 인접한 노드를 먼저 탐색하는 그래프 탐색 알고리즘입니다.' +
        '큐를 사용하여 레벨 순서로 탐색하며, 최단 경로를 찾는 등에 활용됩니다.',
    },
    {
        title: "DFS",
        imgSrc: `${process.env.PUBLIC_URL}/images/dfs.jpg`,
        gifSrc: `${process.env.PUBLIC_URL}/images/sort.gif`,
        tags: ['그래프'],
        link: `dfs`,
        description: '루트 노드에서 시작하여 한 분기로써 탐색을 마치고 다음 분기로 넘어가는 방식의 그래프 탐색 알고리즘입니다.' +
        '스택이나 재귀 함수를 통해 구현하며, 모든 경로를 탐색하거나 노드 상태를 검사할 때 사용됩니다.',
    },
    {
        title: "다익스트라",
        imgSrc: `${process.env.PUBLIC_URL}/images/dfs.jpg`,
        gifSrc: `${process.env.PUBLIC_URL}/images/sort.gif`,
        tags: ['그래프'],
        link: `dijkstra`,
        description: '루트 노드에서 시작하여 한 분기로써 탐색을 마치고 다음 분기로 넘어가는 방식의 그래프 탐색 알고리즘입니다.' +
        '스택이나 재귀 함수를 통해 구현하며, 모든 경로를 탐색하거나 노드 상태를 검사할 때 사용됩니다.',
    },
    {
        title: "벨만-포드",
        imgSrc: `${process.env.PUBLIC_URL}/images/dfs.jpg`,
        gifSrc: `${process.env.PUBLIC_URL}/images/sort.gif`,
        tags: ['그래프'],
        link: `bellman-ford`,
        description: '루트 노드에서 시작하여 한 분기로써 탐색을 마치고 다음 분기로 넘어가는 방식의 그래프 탐색 알고리즘입니다.' +
        '스택이나 재귀 함수를 통해 구현하며, 모든 경로를 탐색하거나 노드 상태를 검사할 때 사용됩니다.',
    },
    {
        title: "플로이드",
        imgSrc: `${process.env.PUBLIC_URL}/images/dfs.jpg`,
        gifSrc: `${process.env.PUBLIC_URL}/images/sort.gif`,
        tags: ['그래프'],
        link: `Floyd`,
        description: '루트 노드에서 시작하여 한 분기로써 탐색을 마치고 다음 분기로 넘어가는 방식의 그래프 탐색 알고리즘입니다.' +
        '스택이나 재귀 함수를 통해 구현하며, 모든 경로를 탐색하거나 노드 상태를 검사할 때 사용됩니다.',
    },
    {
        title: "최소 신장 트리",
        imgSrc: `${process.env.PUBLIC_URL}/images/dfs.jpg`,
        gifSrc: `${process.env.PUBLIC_URL}/images/sort.gif`,
        tags: ['그래프'],
        link: `minimum-spanning-tree`,
        description: '루트 노드에서 시작하여 한 분기로써 탐색을 마치고 다음 분기로 넘어가는 방식의 그래프 탐색 알고리즘입니다.' +
        '스택이나 재귀 함수를 통해 구현하며, 모든 경로를 탐색하거나 노드 상태를 검사할 때 사용됩니다.',
    },
];