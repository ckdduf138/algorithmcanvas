export type NodeFocusStatus = 'inactive' | 'active' | 'highlight' | 'completed';

export interface BarGraphData {
    data: number;
    focus: NodeFocusStatus;
}

export const NodeRadius = 50;

export const NodeGraphWidthPadding = 50;
export const NodeGraphHeightPadding = 120;

export interface NodeGraphData {
    node: Node;
    link: Link;
    focus: NodeFocusStatus;
}

export interface Node {
    id: string;
    x: number;
    y: number;
    r: number;
};

export interface Link {
    source: string;
    target: string;
};

