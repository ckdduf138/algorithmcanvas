import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BoxProps, tagColors } from '../../utils/box';

const Flip = styled.div`
display: flex;
    width: 300px;
    height: 400px;
    margin: 30px;
    border-radius: 12px;
    perspective: 1100px;
    align-items: center;
    justify-content: center;
`;

const GradientBox = styled.div<{$isTurn: boolean}>`
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    z-index: 0;
    padding: 0;
    background: linear-gradient(#00C2FF, #0019FF);
    transform-style: preserve-3d;
    transition: transform 1s;
    transform: ${({$isTurn}) => $isTurn ? '' : 'rotateY(180deg)'};
`;

const BoxWapper = styled.div<{$isTurn: boolean}>`
    display: inline-block;
    width: 97%;
    height: 97%;
    position: relative;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);
    cursor: pointer;
    transform-style: preserve-3d;
    transition: transform 1s;
    transform: ${({$isTurn}) => $isTurn ? '' : 'rotateY(180deg)'};
`;

const FrontBox = styled.div`
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    background: #fff;
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
    border-radius: 8px;
    background: #fff;
    backface-visibility: hidden;
    align-content: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: rotateY(180deg);
`

const BoxTitle = styled.div`
    font-size: 26px;
`;

const TurnImage = styled.img`
    width: 10%;
    position: absolute;
    right: 0;
    top: 0;
    margin: 15px;
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

const Box: React.FC<BoxProps & { onTagClick: (tag: string) => void }> = ({ title, imgSrc, gifSrc, tags, link, description, onTagClick }) => {
    const [isFront, setIsFront] = useState(true);
    const [isHover, setIsHover] = useState(false);

    const navigate = useNavigate();

    const onclickedBox = () => {
        navigate(link);
    };
    const handleTagClick = (tag: string, event: React.MouseEvent<HTMLSpanElement>) => {
        event.stopPropagation();
        onTagClick(tag);
    };

    return (
        <Flip>
            <GradientBox $isTurn={isFront}/>
            <BoxWapper $isTurn={isFront} onClick={onclickedBox} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>

                <FrontBox>
                    <BoxTitle>{title}</BoxTitle>
                    <TurnImage src={`${process.env.PUBLIC_URL}/images/cycle-arrow.png`} 
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsFront(false);
                        }}
                    />
                    <BoxImage src={isHover ? gifSrc : imgSrc} alt="boximage" />
                    <TagParent>
                        {tags.map((tag, index) => (
                            <Tag
                            key={index}
                            color={tagColors[tag]}
                            onClick={(e) => handleTagClick(tag, e)}
                        >{tag}</Tag>
                        ))}
                    </TagParent>
                </FrontBox>

                <BackBox>
                    <BoxTitle>{title}</BoxTitle>
                    <TurnImage src={`${process.env.PUBLIC_URL}/images/cycle-arrow.png`} 
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsFront(true);
                        }}
                    />
                    <BoxDescription>{description}</BoxDescription>
                    <TagParent>
                        {tags.map((tag, index) => (
                            <Tag
                            key={index}
                            color={tagColors[tag]}
                            onClick={(e) => handleTagClick(tag, e)}
                            >{tag}</Tag>
                        ))}
                    </TagParent>
                </BackBox>
            </BoxWapper>
        </Flip>
    );
};

export default Box;