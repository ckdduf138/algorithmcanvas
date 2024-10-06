import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import { useWindowSize } from '../../hooks/getWindowSize';
import { useTheme } from '../../context/themeContext';
import Button from '../common/buttons';
import SegmentedControl from '../common/segmentedControl';
import DelaySlider from '../common/delaySlider';
import { Dot, DotStatus } from '../../utils/dotData';
import CustomDot from './customDot';
import { getRandomInt } from '../../utils/common';
import InputBox from '../common/InputBox';

const ConvexHullCanvasContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    flex-direction: column;
`;

const ConvexHullCanvasWapper = styled.svg`
    width: 100%;
    display: flex;
`;

const ConvexHullCanvasUIWapper = styled.div<{ $height: number, $theme: string}>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${(props) => (props.$height + 'px' )};
    gap: 1%;
`;

const dotCount_options = [
    { value: '50', label: '50개' },
    { value: '100', label: '100개' },
    { value: '200', label: '200개' },
];

const algorithm_options = [
    { value: `Graham's Scan`, label: `Graham's Scan` },
    { value: `Jarvis's March`, label: `Jarvis's March` },
];
  
interface ConvexHullCanvasProps {

};

const ConvexHullCanvas: React.FC<ConvexHullCanvasProps> = () => {
    const [dotDatas, setDotDatas] = useState<Dot[]>([]);

    const [dotCountSelected, setDotCountSelected] = useState('50');
    const [algorithmSelected, setAlgorithmSelected] = useState(`Graham's Scan`);

    const delayRef = useRef<number>(500);

    const { width, height } = useWindowSize();

    const {theme} = useTheme();

    const onclickBtnStart = () => {

    };

    const generateRandom = () => {
        const newDots = [];
        for (let i = 0; i < parseInt(dotCountSelected); i++) {
            const x: number = getRandomInt(50, width - 50);
            const y: number = getRandomInt(50, height * 0.7 - 50);
            const focus: DotStatus = 'inactive';

            newDots.push({ x, y, focus });
        }
        setDotDatas(newDots);
    };

    const handleDelayChange = (delay: number) => {
        delayRef.current = 1000 / delay;
    };

    const handleChangeDotCount = (value: string) => {
        setDotCountSelected(value);

        generateRandom();
    };

    const handleChangeAlgorithm = (value: string) => {
        setAlgorithmSelected(value);
    };

    return (
    <ConvexHullCanvasContainer>
        <ConvexHullCanvasWapper height={height * 0.7}> 
            {dotDatas.map((dot, idx) => (
                <CustomDot key={idx} dot={dot} />
            ))}

        </ConvexHullCanvasWapper>

        <ConvexHullCanvasUIWapper $height={height * 0.1} $theme={theme}>

            <SegmentedControl options={dotCount_options} selectedValue={dotCountSelected} onChange={handleChangeDotCount} />

            <Button disabled={false} rightImg={`${process.env.PUBLIC_URL}/images/play-button.svg`} onClick={onclickBtnStart}>Start</Button>

            <Button disabled={false} rightImg={`${process.env.PUBLIC_URL}/images/shuffle-button.svg`} onClick={generateRandom}>Random</Button>
        
            <SegmentedControl options={algorithm_options} selectedValue={algorithmSelected} onChange={handleChangeAlgorithm} />

            <DelaySlider onDelayChange={handleDelayChange}/> 

        </ConvexHullCanvasUIWapper>
    </ConvexHullCanvasContainer>
    );
};

export default ConvexHullCanvas;
