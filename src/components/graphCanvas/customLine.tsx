import React, { useRef, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { EdgeFocusStatus, NodeRadius, validateInteger, validatePositiveInteger } from '../../utils/graphData';

const getStrokeColor = (focusStatus: EdgeFocusStatus, theme: string) => {
    if (focusStatus === 'inactive') {
        return theme === 'light' ? 'black' : 'white';
    }

    switch (focusStatus) {
        case 'active':
            return theme === 'light' ? 'black' : 'white';
        case 'completed':
            return theme === 'light' ? '#3498db' : '#2980b9';  
        case 'success':
            return theme === 'light' ? '#2ecc71' : '#27ae60'; 
        case 'error':
            return theme === 'light' ? '#ff6f61 ' : 'b22222';   
    }
};

const getStrokeColorOverlay = (focusStatus: EdgeFocusStatus, theme: string) => {
    if (focusStatus === 'inactive') {
        return theme === 'light' ? 'black' : 'white';
    }

    switch (focusStatus) {
        case 'active':
            return theme === 'light' ? '#3498db' : '#2980b9';
        case 'error':
            return theme === 'light' ? '#ff6f61 ' : 'b22222';   
    }
};

const drawAnimation = (totalLength: number) => keyframes`
    from {
        stroke-dashoffset: ${totalLength};
    }
    to {
        stroke-dashoffset: 0;
    }
`;

export const Line = styled.line<{ $focusStatus: EdgeFocusStatus, $theme: string, $dashed: boolean }>`
    stroke: ${({ $focusStatus, $theme }) => getStrokeColor($focusStatus, $theme)};
    stroke-width: 3;
    stroke-opacity: 0.6;
    stroke-dasharray: ${({ $dashed }) => ($dashed ? '8,4' : 'none')};
    cursor: pointer;
`;

const Arrow = styled.line<{ $focusStatus: EdgeFocusStatus, $theme: string }>`
    stroke: ${({ $focusStatus, $theme }) => getStrokeColor($focusStatus, $theme)};
    stroke-opacity: 0.6;
    stroke-width: 3;
`;

const OverlayLine = styled.line<{ $focusStatus: EdgeFocusStatus, $theme: string, $totalLength: number, $delay: number }>`
    stroke: ${({ $focusStatus, $theme }) => getStrokeColorOverlay($focusStatus, $theme)};
    stroke-width: 5;
    stroke-dasharray: ${({ $totalLength }) => $totalLength};
    stroke-dashoffset: ${({ $totalLength }) => $totalLength};
    animation: ${({ $totalLength }) => drawAnimation($totalLength)} ${({ $delay }) => $delay}ms linear forwards;
`;

const OverlayArrow = styled.line<{ $focusStatus: EdgeFocusStatus, $theme: string, $delay: number }>`
    stroke: ${({ $focusStatus, $theme }) => getStrokeColorOverlay($focusStatus, $theme)};
    stroke-width: 5;
    stroke-dasharray: 15;
    stroke-dashoffset: 15;
    animation: ${drawAnimation(15)} ${({ $delay }) => $delay * 0.25}ms linear forwards;
    animation-delay: ${({ $delay }) => $delay}ms;
`;

const WeightTextWapper = styled.rect`
    fill: #fff;
`;

const WeightText = styled.text`
    fill: black;
    font-size: 28px;
    dominant-baseline: middle;
    text-anchor: middle;
    cursor: pointer; 
    user-select: none;
`;

const WeightInput = styled.input`
    width: 100%;
    height: 100%;
    color: black;
    background: #fff;
    border: 2px;
    text-align: center;

    //text 
    font-size: 28px;
`;

interface CustomLineProps {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    direction?: boolean
    dashed?: boolean;
    weight?: number;
    isNegativeWeightAllowed: boolean;
    setWeight?: (newWeight: number) => void;
    $theme: string;
    onMouseDown?: (e: React.MouseEvent<SVGElement>) => void;
    focusStatus?: EdgeFocusStatus;
    delay?: number;
    arrowId: string;
}

const CustomLine: React.FC<CustomLineProps> = ({ x1, y1, x2, y2, direction = false, $theme, weight, isNegativeWeightAllowed, arrowId,
    setWeight, dashed = false, onMouseDown, focusStatus = 'inactive', delay = 500 }
) => {
    const lineRef = useRef<SVGLineElement>(null);
    const [inputValue, setInputValue] = useState("");

    const [isEditing, setIsEditing] = useState(false);
    const [totalLength, setTotalLength] = useState(0);

    useEffect(() => {
        if (lineRef.current) {
            const length = lineRef.current.getTotalLength();
            setTotalLength(length);
        }
    }, [x1, y1, x2, y2]);

    const handleTextClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setInputValue(value);
    };

    const handleInputFocus = () => {
        if(weight) {
            setInputValue(weight.toString());
        }
    };

    const handleInputBlur = () => {
        if(isNegativeWeightAllowed) {
            ReturnInteger();
        }
        else {
            ReturnPostiveInteger();
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if(isNegativeWeightAllowed) {
                ReturnInteger();
            }
            else {
                ReturnPostiveInteger();
            }
        }
    };
    
    const ReturnPostiveInteger = () => {
        setIsEditing(false);

        if(validatePositiveInteger(inputValue)) {
            if(setWeight) {    
                setWeight(parseInt(inputValue));
            }
        }
        else {
            alert('1000이하의 양의 정수만 입력해주세요.');
        }
    };

    const ReturnInteger = () => {
        setIsEditing(false);

        if(validateInteger(inputValue)) {
            if(setWeight) {    
                setWeight(parseInt(inputValue));
            }
        }
        else {
            alert('-1000 ~ 1000 사이 정수만 입력해주세요.');
        }
    };

    const arrowPos = arrowId === 'arrowhead_dragging' ? 0 : NodeRadius;

    const angle = Math.atan2(y2 - y1, x2 - x1);
    const headLength = 15;

    const adjustedX2 = x2 - arrowPos * Math.cos(angle);
    const adjustedY2 = y2 - arrowPos * Math.sin(angle);

    const arrowX1 = adjustedX2 - headLength * Math.cos(angle - Math.PI / 6);
    const arrowY1 = adjustedY2 - headLength * Math.sin(angle - Math.PI / 6);
    const arrowX2 = adjustedX2 - headLength * Math.cos(angle + Math.PI / 6);
    const arrowY2 = adjustedY2 - headLength * Math.sin(angle + Math.PI / 6);

    return (
        <>
            <Line 
                ref={lineRef} 
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                $focusStatus={focusStatus} 
                $theme={$theme}
                $dashed={dashed}
                onMouseDown={onMouseDown}
            />

            {/* 화살표 */}
            {direction && 
                <>
                    <Arrow x1={arrowX1} y1={arrowY1} x2={adjustedX2} y2={adjustedY2} $focusStatus={focusStatus} $theme={$theme} />
                    <Arrow x1={arrowX2} y1={arrowY2} x2={adjustedX2} y2={adjustedY2}  $focusStatus={focusStatus} $theme={$theme} />
                </>
            }


            {focusStatus === 'active' && (
                <>
                    <OverlayLine 
                        x1={x1} 
                        y1={y1} 
                        x2={x2} 
                        y2={y2} 
                        $focusStatus={focusStatus} 
                        $theme={$theme} 
                        $totalLength={totalLength} 
                        $delay={delay} 
                    />
                {/* 화살표 */}
                {direction && 
                <>
                    <OverlayArrow x1={arrowX1} y1={arrowY1} x2={adjustedX2} y2={adjustedY2} $focusStatus={focusStatus} $theme={$theme} $delay={delay}  />
                    <OverlayArrow x1={arrowX2} y1={arrowY2} x2={adjustedX2} y2={adjustedY2} $focusStatus={focusStatus} $theme={$theme} $delay={delay} />
                </>
            }
                </>
            )}

            {!isEditing && weight !== undefined && 
                <>
                    <WeightTextWapper 
                        x={(x1 + x2) / 2 - (weight.toString().length * 0.6 * 28 / 2)}
                        y={(y1 + y2) / 2 - 14}
                        width={(weight.toString().length * 0.6 * 28)}
                        height={28} 
                    />
                    <WeightText x={(x1 + x2) / 2} y={(y1 + y2) / 2} onClick={handleTextClick}>
                        {weight}
                    </WeightText>
                </>
            }

            {isEditing && weight !== undefined && 
                <foreignObject 
                    x={(x1 + x2) / 2 - (weight.toString().length * 0.6 * 28)} 
                    y={(y1 + y2) / 2 - 14} 
                    width={(weight.toString().length * 0.6) * 2 * 28} 
                    height={28}
                >
                    <WeightInput
                        value={inputValue}
                        onKeyUp={handleKeyPress}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur} 
                        autoFocus
                        style={{
                            'lineHeight': (Number.toString().length * 0.6) * 2,
                        }}
                    />
                </foreignObject>
            }
        </>
    );
};

export default CustomLine;
