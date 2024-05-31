import { useState, useEffect } from 'react';

const usePagination = (totalItems: number, itemsPerPage: number) => {
    const [currentPage, setCurrentPage] = useState(0); // currentPage state 정의

    const [itemsToShow, setItemsToShow] = useState(itemsPerPage);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const boxWidth = 300;
            const boxHeight = 280; 
            const boxMargin = 20;

            // 페이지당 표시할 아이템의 수 계산
            let newItemsPerRow = Math.floor((width - boxMargin) / (boxWidth + boxMargin));
            let newRowsPerPage = Math.floor((height - boxMargin) / (boxHeight + boxMargin));
            let newItemsPerPage = newItemsPerRow * newRowsPerPage;

            if (newItemsPerPage < 1) {
                newItemsPerPage = 1;
            }
            
            setItemsToShow(newItemsPerPage);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call initially to set the correct value

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [itemsPerPage]);

    const totalPages = Math.ceil(totalItems / itemsToShow);

    const nextPage = () => {
        setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
    };

    const currentItems = (items: any[]) => {
        const start = currentPage * itemsToShow;
        return items.slice(start, start + itemsToShow);
    };

    return { currentPage, totalPages, nextPage, prevPage, currentItems, setCurrentPage };
};

export default usePagination;
