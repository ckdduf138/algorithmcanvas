import { useState, useEffect } from 'react';

const usePagination = (totalItems: number, itemsPerPage: number) => {
    const [currentPage, setCurrentPage] = useState(0); // currentPage state 정의

    const [itemsToShow, setItemsToShow] = useState(itemsPerPage);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const height = 620;
            const boxWidth = 270;
            const boxHeight = 270; 
            const boxMargin = 20;

            let newItemsPerRow = Math.floor(width / (boxWidth + 2 * boxMargin));
            let newRowsPerPage = Math.floor(height / (boxHeight + 2 * boxMargin));
            let newItemsPerPage = newItemsPerRow * newRowsPerPage;

            if (newItemsPerPage < 1) {
                newItemsPerPage = 1;
            }
            
            setItemsToShow(newItemsPerPage);
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        
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
