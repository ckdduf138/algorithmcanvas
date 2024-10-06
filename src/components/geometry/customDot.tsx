import React from 'react';
import { Dot } from '../../utils/dotData';
import { useTheme } from '../../context/themeContext';

interface CustomLineProps {
    dot: Dot
}

const CustomDot: React.FC<CustomLineProps> = ({ dot }) => {
    
    const {theme} = useTheme();

    return (
        <circle cx={dot.x} cy={dot.y} r={5} fill= {theme === 'light' ? '#333' : '#fff'} />
    );
};

export default CustomDot;
