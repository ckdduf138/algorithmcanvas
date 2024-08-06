import React from 'react';
import Layout from '../../components/layout/layout';
import SelectionSortCanvas from '../../components/algorithm/selectionSort';

const InsertionSortPage = () => {
    return (
        <Layout subTitle='삽입정렬'>
            <SelectionSortCanvas />
        </Layout>
    );
};

export default InsertionSortPage;
