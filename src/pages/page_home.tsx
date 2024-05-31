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
    const { currentPage, totalPages, nextPage, prevPage, currentItems, setCurrentPage } = usePagination(boxes.length, itemsPerPage); // setCurrentPage 추가

    const home_onSearch = (query: string) => {
        console.log('검색어:', query);
    };

    const goToPage = (page: number) => { // goToPage 함수 정의
        setCurrentPage(page);
    };

    return (
        <Layout>
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
                    nextPage={nextPage}
                    prevPage={prevPage}
                    goToPage={goToPage} // goToPage 함수를 Pagination 컴포넌트에 전달
                />
            </HomePagination>
        </Layout>
    );
};

export default Home;
