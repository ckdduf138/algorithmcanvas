import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { algorithmTypes, BoxProps, tagColors, tagHoverColors } from '../../utils/box';

// box
const Flip = styled.div`
    display: flex;
    min-width: 300px;
    height: 400px;
    margin: 30px;
    border-radius: 12px;
    perspective: 1100px;
    align-items: center;
    justify-content: center;
`;

const BoxWapper = styled.div<{$rotation: number, $algorithmType: string}>`
    display: inline-block;
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    position: relative;
    background: #fff;
    border-radius: 8px;
    transform-style: preserve-3d;
    transition: transform 1s;
    transform: ${({ $rotation }) => `rotateY(${$rotation}deg)`};

    &:before {
        content: '';
        position: absolute;
        top: -4px;
        bottom: -4px;
        left: -4px;
        right: -4px;
        border-radius: 12px;
        z-index: -1;
        padding: 0;
        background: ${({ $algorithmType }) => `linear-gradient(${algorithmTypes[$algorithmType][0]}, ${algorithmTypes[$algorithmType][1]})`};
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.15), 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    &:hover {
        transform: ${({ $rotation }) => `rotateY(${$rotation}deg) scale(1.03)`};
    }
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
    gap: 10px;
    cursor: pointer;
`;

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
    gap: 10px;
    transform: rotateY(180deg)
`;

const BoxTitle = styled.div`
    display: flex;
    width: 100%;
    padding: 8px 0;
    justify-content: center;

    // text
    font-size: 26px;
    font-weight: 600;
`;

const BoxImage = styled.img`
    width: 80%;
    height: 50%;
`;

const TagParent = styled.div`
    display: flex;
    width: 90%;
    padding: 2%;
    overflow: hidden;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
`;

const Tag = styled.div<{ tag_color: string, tag_hoaver_color: string }>`
    background-color: ${({ tag_color }) => tag_color || '#F0F1F2'};
    border-radius: 8px;
    padding: 4px 8px;
    cursor: pointer;

    // text
    font-size: 18px;
    font-weight: 500;
    color: #000;

    &:hover {
        outline: 3px solid ${({ tag_hoaver_color }) => tag_hoaver_color || '#F0F1F2'};
    }
`;

const BoxUI = styled.div`
    display: flex;
    width: 100%;
    margin: 5px;
    justify-content: space-around;
`;

const PlayButton = styled.div<{$algorithmType: string}>`
    display: flex;
    width: 100%;
    padding: 6px 0px;
    position: absolute;
    bottom: 0px;
    border-radius: 0px 0px 8px 8px;
    background: ${({ $algorithmType }) => `${algorithmTypes[$algorithmType][1]}`};
    justify-content: center;
    cursor: pointer;

    // text
    color: #333;
`;

const TurnImage = styled.img`
    display: flex;
    position: absolute;
    right: 15px;
    top: 15px;
    width: 25px;
    padding: 10px;
    border-radius: 999px;
    background: #D9D9D9;
    cursor: pointer;
`;

const BoxDescription = styled.div`
    display: flex;
    padding: 8px 0;
    width: 90%;
    height: 50%;
    border-radius: 10%;
`;

const Box: React.FC<BoxProps & { onTagClick: (tag: string) => void }> = ({ title, algorithmType, imgSrc, gifSrc, tags, link, description, onTagClick }) => {
    const [rotation, setRotation] = useState(0);
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
            <BoxWapper $rotation={rotation} $algorithmType={algorithmType} 
                onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>

                <FrontBox onClick={onclickedBox}>
                    <BoxUI>
                        <BoxTitle>{title}</BoxTitle>
                        <TurnImage src={`${process.env.PUBLIC_URL}/images/cycle-arrow.svg`} 
                            onClick={(e) => {
                                e.stopPropagation();
                                setRotation(rotation + 180);
                            }}
                        />
                    </BoxUI>

                    <BoxImage src={isHover ? gifSrc : imgSrc} alt='알고리즘 예시'/>

                    <TagParent>
                        {tags.map((tag, index) => (
                            <Tag
                                key={index}
                                tag_color={tagColors[tag]}
                                tag_hoaver_color={tagHoverColors[tag]}
                                onClick={(e) => handleTagClick(tag, e)}>
                                {tag}
                            </Tag>))
                        }
                    </TagParent>
                </FrontBox>

                <BackBox>
                    <BoxUI>
                        <BoxTitle>{title}</BoxTitle>
                        <TurnImage src={`${process.env.PUBLIC_URL}/images/cycle-arrow.svg`} 
                            onClick={(e) => {
                                e.stopPropagation();
                                setRotation(rotation + 180);
                            }}/>
                    </BoxUI>

                    <BoxDescription dangerouslySetInnerHTML={{ __html: description }} />
                
                    <TagParent>
                        {tags.map((tag, index) => (
                            <Tag
                                key={index}
                                tag_color={tagColors[tag]}
                                tag_hoaver_color={tagHoverColors[tag]}
                                onClick={(e) => handleTagClick(tag, e)}>
                                {tag}
                            </Tag>))
                        }
                    </TagParent>

                    <PlayButton onClick={onclickedBox} $algorithmType={algorithmType}>▶ PLAY</PlayButton>
                </BackBox>
            </BoxWapper>
        </Flip>
    );
};

export default Box;