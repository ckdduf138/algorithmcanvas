import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BoxProps, boxes } from '../../utils/box';

const allTags: string[] = Array.from(new Set(boxes.flatMap(box => box.tags)));

const tagColors: { [key: string]: string } = {
    '정렬': '#E6E6FA',
    '그래프탐색': '#7FFFD4',
};

allTags.forEach(tag => {
    if (!tagColors[tag]) {
        tagColors[tag] = `#ffffff`; // 기본 색상 설정
    }
});

const MainBox = styled.div`
    background: #fff;
    border-radius: 10%;
    display: inline-block;
    width: 270px;
    height: 270px;
    margin: 20px;
    position: relative;
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);
    text-align: center;
    cursor: pointer;
`;

const BoxTitle = styled.div`
    font-size: 30px;
    border: 10%;
`;

const BoxImage = styled.img`
    width: 65%;
    height: 65%;
    border-radius: 10%;
`;

const TagParent = styled.div`
    display: flex;
    margin: 2%;
    height: 27px;
    overflow: hidden;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`;

const Tag = styled.span<{ color: string }>`
    font-size: 18px;
    background-color: ${({ color }) => color || '#F0F1F2'};
    color: ${({ color }) => color ? '#000' : '#666'};
    border-radius: 4px;
    padding: 2px 5px 0;
`;

const Box: React.FC<BoxProps> = ({ title, imgSrc, tags, link }) => {
    const navigate = useNavigate();

    const box_onClicked = () => {
        navigate(link);
    };

    return (
        <MainBox onClick={box_onClicked}>
            <BoxTitle>{title}</BoxTitle>
            <BoxImage src={imgSrc} alt="box_image" />
            <TagParent>
                {tags.map((tag, index) => (
                    <Tag key={index} color={tagColors[tag]}>{tag}</Tag>
                ))}
            </TagParent>
        </MainBox>
    );
};

export default Box;
