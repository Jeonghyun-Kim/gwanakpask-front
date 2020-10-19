import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

const Root = styled.div`
  width: 100%;
  height: 100%;
`;

const TestPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>test</title>
      </Head>
      <Root>
        <Link href="/">
          <a>home</a>
        </Link>
      </Root>
    </>
  );
};

export default TestPage;
