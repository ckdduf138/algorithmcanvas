import React from 'react';
import { Bar } from '@visx/shape';
import { useTheme } from '../../context/themeContext';
import { BarGraphData } from '../../utils/Data';

type BarComponentProps = {
  data: BarGraphData[];
  prevData: BarGraphData[];
  transformedData: number[];
  xScale: any;
  yScale: any;
  yMax: number;
  events: boolean;
};

const BarCanvasMain: React.FC<BarComponentProps> = ({ data, prevData, transformedData, xScale, yScale, yMax, events }) => {
  const { theme } = useTheme();
  
  return (
    <>
      {transformedData.map((d, index) => {
        const barWidth = Math.min(xScale.bandwidth(), 100);
        const barHeight = yMax - (yScale(d) ?? 0);
        const barX = (xScale(index.toString()) ?? 0) + (xScale.bandwidth() - barWidth) / 2;
        const barY = yMax - barHeight;
        const fill = data[index].focus === 'active' ? '#F5005A' 
             : data[index].focus === 'completed' ? '#00FF00' 
             : theme === 'light' ? '#15202b' : '#ffffff';
        const isChanged = prevData[index] && prevData[index].data !== data[index].data;

        return (
          <React.Fragment key={index}>
            <Bar
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill={fill}
              style={{ transition: isChanged ? 'all 0.5s ease' : 'none' }}
              onClick={() => {
                console.log("clicked data: " + data[index].data);
                if (events) alert(`clicked: ${JSON.stringify({ index, value: data[index].data })}`);
              }}
            />
            <text
              x={barX + barWidth / 2}
              y={barY + barHeight - 10}
              fontSize="24px"
              textAnchor="middle"
              fill= {theme === 'light' ? '#ffffff' : '#15202b'}
            >
              {data[index].data}
            </text>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default BarCanvasMain;
