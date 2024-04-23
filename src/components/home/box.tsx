import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BoxProps } from '../../utils/box';

const MainBox = styled.div`
    background: #fff;
    border-radius: 10%;
    display: inline-block;
    height: 30%;
    width: 30%;
    margin: 30px;
    position: relative;
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);
    text-align: center;
    cursor: pointer;

    max-width: 280px;
    max-height: 280px;
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

const Tag = styled.span`
    font-size: 18px;
    background-color: #F0F1F2;
    color: #666;
    border-radius: 30%;
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
                    <Tag key={index}>{tag}</Tag>
                ))}
            </TagParent>
        </MainBox>
    );
};

export default Box;
