import React, { useMemo, useState, useEffect } from 'react';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';
import styled from 'styled-components';

import BarCanvasMain from './barCanvas.Main';
import BarCanvasBottom from './barCanvas.Bottom';

import { getLogScale } from '../../utils/common';
import { BarGraphData } from '../../utils/graphData';
import { useWindowSize } from '../../hooks/getWindowSize';


const StyleCanvasMain = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const verticalMargin = 100;
const maxBarWidth = 100;

type BarCanvasProps = {
  barGraphData: BarGraphData[];
  events?: boolean;
};

const BarCanvas: React.FC<BarCanvasProps> = ({ barGraphData, events = false }) => {
  const { width, height } = useWindowSize();
  const [data, setData] = useState(barGraphData);
  const [prevData, setPrevData] = useState(barGraphData);

  useEffect(() => {
    setPrevData(data);
    setData(barGraphData);
  }, [barGraphData]);

  const xMax = width;
  const yMax = height - verticalMargin;

  const transformedData = useMemo(() => data.map(item => getLogScale(item.data)), [data]);

  const xScale = useMemo(() => {
    const scale = scaleBand<string>({
      range: [0, xMax],
      round: true,
      domain: transformedData.map((_, i) => i.toString()),
      padding: 0.2,
    });
    const bandwidth = Math.min(scale.bandwidth(), maxBarWidth);
    const newRange = [(xMax - bandwidth * transformedData.length) / 2, (xMax + bandwidth * transformedData.length) / 2];
    scale.range(newRange);
    return scale;
  }, [transformedData, xMax]);

  const yScale = useMemo(() => scaleLinear<number>({
    range: [yMax, 0],
    round: true,
    domain: [0, Math.max(...transformedData)],
  }), [transformedData, yMax]);

  return (
    <StyleCanvasMain>
      <svg width={width} height={height}>
        <Group top={verticalMargin / 2}>
          <BarCanvasMain
            data={data}
            prevData={prevData}
            transformedData={transformedData}
            xScale={xScale}
            yScale={yScale}
            yMax={yMax}
            events={events}
          />
        </Group>
        <BarCanvasBottom xScale={xScale} yMax={yMax} />
        </svg>
      </StyleCanvasMain>
  );
};

export default BarCanvas;
