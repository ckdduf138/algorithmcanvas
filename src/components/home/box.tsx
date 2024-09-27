import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BoxProps, tagColors } from '../../utils/box';

// box
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

const BoxWapper = styled.div<{$isTurn: boolean}>`
    display: inline-block;
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    position: relative;
    background: #fff;
    border-radius: 8px;
    cursor: pointer;
    transform-style: preserve-3d;
    transition: transform 1s;
    transform: ${({$isTurn}) => $isTurn ? '' : 'rotateY(180deg)'};

    // 그라데이션 테두리
    &: before {
        content: '';
        position: absolute;
        top: -4px;
        bottom: -4px;
        left: -4px;
        right: -4px;
        border-radius: 12px;
        z-index: -1;
        padding: 0;
        background: linear-gradient(#0019FF, #00C2FF);
        transform: ${({$isTurn}) => $isTurn ? '' : 'rotateY(180deg)'};
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.15), 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    &:hover {
        transform: ${({$isTurn}) => $isTurn ? 'scale(1.03)' : 'rotateY(180deg) scale(1.03)'};
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
    justify-content: space-around;
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
    justify-content: space-around;
    transform: rotateY(180deg);
`;

const BoxTitle = styled.div`
    display: flex;
    width: 100%;
    font-size: 26px;
    padding: 8px 0;
    justify-content: center;
`;

const BoxSubTitle = styled.div`
    display: flex;
    width: 90%;

    //text
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    color: #1E1E1E;
`;

const BoxImage = styled.img`
    width: 80%;
    height: 50%;
`;

const TagParent = styled.div`
    display: flex;
    width: 90%;
    height: 35px;
    margin: 2%;
    overflow: hidden;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
`;

const Tag = styled.span<{ color: string }>`
    font-size: 18px;
    background-color: ${({ color }) => color || '#F0F1F2'};
    color: #0062CD;
    border-radius: 8px;
    padding: 4px 8px;
`;

const BoxUI = styled.div`
    display: flex;
    width: 100%;
    margin: 5px;
    justify-content: space-around;
`;

const PlayButton = styled.div`
    display: flex;
    padding: 16px 60px;
    border-radius: 40px;
    background: #007AFF;;

    // text
    color: #fff;
`;

const TurnImage = styled.img`
    display: flex;
    width: 30px;
    padding: 10px;
    border-radius: 999px;
    background: #D9D9D9;
`;

const BoxDescription = styled.div`
    display: flex;
    padding: 8px 0;
    width: 90%;
    height: 50%;
    border-radius: 10%;
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
            <BoxWapper $isTurn={isFront} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>

                <FrontBox>
                    <BoxTitle>{title}</BoxTitle>

                    <BoxImage src={isHover ? gifSrc : imgSrc} />

                    <TagParent>
                        {tags.map((tag, index) => (
                            <Tag
                                key={index}
                                color={tagColors[tag]}
                                onClick={(e) => handleTagClick(tag, e)}>
                                {tag}
                            </Tag>))
                        }
                    </TagParent>

                    <BoxUI>
                        <PlayButton onClick={onclickedBox}>▶ PLAY</PlayButton>
                        <TurnImage src={`${process.env.PUBLIC_URL}/images/cycle-arrow.svg`} 
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsFront(false);
                            }}
                        />
                    </BoxUI>
                </FrontBox>

                <BackBox>
                    <BoxDescription dangerouslySetInnerHTML={{ __html: description }} />
                    
                    <BoxSubTitle>{title}</BoxSubTitle>

                    <TagParent>
                        {tags.map((tag, index) => (
                            <Tag
                                key={index}
                                color={tagColors[tag]}
                                onClick={(e) => handleTagClick(tag, e)}>
                                {tag}
                            </Tag>))
                        }
                    </TagParent>

                    <BoxUI>
                        <PlayButton onClick={onclickedBox}>▶ PLAY</PlayButton>
                        <TurnImage src={`${process.env.PUBLIC_URL}/images/cycle-arrow.svg`} 
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsFront(true);
                            }}/>
                    </BoxUI>
                </BackBox>
            </BoxWapper>
        </Flip>
    );
};

export default Box;