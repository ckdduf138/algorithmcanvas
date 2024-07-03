import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BoxProps, tagColors } from '../../utils/box';

const Flip = styled.div`
    width: 270px;
    height: 270px;
    margin: 20px;

    perspective: 1100px;
`;

const BoxWapper = styled.div`
    display: inline-block;
    width: 100%;
    height: 100%;
    position: relative;
    background: #fff;
    border-radius: 10%;

    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);
    text-align: center;
    cursor: pointer;

    transform-style: preserve-3d;
    transition: 1s;

    &:hover {
        transform: rotateY(180deg);
    }
`;

const FrontBox = styled.div`
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 10%;
    backface-visibility: hidden;
    align-content: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const BackBox = styled.div`
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 10%;
    backface-visibility: hidden;
    align-content: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: rotateY(180deg);
`

const BoxTitle = styled.div`
    font-size: 30px;
`;

const BoxImage = styled.img`
    width: 90%;
    height: 65%;
    border-radius: 10%;
`;

const BoxDescription = styled.div`
    width: 90%;
    height: 65%;
    border-radius: 10%;
`;

const TagParent = styled.div`
    display: flex;
    width: 90%;
    height: 27px;
    margin: 2%;
    overflow: hidden;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`;

const Tag = styled.span<{ color: string }>`
    font-size: 18px;
    background-color: ${({ color }) => color || '#F0F1F2'};
    color: #000;
    border-radius: 4px;
    padding: 2px 5px 0;
`;

const Box: React.FC<BoxProps> = ({ title, imgSrc, tags, link, description }) => {
    const navigate = useNavigate();

    const box_onClicked = () => {
        navigate(link);
    };

    return (
        <Flip>
            <BoxWapper onClick={box_onClicked}>
            <FrontBox>
                <BoxTitle>{title}</BoxTitle>
                <BoxImage src={imgSrc} alt="box_image" />
                <TagParent>
                    {tags.map((tag, index) => (
                        <Tag key={index} color={tagColors[tag]}>{tag}</Tag>
                    ))}
                </TagParent>
            </FrontBox>

            <BackBox>
                <BoxTitle>{title}</BoxTitle>
                <BoxDescription>{description}</BoxDescription>
                <TagParent>
                    {tags.map((tag, index) => (
                        <Tag key={index} color={tagColors[tag]}>{tag}</Tag>
                    ))}
                </TagParent>
                </BackBox>
            </BoxWapper>
        </Flip>
    );
};

export default Box;