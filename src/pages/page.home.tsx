import React, { useState } from 'react';
import styled from 'styled-components';
import Box from '../components/home/box';
import Layout from '../components/layout/layout';
import Search from '../components/home/search';
import { boxes } from '../utils/box';

const HomeSearch = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

const HomeContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
    width: 100%;
`;

const HomeBoxes = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
`;

const HomePage = () => {
    const [filteredBoxes, setFilteredBoxes] = useState(boxes);
    
    const home_onSearch = (query: string) => {
        if (query.trim() === '') {
            setFilteredBoxes(boxes);
        } else {
            const filtered = boxes.filter(box =>
                box.tags.some(tag => 
                    {
                        const reg = new RegExp(query.split("").join(".*?"), "i");
                        const exp = new RegExp(tag.split("").join(".*?"), "i");
                        return reg.test(tag) || exp.test(query);
                    }
                )
            );
            setFilteredBoxes(filtered);
        }
    };

    return (
        <Layout subTitle=''>
            <HomeSearch>
                <Search onSearch={home_onSearch} />
            </HomeSearch>
            <HomeContent>
                <HomeBoxes>
                    {filteredBoxes.map((box, index) => (
                        <Box
                            key={index}
                            title={box.title}
                            imgSrc={box.imgSrc}
                            gifSrc={box.gifSrc}
                            tags={box.tags}
                            link={box.link}
                            description={box.description}
                        />
                    ))}
                </HomeBoxes>
            </HomeContent>
        </Layout>
    );
};

export default HomePage;
