import React from 'react';
import '../../styles/box.css'

interface BoxProps {
    title: string;
    imgSrc: string;
    tags: string[];
    link: string;
    children?: React.ReactNode; // children 속성 추가
}

const Box: React.FC<BoxProps> = ({ title, imgSrc, tags, link, children }) => {
    const handleClick = () => {
        window.location.href = link;
    };

    return (
        <div className='box_main' onClick={handleClick}>
            <div className='box_title'>{title}</div>
            <img className='box_image' src={imgSrc} />
            <div className='box_tagParent'>
                {tags.map((tag, index) => (
                    <span className='box_tag' key={index}>{tag}</span>
                ))}
            </div>
        </div>
    );
};

export default Box;
