
import React from 'react';
import { AxisBottom } from '@visx/axis';

type AxisComponentProps = {
  xScale: any;
  yMax: number;
};

const AxisComponent: React.FC<AxisComponentProps> = ({ xScale, yMax }) => {
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

export default AxisComponent;
