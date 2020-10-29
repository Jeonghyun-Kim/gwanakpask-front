import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styled from 'styled-components';

import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import Layout from '../../components/Layout';
// import Header from '../../components/Header';
import Header from '../../components/Header/Home';
import PhotoListItem from '../../components/PhotoListItem';
import Footer from '../../components/Footer';

import { NextSection } from '../../components/GlobalStyle';

import useLayout from '../../lib/hooks/useLayout';

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

const INFO_HEIGHT = {
  mobile: 48,
  desktop: 72,
};

const Root = styled.div`
  width: 100%;
  height: 100%;
  .photo-list {
    max-width: 1100px;
    margin: 0 auto;
  }
  .number-of-photos {
    margin: 5px 0;
    padding: 0 ${PADDING.mobile}px;
    text-align: right;
    font-size: 0.875rem;
    font-weight: 500;
    color: #757575;
  }
  .photo-list-container {
    padding: 0 ${PADDING.mobile}px;
    padding-bottom: 16px;
    display: grid;
    grid-gap: ${GAP.mobile}px;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }
  &.desktop {
    .section-title {
      max-width: 1100px;
      margin: 0 auto;
      padding: 80px ${PADDING.desktop}px 48px ${PADDING.desktop}px;
      text-align: center;
      .title {
        font-size: 2.5rem;
        font-weight: 500;
        margin: 0;
      }
      .sub-title {
        font-size: 1.5rem;
        font-weight: 400;
        margin: 0;
        margin-top: 10px;
      }
    }
    .number-of-photos {
      padding: 0 ${PADDING.desktop}px;
    }
    .photo-list-container {
      padding: 0 ${PADDING.desktop}px;
      padding-bottom: 80px;
      grid-gap: ${GAP.desktop}px;
      grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    }
  }
`;

// const ActionButton = (
//   <Link href="/visitor">
//     <a>방명록</a>
//   </Link>
// );

const PhotoListPage: React.FC = () => {
  const { index, withLayout } = React.useContext(AppContext);
  const {
    size: { innerWidth },
  } = useLayout();

  const containerWidth = React.useMemo(
    () =>
      !withLayout ? innerWidth : Math.min(innerWidth - NAVBAR_WIDTH, 1100),
    [innerWidth, withLayout],
  );
  const padding = React.useMemo(
    () => (!withLayout ? PADDING.mobile : PADDING.desktop),
    [withLayout],
  );
  const gap = React.useMemo(() => (!withLayout ? GAP.mobile : GAP.desktop), [
    withLayout,
  ]);
  const columns = React.useMemo(
    () =>
      Math.floor(
        (containerWidth - 2 * padding) / ((!withLayout ? 140 : 230) + gap),
      ),
    [withLayout, containerWidth, padding, gap],
  );
  const photoSize = React.useMemo(
    () => (containerWidth - 2 * padding - (columns - 1) * gap) / columns,
    [containerWidth, columns, padding, gap],
  );

  const getScrollHeight = React.useCallback(() => {
    return (
      Math.floor((index - 1) / columns) *
      (photoSize + (!withLayout ? INFO_HEIGHT.mobile : INFO_HEIGHT.desktop))
    );
  }, [index, columns, photoSize, withLayout]);

  React.useEffect(() => {
    const backgroundImg = new Image();
    backgroundImg.src = '/images/background/original.jpg';
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
        <title>전시장 - 작품 목록</title>
      </Head>
      {/* <Header
        backTo={{ href: '/intro', name: '전시소개' }}
        title="전시장"
        actionComponent={ActionButton}
      /> */}
      <Header />
      <Root className={withLayout ? 'desktop' : ''}>
        {withLayout && (
          <section className="section-title">
            <h2 className="title">전시장</h2>
            <h4 className="sub-title">
              관악구 사진작가님들의 사진을 만나보세요
            </h4>
          </section>
        )}
        <section className="photo-list">
          <div className="number-of-photos">총 {photosWithArtist.length}점</div>
          <div
            className={`photo-list-container ${
              !withLayout ? 'mobile' : 'desktop'
            }`}>
            {photosWithArtist.map((photo) => (
              <PhotoListItem
                key={photo.photoId}
                photo={photo}
                size={photoSize}
                infoHeight={
                  !withLayout ? INFO_HEIGHT.mobile : INFO_HEIGHT.desktop
                }
              />
            ))}
          </div>
        </section>
        <NextSection className={withLayout ? 'desktop' : ''}>
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
        <Footer />
      </Root>
    </Layout>
  );
};

export default PhotoListPage;
