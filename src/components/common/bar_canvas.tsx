import React, { useMemo } from 'react';

import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { GradientTealBlue } from '@visx/gradient';
import { scaleBand, scaleLinear } from '@visx/scale';

const verticalMargin = 100;

type BarCanvasProps = {
  width: number;
  height: number;
  data: number[];
  events?: boolean;
};

const BarCanvas: React.FC<BarCanvasProps> = ({ width, height, data, events = false }) => {
  const xMax = width;
  const yMax = height - verticalMargin;

  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: data.map((_, i) => i.toString()),
        padding: 0.2,
      }),
    [data, xMax],
  );
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data)],
      }),
    [data, yMax],
  );

  return (
    <svg width={width} height={height}>
      <GradientTealBlue id='barCanvas' />
      <rect width={width} height={height} fill="none"/>
      <Group top={verticalMargin / 2}>
        {data.map((d, index) => {
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(d) ?? 0);
          const barX = xScale(index.toString()) ?? 0;
          const barY = yMax - barHeight;
          const red = Math.floor((d / Math.max(...data)) * 255);
          const green = Math.floor(((data.length - index) / data.length) * 255);
          const blue = Math.floor((index / data.length) * 255);
          const fill = `rgb(${red}, ${green}, ${blue})`;
          return (
            <Bar
              key={index}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill={fill}
              onClick={() => {
                console.log("clicked data: " + d);
                if (events) alert(`clicked: ${JSON.stringify({ index, value: d })}`);
              }}
            />
          );
        })}
      </Group>
    </svg>
  );
};

export default BarCanvas;
