import React, { useRef, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { NodeFocusStatus } from '../../utils/graphData';

const getStrokeColor = (focusStatus: NodeFocusStatus, theme: string) => {
    if (focusStatus === 'inactive') {
        return theme === 'light' ? 'black' : 'white';
    }

    switch (focusStatus) {
        case 'active':
            return theme === 'light' ? 'black' : 'white';
        case 'completed':
            return theme === 'light' ? '#3498db' : '#2980b9';   
    }
};

const getStrokeColorOverlay = (focusStatus: NodeFocusStatus, theme: string) => {
    if (focusStatus === 'inactive') {
        return theme === 'light' ? 'black' : 'white';
    }

    switch (focusStatus) {
        case 'active':
            return theme === 'light' ? '#3498db' : '#2980b9';
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

export const Line = styled.line<{ $focusStatus: NodeFocusStatus, $theme: string, $dashed: boolean }>`
    stroke: ${({ $focusStatus, $theme }) => getStrokeColor($focusStatus, $theme)};
    stroke-width: 3;
    stroke-opacity: 0.6;
    stroke-dasharray: ${({ $dashed }) => ($dashed ? '8,4' : 'none')};
    cursor: pointer;
`;

const OverlayLine = styled.line<{ $focusStatus: NodeFocusStatus, $theme: string, $totalLength: number, $delay: number }>`
    stroke: ${({ $focusStatus, $theme }) => getStrokeColorOverlay($focusStatus, $theme)};
    stroke-width: 5;
    stroke-dasharray: ${({ $totalLength }) => $totalLength};
    stroke-dashoffset: ${({ $totalLength }) => $totalLength};
    animation: ${({ $totalLength, $delay }) => drawAnimation($totalLength)} ${({ $delay }) => $delay}ms linear forwards;
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
    dashed?: boolean;
    weight?: number;
    setWeight?: (newWeight: number) => void;
    $theme: string;
    onMouseDown?: (e: React.MouseEvent<SVGElement>) => void;
    focusStatus?: NodeFocusStatus;
    delay?: number;
}

const CustomLine: React.FC<CustomLineProps> = ({ x1, y1, x2, y2, $theme, weight, setWeight, dashed = false, onMouseDown, focusStatus = 'inactive', delay = 500 }) => {
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
        setIsEditing(false);

        if(validatePositiveInteger(inputValue)) {
            if(setWeight) {    
                setWeight(parseInt(inputValue));
            }
        }
        else {
            alert('양의 정수만 입력해주세요.');
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setIsEditing(false);

            if(validatePositiveInteger(inputValue)) {
                if(setWeight) {    
                    setWeight(parseInt(inputValue));
                }
            }
            else {
                alert('양의 정수만 입력해주세요.');
            }
        }

    };

    // 양의 정수 체크 함수
    const validatePositiveInteger = (value: string) => {
        if (value === null || value === '') {
            return false;
        }

        const positiveIntegerRegex = /^[1-9]\d*$/;
        if (!positiveIntegerRegex.test(value)) {
            return false;
        }
        return true;
    };
    
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

            {focusStatus === 'active' && (
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
