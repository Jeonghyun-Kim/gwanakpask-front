import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styled from 'styled-components';

import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import Layout from '../components/Layout';
import Header from '../components/Header';

import { NextSection } from '../components/GlobalStyle';

const Root = styled.div`
  width: 100%;
  height: 100%;
`;

const ActionButton = (
  <Link href="/ovr/list">
    <a>전시장</a>
  </Link>
);

const IntroPage: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>title</title>
      </Head>
      <Header
        backTo={{ href: '/', name: '홈' }}
        title="전시소개"
        actionComponent={ActionButton}
      />
      <Root>
        <NextSection>
          <h2>준비되셨나요?</h2>
          <h4>전시장에서 작품들을 만나보세요!</h4>
          <Link href="/visitor">
            <a>
              <span>전시장 바로가기</span>
              <ArrowForwardIos />
            </a>
          </Link>
        </NextSection>
      </Root>
    </Layout>
  );
};

export default IntroPage;
