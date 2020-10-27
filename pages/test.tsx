import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import Layout from '../components/Layout';
import Header from '../components/Header';
import Congrat from '../components/Congrat';

import { congrats } from '../data';

const Root = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1000px;
  margin: 0 auto;
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
      <Root>
        {congrats.map((congrat) => (
          <Congrat
            key={congrat.id}
            id={congrat.id}
            name={congrat.name}
            content={congrat.content}
          />
        ))}
      </Root>
    </Layout>
  );
};

export default TestPage;
