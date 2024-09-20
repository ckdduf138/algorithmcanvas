import React from 'react';
import Layout from '../../components/layout/layout';
import InputBox from '../../components/common/InputBox';

const QueuePage: React.FC = () => {

  return(
  <Layout subTitle='큐(QUEUE)'>
        {/* 큐 코드 */}
        <InputBox
          placeholder='추가할 데이터를 입력하세요.'
          isValidBtnAdd={true}
        />
    </Layout>
  )
};

export default QueuePage;
