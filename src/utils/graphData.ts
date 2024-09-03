type FocusStatus = 'inactive' | 'active' | 'highlight' | 'completed';

export interface BarGraphData {
    data: number;
    focus: FocusStatus;
}

export const NodeRadius = 50;

export interface Node {
    id: string;
    x: number;
    y: number;
};