
import React from 'react';
import { AxisBottom } from '@visx/axis';
import { useTheme } from '../../context/themeContext';

type AxisComponentProps = {
  xScale: any;
  postionY: number;
  dataLength: number
};

const BarCanvasBottom: React.FC<AxisComponentProps> = ({ xScale, postionY: yMax, dataLength }) => {
  const { theme } = useTheme();

  dataLength = dataLength > 30 ? dataLength / (dataLength / 30 + 1) : dataLength;

  return (
    <AxisBottom
      top={yMax}
      scale={xScale}
      stroke="#ffffff"
      numTicks={dataLength}
      tickStroke="#ffffff"
      hideAxisLine
      hideTicks
      tickFormat={(index) => `[${index}]`}
      tickLabelProps={() => ({
        fill: theme === 'light' ? '#15202b' : '#ffffff',
        fontSize: `${Math.min(Math.max(xScale.bandwidth(), 30), 30)}px`,
        textAnchor: 'middle',
      })}
    />
  );
};

export default BarCanvasBottom;
