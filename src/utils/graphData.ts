type FocusStatus = 'inactive' | 'active' | 'highlight' | 'completed';

export interface BarGraphData {
    data: number;
    focus: FocusStatus;
}