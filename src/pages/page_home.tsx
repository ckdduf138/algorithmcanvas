import React from 'react';
import styled from 'styled-components';
import Box from '../components/home/box';
import Layout from '../components/layout/layout';
import Search from '../components/home/search';
import { boxes } from '../utils/box';
import usePagination from '../hooks/usePagination';
import Pagination from '../components/home/pagination ';

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

const HomePagination = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 1%;
`;

const Home = () => {
    const itemsPerPage = 8; // Default items per page
    const { currentPage, totalPages, currentItems, setCurrentPage } = usePagination(boxes.length, itemsPerPage); // setCurrentPage 추가

    const home_onSearch = (query: string) => {
        console.log('검색어:', query);
    };

    const goToPage = (page: number) => { // goToPage 함수 정의
        setCurrentPage(page);
    };

    return (
        <Layout subTitle=''>
            <HomeSearch>
                <Search onSearch={home_onSearch} />
            </HomeSearch>
            <HomeContent>
                <HomeBoxes>
                    {currentItems(boxes).map((box, index) => (
                        <Box
                            key={index}
                            title={box.title}
                            imgSrc={box.imgSrc}
                            tags={box.tags}
                            link={box.link}
                        />
                    ))}
                </HomeBoxes>
            </HomeContent>
            <HomePagination>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    goToPage={goToPage}
                />
            </HomePagination>
        </Layout>
    );
};

export default Home;
