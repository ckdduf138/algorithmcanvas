type FocusStatus = 'inactive' | 'active' | 'highlight' | 'completed';

export interface BarGraphData {
    data: number;
    focus: FocusStatus;
}

export const NodeRadius = 50;

export const NodeGraphWidthPadding = 50;
export const NodeGraphHeightPadding = 120;

export interface NodeGraphData {
    node: Node;
    link: Link;
    focus: FocusStatus;
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

