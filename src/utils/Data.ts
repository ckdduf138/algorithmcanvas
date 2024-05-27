type FocusStatus = 'inactive' | 'active' | 'completed';

export interface BarGraphData {
    data: number;
    focus: FocusStatus;
}