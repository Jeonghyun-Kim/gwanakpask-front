import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

import Layout from '../components/Layout';

const Root = styled.div`
  width: 100%;
  height: 100%;
`;

const TestPage: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>test</title>
      </Head>
      <Root>
        <Link href="/">
          <a>home</a>
        </Link>
        <div>{window.innerWidth}</div>
      </Root>
    </Layout>
  );
};

export default TestPage;
