import React from 'react';
import { Bar } from '@visx/shape';

type BarComponentProps = {
  data: any[];
  prevData: any[];
  transformedData: number[];
  xScale: any;
  yScale: any;
  yMax: number;
  events: boolean;
};

const BarComponent: React.FC<BarComponentProps> = ({
  data,
  prevData,
  transformedData,
  xScale,
  yScale,
  yMax,
  events,
}) => {
  return (
    <>
      {transformedData.map((d, index) => {
        const barWidth = Math.min(xScale.bandwidth(), 100);
        const barHeight = yMax - (yScale(d) ?? 0);
        const barX = (xScale(index.toString()) ?? 0) + (xScale.bandwidth() - barWidth) / 2;
        const barY = yMax - barHeight;
        const red = Math.floor((d / Math.max(...transformedData)) * 255);
        const green = Math.floor(((transformedData.length - index) / transformedData.length) * 255);
        const blue = Math.floor((index / transformedData.length) * 255);
        const fill = `rgb(${red}, ${green}, ${blue})`;
        const stroke = data[index].focus === 1 ? 'white' : 'none';
        const strokeWidth = data[index].focus === 1 ? 10 : 0;
        const isChanged = prevData[index] && prevData[index].data !== data[index].data;

        return (
          <React.Fragment key={index}>
            <Bar
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill={fill}
              stroke={stroke}
              strokeWidth={strokeWidth}
              style={{ transition: isChanged ? 'all 0.5s ease' : 'none' }}
              onClick={() => {
                console.log("clicked data: " + data[index].data);
                if (events) alert(`clicked: ${JSON.stringify({ index, value: data[index].data })}`);
              }}
            />
            <text
              x={barX + barWidth / 2}
              y={barY + barHeight - 10}
              fontSize="36px"
              textAnchor="middle"
              fill="#000000"
            >
              {data[index].data}
            </text>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default BarComponent;
