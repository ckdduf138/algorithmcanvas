import React from "react";
import styled from "styled-components";

const ProgressContainer = styled.div`
    width: 100%;
    height: 30px;
    background-color: #f3f3f3;
    border-radius: 4px;
    position: relative;
    margin-top: 10px;
`;

const ProgressBarFill = styled.div<{ width: number }>`
    width: ${props => props.width}%;
    height: 100%;
    background-color: #4caf50;
    transition: width 0.1s;
`;

interface ProgressBarProps {
    min: number;
    max: number;
    value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ min, max, value }) => {
    const progress = ((value - min) / (max - min)) * 100;

    return (
        <ProgressContainer>
            <ProgressBarFill width={progress} />
        </ProgressContainer>
    );
};

export default ProgressBar;
