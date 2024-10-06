export const algorithmTypes: { [key: string]: string[] } = {
    '자료구조': ['#F9B6FF', '#FFC499'],
    '정렬': ['#9AA4FF', '#95E4FF'],
    '그래프': ['#9AFFAA', '#FCFF7E'],
    '기하학': ['#FFD3B6', '#F1E4D3'],
};

export const tagColors: { [key: string]: string } = {
    '자료구조': '#F9B6FF',
    '정렬': '#9AA4FF',
    '배열': '#95E4FF',
    '그래프': '#9AFFAA',
    '탐색': '#FCFF7E',
    '선입선출': '#FFD580',
    '후입선출': '#FFB6C1',
    '분할정복': '#B3FFB6',
    '힙': '#FFC8A2',
    '큐': '#FFD580',
    '스택': '#FFB6C1',
    '우선순위 큐': '#FFD580',
    '동적계획법': '#FFDAA5',
    '유니온-파인드': '#E1FF9E',
    '기하학': '#FFD3B6',
    '브루트 포스': '#D3D3D3'
};

export interface BoxProps {
    title: string;
    algorithmType: string;
    imgSrc: string;
    gifSrc: string;
    tags: string[];
    link: string;
    description: string;
}

export const boxes: BoxProps[] = [
    {
        title: '큐',
        algorithmType: '자료구조',
        imgSrc: `${process.env.PUBLIC_URL}/images/sort.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/sort.gif`,
        tags: ['자료구조', '선입선출'],
        link: 'queue',
        description: '큐(Queue)는 선입선출(FIFO: First In, First Out) 구조를 가지는 자료구조입니다.<br><br> 큐에서는 먼저 들어온 데이터가 먼저 나가며, 줄을 서는 방식과 유사합니다.<br>' +
        '일반적인 큐의 동작은 두 가지 주요 연산으로 이루어집니다.',
    },
    {
        title: '스택',
        algorithmType: '자료구조',
        imgSrc: `${process.env.PUBLIC_URL}/images/sort.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/sort.gif`,
        tags: ['자료구조', '후입선출'],
        link: 'stack',
        description: '스택에 대한 설명',
    },
    {
        title: '힙 트리',
        algorithmType: '자료구조',
        imgSrc: `${process.env.PUBLIC_URL}/images/sort.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/sort.gif`,
        tags: ['자료구조', '우선순위 큐', '트리'],
        link: 'heap-tree',
        description: '힙 트리에 대한 설명',
    },
    {
        title: '선택정렬',
        algorithmType: '정렬',
        imgSrc: `${process.env.PUBLIC_URL}/images/sort.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/sort.gif`,
        tags: ['정렬', '배열'],
        link: 'selection-sort',
        description: '배열을 순회하면서 가장 작은(또는 큰) 원소를 선택하여 맨 앞부터 차례대로 정렬하는 방식입니다.' +
        '원소의 개수가 적을 때 유용하지만, 시간 복잡도가 O(n^ 2) 으로 큰 배열에서는 성능이 저하될 수 있습니다.',
    },
    {
        title: '삽입정렬',
        algorithmType: '정렬',
        imgSrc: `${process.env.PUBLIC_URL}/images/sort.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/sort.gif`,
        tags: ['정렬', '배열'],
        link: 'insertion-sort',
        description: '배열을 정렬된 부분과 정렬되지 않은 부분으로 나누고, 정렬되지 않은 부분의 원소를 정렬된 부분에 삽입하여 정렬하는 방식입니다.' + 
        '배열이 거의 정렬된 상태에서는 빠르게 동작하며, 시간 복잡도는 최선의 경우 O(n), 최악의 경우 O(n^ 2) 입니다.',
    },
    {
        title: '버블정렬',
        algorithmType: '정렬',
        imgSrc: `${process.env.PUBLIC_URL}/images/sort.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/sort.gif`,
        tags: ['정렬', '배열'],
        link: 'bubble-sort',
        description: '인접한 두 원소를 비교하며 큰 값을 뒤로 보내면서 정렬하는 방식입니다.' +
        '간단하지만 비효율적인 정렬 방법으로, 시간 복잡도는 항상 O(n^2)입니다.',
    },
    {
        title: '병합정렬',
        algorithmType: '정렬',
        imgSrc: `${process.env.PUBLIC_URL}/images/sort.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/sort.gif`,
        tags: ['정렬', '분할정복', '배열'],
        link: 'merge-sort',
        description: '배열을 반으로 나눈 후 각 부분을 재귀적으로 정렬하고, 정렬된 부분을 합병하여 전체를 정렬하는 방식입니다.' +
        '분할 정복 알고리즘 중 하나로, 시간 복잡도는 항상 O(n log n)입니다.',
    },
    {
        title: '힙정렬',
        algorithmType: '정렬',
        imgSrc: `${process.env.PUBLIC_URL}/images/sort.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/sort.gif`,
        tags: ['정렬', '힙', '배열'],
        link: 'heap-sort',
        description: '최대 힙 또는 최소 힙을 구성하여 정렬하는 방식으로, 힙을 구성하는 시간이 O(n)이고, 정렬하는 시간이 O(n log n)입니다.' +
        '데이터를 정렬하는 동안 추가적인 메모리를 사용하지 않는 장점이 있습니다.',
    },
    {
        title: '퀵정렬',
        algorithmType: '정렬',
        imgSrc: `${process.env.PUBLIC_URL}/images/sort.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/sort.gif`,
        tags: ['정렬', '분할정복', '배열'],
        link: 'quick-sort',
        description: '피벗을 기준으로 작은 값은 왼쪽, 큰 값은 오른쪽으로 분할하여 정렬하는 방식입니다.' +
        '평균적으로 O(n log n)의 시간 복잡도를 가지지만, 최악의 경우 O(n^ 2) 이 될 수 있습니다.',
    },
        {
        title: 'BFS',
        algorithmType: '그래프',
        imgSrc: `${process.env.PUBLIC_URL}/images/bfs.jpg`,
        gifSrc: `${process.env.PUBLIC_URL}/images/sort.gif`,
        tags: ['그래프', '탐색', '큐'],
        link: 'bfs',
        description: '루트 노드에서 시작하여 인접한 노드를 먼저 탐색하는 그래프 탐색 알고리즘입니다.' +
        '큐를 사용하여 레벨 순서로 탐색하며, 최단 경로를 찾는 등에 활용됩니다.',
    },
    {
        title: 'DFS',
        algorithmType: '그래프',
        imgSrc: `${process.env.PUBLIC_URL}/images/dfs.jpg`,
        gifSrc: `${process.env.PUBLIC_URL}/images/sort.gif`,
        tags: ['그래프', '탐색', '스택'],
        link: 'dfs',
        description: '루트 노드에서 시작하여 한 분기로써 탐색을 마치고 다음 분기로 넘어가는 방식의 그래프 탐색 알고리즘입니다.' +
        '스택이나 재귀 함수를 통해 구현하며, 모든 경로를 탐색하거나 노드 상태를 검사할 때 사용됩니다.',
    },
    {
        title: '다익스트라',
        algorithmType: '그래프',
        imgSrc: `${process.env.PUBLIC_URL}/images/dfs.jpg`,
        gifSrc: `${process.env.PUBLIC_URL}/images/sort.gif`,
        tags: ['그래프', '우선순위 큐'],
        link: 'dijkstra',
        description: '루트 노드에서 시작하여 한 분기로써 탐색을 마치고 다음 분기로 넘어가는 방식의 그래프 탐색 알고리즘입니다.' +
        '스택이나 재귀 함수를 통해 구현하며, 모든 경로를 탐색하거나 노드 상태를 검사할 때 사용됩니다.',
    },
    {
        title: '벨만-포드',
        algorithmType: '그래프',
        imgSrc: `${process.env.PUBLIC_URL}/images/dfs.jpg`,
        gifSrc: `${process.env.PUBLIC_URL}/images/sort.gif`,
        tags: ['그래프', '동적계획법'],
        link: 'bellman-ford',
        description: '루트 노드에서 시작하여 한 분기로써 탐색을 마치고 다음 분기로 넘어가는 방식의 그래프 탐색 알고리즘입니다.' +
        '스택이나 재귀 함수를 통해 구현하며, 모든 경로를 탐색하거나 노드 상태를 검사할 때 사용됩니다.',
    },
    {
        title: '플로이드-워셜',
        algorithmType: '그래프',
        imgSrc: `${process.env.PUBLIC_URL}/images/dfs.jpg`,
        gifSrc: `${process.env.PUBLIC_URL}/images/sort.gif`,
        tags: ['그래프', '동적계획법'],
        link: 'floyd-warshall',
        description: '루트 노드에서 시작하여 한 분기로써 탐색을 마치고 다음 분기로 넘어가는 방식의 그래프 탐색 알고리즘입니다.' +
        '스택이나 재귀 함수를 통해 구현하며, 모든 경로를 탐색하거나 노드 상태를 검사할 때 사용됩니다.',
    },
    {
        title: '최소 신장 트리',
        algorithmType: '그래프',
        imgSrc: `${process.env.PUBLIC_URL}/images/dfs.jpg`,
        gifSrc: `${process.env.PUBLIC_URL}/images/sort.gif`,
        tags: ['그래프', '유니온-파인드'],
        link: 'minimum-spanning-tree',
        description: '루트 노드에서 시작하여 한 분기로써 탐색을 마치고 다음 분기로 넘어가는 방식의 그래프 탐색 알고리즘입니다.' +
        '스택이나 재귀 함수를 통해 구현하며, 모든 경로를 탐색하거나 노드 상태를 검사할 때 사용됩니다.',
    },
    {
        title: '볼록껍질',
        algorithmType: '기하학',
        imgSrc: `${process.env.PUBLIC_URL}/images/sort.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/sort.gif`,
        tags: ['기하학', '브루트 포스'],
        link: 'convex-hull',
        description: '힙 트리에 대한 설명',
    },
];