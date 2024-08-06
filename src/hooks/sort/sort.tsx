import { BarGraphData } from '../../utils/graphData';
import { generateRandomNumbers } from '../../utils/common';

export const useAdd = (setBarGraphData: React.Dispatch<React.SetStateAction<BarGraphData[]>>) => {
    const handleAdd = (inputValue: string) => {
        const newValue: BarGraphData = {
            data: parseInt(inputValue),
            focus: 'inactive'
        };
        setBarGraphData(prevData => [...prevData, newValue]);
    };

    return handleAdd;
};

export const useReset = (setBarGraphData: React.Dispatch<React.SetStateAction<BarGraphData[]>>) => {
    const handleReset = () => {
        setBarGraphData([]);
    };

    return handleReset;
};

export const useRandom = (setBarGraphData: React.Dispatch<React.SetStateAction<BarGraphData[]>>) => {
    const handleRandom = () => {
        const randomValues: number[] = generateRandomNumbers(0, 100, 20);
        
        const randomData: BarGraphData[] = randomValues.map((value) => ({
            data: value,
            focus: 'inactive'
        }));

        setBarGraphData(randomData);
    };

    return handleRandom;
};

export const useDelay = (delayRef: React.MutableRefObject<number>) => {
    const handleDelay = (delay: number) => {
        delayRef.current = 100 / delay;
    };

    return handleDelay;
};