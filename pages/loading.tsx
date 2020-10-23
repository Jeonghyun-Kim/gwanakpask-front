import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import Loading from '../components/Loading';

const Root = styled.div`
  width: 100%;
  height: 100%;
`;

const LoadingPage: React.FC = () => (
  <>
    <Head>
      <title>Loading Page</title>
    </Head>
    <Root>
      <Loading />
    </Root>
  </>
);

export default LoadingPage;
