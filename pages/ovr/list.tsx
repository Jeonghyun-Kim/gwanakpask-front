import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styled from 'styled-components';

import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import Layout from '../../components/Layout';
import Header from '../../components/Header';

import { NextSection } from '../../components/GlobalStyle';

import { photosWithArtist } from '../../data';

const Root = styled.div`
  width: 100%;
  height: 100%;
  .number-of-photos {
    margin: 5px 10px;
    text-align: right;
    font-size: 0.875rem;
    font-weight: 500;
    color: #757575;
  }
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
        <section className="photo-list">
          <div className="number-of-photos">총 {photosWithArtist.length}점</div>
        </section>
        <NextSection>
          <h2>잘 감상하셨나요?</h2>
          <h4>
            고생하셨을 작가님을 위해
            <br />
            방명록을 남겨주세요!
          </h4>
          <Link href="/visitor">
            <a>
              <span>방명록 바로가기</span>
              <ArrowForwardIos />
            </a>
          </Link>
        </NextSection>
      </Root>
    </Layout>
  );
};

export default PhotoListPage;
