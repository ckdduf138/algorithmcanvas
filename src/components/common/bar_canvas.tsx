import React, { useMemo } from 'react';

import { AxisBottom } from '@visx/axis';
import { Bar } from '@visx/shape';
import { GradientTealBlue } from '@visx/gradient';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';

import { getLogScale } from '../../utils/common';

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

  const transformedData = useMemo(() => data.map(getLogScale), [data]);

  const xScale = useMemo(() =>
    scaleBand<string>({
      range: [0, xMax],
      round: true,
      domain: transformedData.map((_, i) => i.toString()),
      padding: 0.2,
    }),
    [transformedData, xMax],
  );
  
  const yScale = useMemo(() =>
    scaleLinear<number>({
      range: [yMax, 0],
      round: true,
      domain: [0, Math.max(...transformedData)],
    }),
    [transformedData, yMax],
  );

  const bars = transformedData.map((d, index) => {
    const barWidth = xScale.bandwidth();
    const barHeight = yMax - (yScale(d) ?? 0);
    const barX = xScale(index.toString()) ?? 0;
    const barY = yMax - barHeight;
    const red = Math.floor((d / Math.max(...transformedData)) * 255);
    const green = Math.floor(((transformedData.length - index) / transformedData.length) * 255);
    const blue = Math.floor((index / transformedData.length) * 255);
    const fill = `rgb(${red}, ${green}, ${blue})`;

    return {
      barX,
      barY,
      barWidth,
      barHeight,
      fill,
      value: data[index],
    };
  });

  const getBar = () => {
    return (
      bars.map((bar, index) => (
        <React.Fragment key={index}>
          <Bar
            x={bar.barX}
            y={bar.barY}
            width={bar.barWidth}
            height={bar.barHeight}
            fill={bar.fill}
            onClick={() => {
              console.log("clicked data: " + bar.value);
              if (events) alert(`clicked: ${JSON.stringify({ index, value: bar.value })}`);
            }}
          />
          <text x={bar.barX + bar.barWidth / 2} y={bar.barY + bar.barHeight - 10} fontSize="36px" textAnchor="middle" fill="#000000">
            {bar.value}
          </text>
        </React.Fragment>
      ))
    );
  };


  const getBottomIndex = () => {

    return (
      <AxisBottom
        top={yMax + 70}
        scale={xScale}
        stroke="#ffffff"
        tickStroke="#ffffff"
        hideAxisLine
        hideTicks
        tickFormat={(index) => `[${index}]`}
        tickLabelProps={() => ({
          fill: '#ffffff',
          fontSize: '30px',
          textAnchor: 'middle',
        })}
      />
    );
  };

  return (
    <svg width={width} height={height}>
      <GradientTealBlue id='barCanvas' />
      <rect width={width} height={height} fill="none"/>
      <Group top={verticalMargin / 2}>
        {getBar()}
      </Group>
      {getBottomIndex()}
    </svg>
  );
};

export default BarCanvas;
