import React from 'react';
import Layout from '../components/layout/layout';
import SelectionSortCanvas from '../components/algorithm/selectionSort';

const Page_Selection_Sort = () => {
    return (
        <Layout subTitle='선택정렬'>
            <SelectionSortCanvas />
        </Layout>
    );
};

export default Page_Selection_Sort;
