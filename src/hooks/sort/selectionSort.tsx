import { BarGraphData } from "../../utils/graphData";

export const useSelectionSort = (barGraphData: BarGraphData[], setBarGraphData: React.Dispatch<React.SetStateAction<BarGraphData[]>>, sortOrder: 'asc' | 'desc', delayRef: React.MutableRefObject<number>) => {
    const handleStart = async () => {
        const dataLength = barGraphData.length;

        barGraphData.forEach(data => {
            data.focus = 'inactive';
        });
        
        for (let i = 0; i < dataLength; i++) {
            let index = i;

            barGraphData[i].focus = 'highlight';
            setBarGraphData([...barGraphData]);

            for (let j = i + 1; j < dataLength; j++) {
                if (index !== j) {
                    barGraphData[j].focus = 'active';
                    setBarGraphData([...barGraphData]);
                }

                const shouldHighlightAsc = sortOrder === 'asc' && barGraphData[j].data < barGraphData[index].data;
                const shouldHighlightDesc = sortOrder === 'desc' && barGraphData[j].data > barGraphData[index].data;
                
                await new Promise(resolve => setTimeout(resolve, delayRef.current));

                if (shouldHighlightAsc || shouldHighlightDesc) {
                    barGraphData[index].focus = 'inactive';
                    barGraphData[i].focus = 'active';
                    barGraphData[j].focus = 'highlight';
                    setBarGraphData([...barGraphData]);

                    index = j;
                } else {
                    barGraphData[j].focus = 'inactive';
                    setBarGraphData([...barGraphData]);
                }
            }

            await new Promise(resolve => setTimeout(resolve, delayRef.current));

            [barGraphData[i].data, barGraphData[index].data] = [barGraphData[index].data, barGraphData[i].data];

            barGraphData[index].focus = 'inactive';
            barGraphData[i].focus = 'completed';
            setBarGraphData([...barGraphData]);
        }
    };

    return handleStart;
};
