import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { useWindowSize } from '../../hooks/getWindowSize';
import { useTheme } from '../../context/themeContext';
import Button from '../common/buttons';
import SegmentedControl from '../common/segmentedControl';
import DelaySlider from '../common/delaySlider';
import { Dot, DotStatus } from '../../utils/dotData';
import CustomDot from './customDot';
import { generateUUID, getRandomInt } from '../../utils/common';
import CustomDotLine from './customDotLine';

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
    const [convexHull, setConvexHull] = useState<Dot[]>([]);

    const [algorithmSelected, setAlgorithmSelected] = useState(`Graham's Scan`);

    const [running, setRunning] = useState(false);

    const dotCountSelected = useRef('50');
    const delayRef = useRef<number>(500);

    const { width, height } = useWindowSize();

    const {theme} = useTheme();

    const isClockwise = (p1: Dot, p2: Dot, p3: Dot): boolean => {
        return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x) <= 0;
    };

    const isCounterClockwise = (p1: Dot, p2: Dot, p3: Dot): boolean => {
        return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x) > 0;
    };

    const updateDotFocus = async (dotId: string, updateState: DotStatus) => {
        dotDatas.forEach(dot => {
            dot.focus = dot.id === dotId ? updateState : dot.focus;
        });

        setDotDatas([...dotDatas]);
    }

    const grahamsScan = async () => {
        const startDot = dotDatas.reduce((prev, curr) => (curr.y < prev.y ? curr : prev));
    
        const sortedDots = dotDatas
            .filter(dot => dot !== startDot)
            .sort((a, b) => {
                const angleA = Math.atan2(a.y - startDot.y, a.x - startDot.x);
                const angleB = Math.atan2(b.y - startDot.y, b.x - startDot.x);
                return angleA - angleB;
            });
    
        const stack = [startDot, sortedDots[0], sortedDots[1]];
    
        updateDotFocus(startDot.id, 'active');
        updateDotFocus(sortedDots[0].id, 'active');
        updateDotFocus(sortedDots[1].id, 'active');

        setConvexHull([...stack]);
        await new Promise(resolve => setTimeout(resolve, delayRef.current));

        for (let i = 2; i < sortedDots.length; i++) {
            let top = stack.pop();
            let nextToTop = stack[stack.length - 1];
    
            while (top && nextToTop && isClockwise(nextToTop, top, sortedDots[i])) {
                updateDotFocus(top.id, 'active');
                updateDotFocus(nextToTop.id, 'active');

                top = stack.pop();
                nextToTop = stack[stack.length - 1];

                setConvexHull([...stack, nextToTop, sortedDots[i]]);
                await new Promise(resolve => setTimeout(resolve, delayRef.current));
            }
    
            stack.push(top!);
            stack.push(sortedDots[i]);
    
            updateDotFocus(nextToTop.id, 'active');
            updateDotFocus(sortedDots[i].id, 'active');
            
            setConvexHull([...stack]);
            await new Promise(resolve => setTimeout(resolve, delayRef.current));
        }
    
        dotDatas.forEach(dot => {
            if(stack.includes(dot)) {
                updateDotFocus(dot.id, 'completed');
            }
        });

        setConvexHull([...stack]);
        await new Promise(resolve => setTimeout(resolve, delayRef.current));
    };
    
    const jarvisMarch = async () => {
        let hull: Dot[] = [];
    
        const startDot = dotDatas.reduce((prev, curr) => (curr.x < prev.x ? curr : prev));
        let currentDot = startDot;


        do {
            hull.push(currentDot);
            let nextDot = dotDatas[0];

            updateDotFocus(currentDot.id, 'active');

            for (let i = 1; i < dotDatas.length; i++) {
                if (nextDot === currentDot || isCounterClockwise(currentDot, nextDot, dotDatas[i])) {
                    nextDot = dotDatas[i];

                    updateDotFocus(nextDot.id, 'active');

                    setConvexHull([...hull, nextDot]);
                    await new Promise(resolve => setTimeout(resolve, delayRef.current));
                }
            }
    
            const connectingDots = [...hull, nextDot];
            for (let j = 0; j < connectingDots.length - 1; j++) {
                connectingDots.slice(0, j + 2).forEach(dot => {
                    updateDotFocus(dot.id, 'active');
                });

                setConvexHull(connectingDots.slice(0, j + 2));

                await new Promise(resolve => setTimeout(resolve, delayRef.current));
            }
    
            currentDot = nextDot;
    
        } while (currentDot !== startDot);
    
        dotDatas.forEach(dot => {
            if(hull.includes(dot)) {
                updateDotFocus(dot.id, 'completed');
            }
        });

        setConvexHull([...hull]);
        await new Promise(resolve => setTimeout(resolve, delayRef.current));
    };
    
    
    const onclickBtnStart = async () => {
        setRunning(true);

        dotDatas.forEach(dot => {
            updateDotFocus(dot.id, 'inactive');
        });

        if(dotDatas.length >= 3) {
            if(algorithmSelected === "Graham's Scan") {
                await grahamsScan(); 
            }
            else {
                await jarvisMarch();
            }
        }
        else {
            alert('생성한 점 개수를 먼저 선택해주세요.');
        }

        setRunning(false);
    };

    const generateRandom = () => {
        setConvexHull([]);

        const newDots = [];
        for (let i = 0; i < parseInt(dotCountSelected.current); i++) {
            const id: string = generateUUID();
            const x: number = getRandomInt(50, width - 50);
            const y: number = getRandomInt(50, height * 0.7 - 50);
            const focus: DotStatus = 'inactive';

            newDots.push({ id, x, y, focus });
        }
        setDotDatas(newDots);
    };

    const handleDelayChange = (delay: number) => {
        delayRef.current = 250 / delay;
    };

    const handleChangeDotCount = (value: string) => {
        dotCountSelected.current = value;

        generateRandom();
    };

    const handleChangeAlgorithm = (value: string) => {
        setAlgorithmSelected(value);

        dotDatas.forEach(dot => {
            updateDotFocus(dot.id, 'inactive');
        });

        setConvexHull([]);
    };

    return (
    <ConvexHullCanvasContainer>
        <ConvexHullCanvasWapper height={height * 0.7}> 
            <CustomDotLine dots={convexHull} isCompeleted={!running}/>
            
            {dotDatas.map((dot, idx) => (
                <CustomDot key={idx} dot={dot} />
            ))}
        </ConvexHullCanvasWapper>

        <ConvexHullCanvasUIWapper $height={height * 0.1} $theme={theme}>

            <SegmentedControl options={dotCount_options} selectedValue={dotCountSelected.current} onChange={handleChangeDotCount} />

            <Button disabled={running} rightImg={`${process.env.PUBLIC_URL}/images/play-button.svg`} onClick={onclickBtnStart}>Start</Button>

            <Button disabled={running} rightImg={`${process.env.PUBLIC_URL}/images/shuffle-button.svg`} onClick={generateRandom}>Random</Button>
        
            <SegmentedControl options={algorithm_options} selectedValue={algorithmSelected} onChange={handleChangeAlgorithm} />

            <DelaySlider onDelayChange={handleDelayChange}/> 

        </ConvexHullCanvasUIWapper>
    </ConvexHullCanvasContainer>
    );
};

export default ConvexHullCanvas;
