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

import { NAVBAR_WIDTH } from '../../defines';

const GAP = {
  mobile: 7,
  desktop: 13,
};

const PADDING = {
  mobile: 10,
  desktop: 32,
};

const Root = styled.div`
  width: 100%;
  height: 100%;
  .photo-list {
    max-width: 1100px;
    margin: 0 auto;
  }
  .number-of-photos {
    margin: 5px 10px;
    text-align: right;
    font-size: 0.875rem;
    font-weight: 500;
    color: #757575;
  }
  .photo-list-container {
    padding: ${PADDING.mobile}px;
    padding-top: 0;
    display: grid;
    grid-gap: ${GAP.mobile}px;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }
  &.desktop {
    .photo-list-container {
      padding: ${PADDING.desktop}px;
      padding-top: 0;
      grid-gap: ${GAP.desktop}px;
      grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    }
  }
`;

const ActionButton = (
  <Link href="/visitor">
    <a>방명록</a>
  </Link>
);

const PhotoListPage: React.FC = () => {
  const { index, withLayout } = React.useContext(AppContext);
  const {
    size: { innerWidth },
  } = useLayout();

  const getScrollHeight = React.useCallback(() => {
    const containerWidth = !withLayout
      ? innerWidth
      : Math.min(innerWidth - NAVBAR_WIDTH, 1100);
    const columns = Math.floor(
      (containerWidth - 2 * PADDING.desktop) / (230 + GAP.desktop),
    );
    const photoWidth = !withLayout
      ? (containerWidth - 2 * PADDING.mobile - GAP.mobile) / 2
      : (containerWidth - 2 * PADDING.desktop - (columns - 1) * GAP.desktop) /
        columns;
    return Math.floor((index - 1) / columns) * (photoWidth + 64);
  }, [innerWidth, withLayout, index]);

  React.useEffect(() => {
    const backgroundImg = new Image();
    backgroundImg.src = '/images/background/land.png';
  }, []);

  React.useEffect(() => {
    window.scroll({
      behavior: !withLayout ? 'auto' : 'smooth',
      left: 0,
      top: getScrollHeight(),
    });
  }, [getScrollHeight, withLayout]);

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
          <div
            className={`photo-list-container ${
              !withLayout ? 'mobile' : 'desktop'
            }`}>
            {photosWithArtist.map((photo) => (
              <PhotoListItem key={photo.photoId} photo={photo} />
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
