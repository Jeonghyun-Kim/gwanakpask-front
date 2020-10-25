import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import Layout from '../components/Layout';
import Header from '../components/Header';
import CrossFadeSlider from '../components/Slider/CrossFade';

const Root = styled.div`
  width: 100%;
  height: 100%;
`;

const repImages = Array.from({ length: 7 }, (_, i) => i + 1).map(
  (i) => `/images/covid/${i}.jpg`,
);

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
        <CrossFadeSlider images={repImages} timeout={3000} height="160px" />
      </Root>
    </Layout>
  );
};

export default CovidPage;
