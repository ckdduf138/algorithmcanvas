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
    '브루트 포스': '#D3D3D3',
    '트리': '#FFD700',
    '연결리스트': '#A5D6FF',
};

export const tagHoverColors: { [key: string]: string } = {
    '자료구조': '#DCA0E2',	
    '정렬': '#767EC5',	
    '배열': '#83CAE2',	
    '그래프': '#88E297',	
    '탐색': '#E0E26F',	
    '선입선출': '#E2BC71',	
    '후입선출': '#E2A0AA',	
    '분할정복': '#9EE2A0',	
    '힙': '#E2B291',		
    '큐': '#E2BC71',		
    '스택': '#E2A0AA',	
    '우선순위 큐': '#E2BC71',	
    '동적계획법': '#E2C193',	
    '유니온-파인드': '#C7E28C',
    '기하학': '#E2BBA0',	
    '브루트 포스': '#B7B7B7',
    '트리': '#E0B800',
    '연결리스트': '#8AB7E3',
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
        imgSrc: `${process.env.PUBLIC_URL}/images/box/queue.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/box/queue.gif`,
        tags: ['자료구조', '선입선출'],
        link: 'queue',
        description: '큐(Queue)는 선입선출(FIFO: First In, First Out) 구조를 가지는 자료구조입니다.<br><br>' +
        '큐에서는 먼저 들어온 데이터가 먼저 나가며, 줄을 서는 방식과 유사합니다.<br>' +
        '일반적인 큐의 동작은 두 가지 주요 연산으로 이루어집니다.',
    },
    {
        title: '스택',
        algorithmType: '자료구조',
        imgSrc: `${process.env.PUBLIC_URL}/images/box/stack.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/box/stack.gif`,
        tags: ['자료구조', '후입선출'],
        link: 'stack',
        description: '스택(stack)은 후입선출(LIFO; Last In, First Out) 구조를 가지는 자료구조입니다.<br><br>' +
        '공백인 스택에 자료 추가 시 가장 아래부터 자료가 쌓여 가장 마지막에 삽입한 자료가 가장 먼저 추출되고 삭제되는 자료구조입니다.',
    },
    {
        title: '힙 트리',
        algorithmType: '자료구조',
        imgSrc: `${process.env.PUBLIC_URL}/images/box/heap-tree.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/box/heap-tree.gif`,
        tags: ['자료구조', '우선순위 큐', '트리'],
        link: 'heap-tree',
        description: '최대 힙 트리(Maximum Heap Tree)나 최소 힙 트리(Minimum Heap Tree)를 이용하여 정렬하는 알고리즘입니다.<br><br>' +
        '내림차순으로 정렬 시 최대 힙 트리로 구성하고, 오름차순으로 정렬 시 최소 힙 트리로 구성하여 자료를 추출할 수 있습니다.',
    },
    {
        title: '연결 리스트',
        algorithmType: '자료구조',
        imgSrc: `${process.env.PUBLIC_URL}/images/box/linked-list.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/box/linked-list.gif`,
        tags: ['자료구조', '연결리스트'],
        link: 'linked-list',
        description: '연결 리스트(linked list)는 동일한 성격을 가진 자료들이 비연속적인 공간에 링크를 통해 순서대로 연결된 선형 자료구조입니다.<br><br>' +
        '자료의 삽입과 삭제가 빈번할 때 사용하면 시간 복잡도가 O(1)로 빠르지만, 자료 탐색이 잦은 경우에는 O(n)로 느린 단점이 있답니다.',
    },
    {
        title: '선택정렬',
        algorithmType: '정렬',
        imgSrc: `${process.env.PUBLIC_URL}/images/box/sort.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/box/selection-sort.gif`,
        tags: ['정렬', '배열'],
        link: 'selection-sort',
        description: '배열을 순회하면서 가장 작은(또는 큰) 원소를 선택하여 맨 앞부터 차례대로 정렬하는 방식입니다.<br><br>' +
        '원소의 개수가 적을 때 유용하지만, 시간 복잡도가 O(n^ 2) 으로 큰 배열에서는 성능이 저하될 수 있습니다.',
    },
    {
        title: '삽입정렬',
        algorithmType: '정렬',
        imgSrc: `${process.env.PUBLIC_URL}/images/box/sort.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/box/insertion-sort.gif`,
        tags: ['정렬', '배열'],
        link: 'insertion-sort',
        description: '배열을 정렬된 부분과 정렬되지 않은 부분으로 나누고, 정렬되지 않은 부분의 원소를 정렬된 부분에 삽입하여 정렬하는 방식입니다.<br><br>' + 
        '배열이 거의 정렬된 상태에서는 빠르게 동작하며, 시간 복잡도는 최선의 경우 O(n), 최악의 경우 O(n^ 2) 입니다.',
    },
    {
        title: '버블정렬',
        algorithmType: '정렬',
        imgSrc: `${process.env.PUBLIC_URL}/images/box/sort.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/box/bubble-sort.gif`,
        tags: ['정렬', '배열'],
        link: 'bubble-sort',
        description: '인접한 두 원소를 비교하며 큰 값을 뒤로 보내면서 정렬하는 방식입니다.<br><br>' +
        '간단하지만 비효율적인 정렬 방법으로, 시간 복잡도는 항상 O(n^2)입니다.',
    },
    {
        title: '병합정렬',
        algorithmType: '정렬',
        imgSrc: `${process.env.PUBLIC_URL}/images/box/sort.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/box/merge-sort.gif`,
        tags: ['정렬', '분할정복', '배열'],
        link: 'merge-sort',
        description: '배열을 반으로 나눈 후 각 부분을 재귀적으로 정렬하고, 정렬된 부분을 합병하여 전체를 정렬하는 방식입니다.<br><br>' +
        '분할 정복 알고리즘 중 하나로, 시간 복잡도는 항상 O(n log n)입니다.',
    },
    {
        title: '힙정렬',
        algorithmType: '정렬',
        imgSrc: `${process.env.PUBLIC_URL}/images/box/sort.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/box/heap-sort.gif`,
        tags: ['정렬', '힙', '배열'],
        link: 'heap-sort',
        description: '최대 힙 또는 최소 힙을 구성하여 정렬하는 방식으로, 힙을 구성하는 시간이 O(n)이고, 정렬하는 시간이 O(n log n)입니다.<br><br>' +
        '데이터를 정렬하는 동안 추가적인 메모리를 사용하지 않는 장점이 있습니다.',
    },
    {
        title: '퀵정렬',
        algorithmType: '정렬',
        imgSrc: `${process.env.PUBLIC_URL}/images/box/sort.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/box/quick-sort.gif`,
        tags: ['정렬', '분할정복', '배열'],
        link: 'quick-sort',
        description: '피벗을 기준으로 작은 값은 왼쪽, 큰 값은 오른쪽으로 분할하여 정렬하는 방식입니다.<br><br>' +
        '평균적으로 O(n log n)의 시간 복잡도를 가지지만, 최악의 경우 O(n^ 2) 이 될 수 있습니다.',
    },
        {
        title: 'BFS',
        algorithmType: '그래프',
        imgSrc: `${process.env.PUBLIC_URL}/images/box/bfs.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/box/bfs.gif`,
        tags: ['그래프', '탐색', '큐'],
        link: 'bfs',
        description: '루트 노드에서 시작하여 인접한 노드를 먼저 탐색하는 그래프 탐색 알고리즘입니다.<br><br>' +
        '큐를 사용하여 레벨 순서로 탐색하며, 최단 경로를 찾는 등에 활용됩니다.',
    },
    {
        title: 'DFS',
        algorithmType: '그래프',
        imgSrc: `${process.env.PUBLIC_URL}/images/box/dfs.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/box/dfs.gif`,
        tags: ['그래프', '탐색', '스택'],
        link: 'dfs',
        description: '루트 노드에서 시작하여 한 분기로써 탐색을 마치고 다음 분기로 넘어가는 방식의 그래프 탐색 알고리즘입니다.<br><br>' +
        '스택이나 재귀 함수를 통해 구현하며, 모든 경로를 탐색하거나 노드 상태를 검사할 때 사용됩니다.',
    },
    {
        title: '다익스트라',
        algorithmType: '그래프',
        imgSrc: `${process.env.PUBLIC_URL}/images/box/dijkstra.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/box/dijkstra.gif`,
        tags: ['그래프', '우선순위 큐'],
        link: 'dijkstra',
        description: '하나의 정점에서 다른 모든 정점까지의 최단 거리를 구하는 알고리즘입니다.<br><br>' + 
        '다익스트라가 제안한 알고리즘으로, 흔히 인공위성 GPS 소프트웨어 등에서 가장 많이 사용됩니다. ',
    },
    {
        title: '벨만-포드',
        algorithmType: '그래프',
        imgSrc: `${process.env.PUBLIC_URL}/images/box/bellman-ford.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/box/bellman-ford.gif`,
        tags: ['그래프', '동적계획법'],
        link: 'bellman-ford',
        description: '벨먼-포드(Bellman-Ford)는 가중 유향 그래프(Weighted-Directed Graph)에서 최단 경로 문제를 푸는 알고리즘입니다.<br><br>' +
        '(정점 - 1)번의 매 단계마다 모든 간선을 전부 확인하므로 시간 복잡도가 O(VE)로 느립니다.',
    },
    {
        title: '플로이드-워셜',
        algorithmType: '그래프',
        imgSrc: `${process.env.PUBLIC_URL}/images/box/floyd-warshall.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/box/floyd-warshall.gif`,
        tags: ['그래프', '동적계획법'],
        link: 'floyd-warshall',
        description: '플로이드-워셜(Floyd-Warshall)은 그래프에서 가능한 모든 노드 쌍에 대해 최단 거리를 구하는 알고리즘입니다.<br><br>' + 
        '시간 복잡도는 O(n^3)입니다. 모든 노드 쌍에 대해 최단 거리를 구하고, 음의 가중치를 가지는 그래프에서도 쓸 수 있습니다.',
    },
    {
        title: '최소 신장 트리',
        algorithmType: '그래프',
        imgSrc: `${process.env.PUBLIC_URL}/images/box/minimum-spanning-tree.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/box/minimum-spanning-tree.gif`,
        tags: ['그래프', '유니온-파인드'],
        link: 'minimum-spanning-tree',
        description: '최소 신장 트리란 한 그래프의 스패닝 트리들 중에서 가중값의 합이 가장 작은 것입니다.<br><br>' + 
        '신장 트리란 연결 그래프의 부분 그래프로서 그 그래프의 모든 정점과 간선의 부분 집합으로 구성되는 트리입니다.',
    },
    {
        title: '볼록껍질',
        algorithmType: '기하학',
        imgSrc: `${process.env.PUBLIC_URL}/images/box/convex-hull.png`,
        gifSrc: `${process.env.PUBLIC_URL}/images/box/convex-hull.gif`,
        tags: ['기하학', '브루트 포스'],
        link: 'convex-hull',
        description: '볼록 껍질(convex hull)은 집합으로 주어진 점이나 영역을 포함하는 가장 작은 볼록 집합입니다.<br><br>' +
        '일반적으로는 유클리드 공간에서 정의되지만, 그 이상으로 확장하는 것도 가능합니다. 볼록 폐포를 계산하는 것은 계산기하학의 연구과제중 하나입니다.',
    },
];