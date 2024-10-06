export type DotStatus = 'inactive' | 'active' | 'completed';

export interface Dot {
    x: number;
    y: number;
    focus: DotStatus;
};