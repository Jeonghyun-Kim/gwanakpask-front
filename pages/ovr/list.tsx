import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styled from 'styled-components';

import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import PhotoListItem from '../../components/PhotoListItem';

import { NextSection } from '../../components/GlobalStyle';

import useLayout from '../../lib/useLayout';

import { photosWithArtist } from '../../data';

import AppContext from '../../AppContext';

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
  .photo-list-container {
    padding: 0 10px 10px 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

const ActionButton = (
  <Link href="/visitor">
    <a>방명록</a>
  </Link>
);

const PhotoListPage: React.FC = () => {
  const { withLayout } = React.useContext(AppContext);
  const {
    size: { innerWidth },
  } = useLayout();
  const photoSize = (innerWidth - 10 * 2 - 7) / 2;

  React.useEffect(() => {
    const backgroundImg = new Image();
    backgroundImg.src = '/images/background/land.png';
  }, []);

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
      <Root className={`${withLayout ? 'desktop' : ''}`}>
        <section className="photo-list">
          <div className="number-of-photos">총 {photosWithArtist.length}점</div>
          <div className="photo-list-container">
            {photosWithArtist.map((photo) => (
              <PhotoListItem
                key={photo.photoId}
                photo={photo}
                size={photoSize}
              />
            ))}
          </div>
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
