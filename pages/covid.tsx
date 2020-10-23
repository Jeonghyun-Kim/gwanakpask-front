import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import Layout from '../components/Layout';
import Header from '../components/Header';

const Root = styled.div`
  width: 100%;
  height: 100%;
`;

const ActionButton = <div />;

const CovidPage: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>title</title>
      </Head>
      <Header
        backTo={{ href: '/', name: '홈' }}
        title="방역활동 사진첩"
        actionComponent={ActionButton}
      />
      <Root>
        <></>
      </Root>
    </Layout>
  );
};

export default CovidPage;
