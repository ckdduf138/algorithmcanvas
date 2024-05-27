
import React from 'react';
import { AxisBottom } from '@visx/axis';
import { useTheme } from '../../context/themeContext';

type AxisComponentProps = {
  xScale: any;
  yMax: number;
};

const BarCanvasBottom: React.FC<AxisComponentProps> = ({ xScale, yMax }) => {
  const { theme } = useTheme();

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
        fill: theme === 'light' ? '#15202b' : '#ffffff',
        fontSize: '30px',
        textAnchor: 'middle',
      })}
    />
  );
};

export default BarCanvasBottom;
