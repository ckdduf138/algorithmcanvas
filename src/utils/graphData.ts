export type NodeFocusStatus = 'selected' | 'inactive' | 'active' | 'highlight' | 'completed' | 'success' | 'error';

export type EdgeFocusStatus = 'inactive' | 'active' | 'completed' | 'success' |'error';

export const NodeRadius = 50;

export const NodeGraphWidthPadding = 50;
export const NodeGraphHeightPadding = 150;

export interface BarGraphData {
    data: number;
    focus: NodeFocusStatus;
}

export interface NodeGraphData {
    nodes: Node[];
    links: Link[];
}

export interface Node {
    id: string;
    x: number;
    y: number;
    radius: number;
    text: string;
    focus: NodeFocusStatus;
};

export interface Link {
    source: string;
    target: string;
    weight?: number;
    direction?: boolean;
    dashed?: boolean;
    focus: EdgeFocusStatus;
};

export interface CirclePosition {
    id: string;
    cx: number;
    cy: number;
    radius: number;
}

export interface EdgePosition {
    x1: number;
    y1: number;
    x2: number | null;
    y2: number | null;
    weight?: number;
    direction?: boolean;
}

export const getClosestAndFurthestNode = ( targetPos: { x: number; y: number }, node1: Node, node2: Node ): [Node, Node] => {
    const distance = (node: Node) => {
        return Math.sqrt((node.x - targetPos.x) ** 2 + (node.y - targetPos.y) ** 2);
    };

    const distance1 = distance(node1);
    const distance2 = distance(node2);

    return distance1 > distance2 ? [node1, node2] : [node2, node1];
};
  
export const findOverlappingNode = (newNode: Node, existingNodes: Node[]): Node | null => {
    for (const node of existingNodes) {
        if (isOverlapping(newNode, node)) {
            return node;
        }
    }

    return null;
};

const isOverlapping = (node1: Node, node2: Node) => {
    const distance = Math.sqrt(
        (node1.x - node2.x) ** 2 + (node1.y - node2.y) ** 2
    );

    return distance <= node1.radius + node2.radius;
};

// 양의 정수 체크 함수
export const validatePositiveInteger = (value: string) => {
    if (value === null || value === '') {
        return false;
    }

    if (parseInt(value) > 1000) {
        return false;
    }

    const positiveIntegerRegex = /^[1-9]\d*$/;
    if (!positiveIntegerRegex.test(value)) {
        return false;
    }
    return true;
};

// 정수 체크 함수
export const validateInteger = (value: string) => {
    if (value === null || value === '') {
        return false;
    }

    const numberValue = parseInt(value, 10);
    if (numberValue > 1000 || numberValue < -1000) {
        return false;
    }

    const integerRegex = /^-?\d+$/;
    if (!integerRegex.test(value)) {
        return false;
    }

    return true;
};
