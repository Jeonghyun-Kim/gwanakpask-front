import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import Layout from '../components/Layout';
import Slider from '../components/Slider';
import Loading from '../components/Loading';

// import useLayout from '../lib/useLayout';

import AppContext from '../AppContext';

import { NAVBAR_WIDTH } from '../defines';

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;

  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const photos = [
  '/images/1.jpeg',
  '/images/2.jpeg',
  '/images/3.jpeg',
  '/images/4.jpeg',
];

const TestPage: React.FC = () => {
  const { index, withLayout } = React.useContext(AppContext);
  // const { withLayout, size } = useLayout();

  return (
    <Layout noHeader>
      <Head>
        <title>test</title>
      </Head>
      <Root>
        {index ? (
          <Slider
            photos={photos}
            pageIndex={index - 1}
            innerWidth={
              withLayout ? window.innerWidth - NAVBAR_WIDTH : window.innerWidth
            }
          />
        ) : (
          <Loading />
        )}
      </Root>
    </Layout>
  );
};

export default TestPage;
