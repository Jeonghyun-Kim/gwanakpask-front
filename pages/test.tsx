import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import Layout from '../components/Layout';
import Header from '../components/Header';

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`;

const TestPage: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>test</title>
      </Head>
      <Header
        backTo={{ href: '/', name: 'Home' }}
        title="Test Page"
        actionComponent="Hello"
      />
      <Root>test</Root>
    </Layout>
  );
};

export default TestPage;
