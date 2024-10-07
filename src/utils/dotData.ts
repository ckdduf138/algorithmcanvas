export type DotStatus = 'inactive' | 'active' | 'completed';

export interface Dot {
    id: string;
    x: number;
    y: number;
    focus: DotStatus;
};