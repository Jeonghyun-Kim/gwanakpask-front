import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import Header from '../../components/Header';

const Root = styled.div`
  width: 100%;
  height: 100%;
`;

const ActionButton = (
  <Link href="/visitor">
    <a>방명록</a>
  </Link>
);

const PhotoListPage: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>title</title>
      </Head>
      <Header
        backTo={{ href: '/intro', name: '전시소개' }}
        title="전시장"
        actionComponent={ActionButton}
      />
      <Root>
        <></>
      </Root>
    </Layout>
  );
};

export default PhotoListPage;
