import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styled from 'styled-components';

import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import Layout from '../components/Layout';
// import Header from '../components/Header';
import Header from '../components/Header/Home';
import Congrat from '../components/Congrat';
import Footer from '../components/Footer';

import { NextSection } from '../components/GlobalStyle';

import { congrats } from '../data';

import AppContext from '../AppContext';

const Root = styled.div`
  width: 100%;
  height: 100%;
  .padding-box {
    position: relative;
    padding-bottom: ${(100 * 1080) / 1920}%;
  }
  .intro-video,
  .congrat-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .video-section {
    width: 100%;
    background-color: black;
  }
  .welcome-section {
    padding: 32px 16px;
    margin: 0 auto;
    h2,
    h4,
    p {
      margin: 0;
    }
    .title {
      font-size: 1.5625rem;
      font-weight: 500;
      margin-bottom: 16px;
    }
    .name {
      font-size: 1rem;
      font-weight: 500;
      margin-bottom: 32px;
    }
    .content {
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.8;
    }
  }
  .congrats-section {
    background-color: #eeeeee;
    padding: 16px 0;
    margin: 0 auto;
    .congrat + .congrat {
      margin-top: 8px;
    }
  }
  &.desktop {
    .video-section {
      .padding-box {
        max-width: 1300px;
        padding-bottom: min(${(100 * 1080) / 1920}%, 731px);
        margin: 0 auto;
      }
    }
    .welcome-section {
      max-width: 1360px;
      padding: 80px 32px 160px 32px;
      .title {
        font-size: 2.5rem;
      }
      .name {
        font-size: 1.25rem;
        margin-bottom: 80px;
      }
      .content {
        font-size: 1.25rem;
      }
    }
    .congrats-section {
      padding: 32px 32px;
      .congrat {
        max-width: 1360px;
        margin: 0 auto;
      }
      .congrat + .congrat {
        margin-top: 16px;
      }
    }
  }
`;

// const ActionButton = (
//   <Link href="/ovr/list">
//     <a>전시장</a>
//   </Link>
// );

const IntroPage: React.FC = () => {
  const { withLayout } = React.useContext(AppContext);

  return (
    <Layout>
      <Head>
        <title>전시 소개</title>
      </Head>
      {/* <Header
        backTo={{ href: '/', name: '홈' }}
        title="전시소개"
        actionComponent={ActionButton}
      /> */}
      <Header />
      <Root className={withLayout ? 'desktop' : ''}>
        <section className="video-section">
          <div className="padding-box">
            <iframe
              className="intro-video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="관악미술협회 15주년 기념전"
              src={`https://www.youtube.com/embed/JW3MkPACfBo?enablejsapi=1&${
                withLayout && 'autoplay=1'
              }`}
            />
          </div>
        </section>
        <section className="welcome-section">
          <h2 className="title">지부장 인사말</h2>
          <h4 className="name">한국 사진작가협회 관악구지부 지부장 박태재</h4>
          <p className="content">
            2020년 강감찬 축제 개최를 축하드립니다. 강감찬 축제의 일환으로
            열리는 올해의 사진전은 아쉽게도 비대면 온라인 전시로 진행되게
            되었습니다. 서로 더욱 노력하여 바이러스가 빠르게 종식되기를
            기원합니다.
            <br />
            <br />
            이번 2020년 관악구 온라인 사진전은 회원들이 전국을 돌아다니며 숨겨진
            비경과 아름다운 자연환경을 촬영하여 여러분께 선보이고자
            마련하였습니다. 코로나 19로 인하여 관악구민 모두가 어려움을 겪고
            몸과 마음이 지쳐있는 이 시기에 회원들의 소중한 작품과 관악의 옛
            사진으로 위로가 되고 희망과 용기를 잃지 않았으면 합니다. 감사합니다.
          </p>
        </section>
        <section className="congrats-section">
          {congrats.map((congrat, idx) => (
            <Congrat
              key={congrat.id}
              id={congrat.id}
              name={congrat.name}
              content={congrat.content}
              defaultOpen={congrat.defaultOepn}>
              {!idx && (
                <div className="padding-box">
                  <iframe
                    className="congrat-video"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title="관악미술협회 15주년 기념전"
                    src="https://www.youtube.com/embed/JRYlF3h5Umw?enablejsapi=1"
                  />
                </div>
              )}
            </Congrat>
          ))}
        </section>
        <NextSection className={withLayout ? 'desktop' : ''}>
          <h2>준비되셨나요?</h2>
          <h4>전시장에서 작품들을 만나보세요!</h4>
          <Link href="/ovr/list">
            <a>
              <span>전시장 바로가기</span>
              <ArrowForwardIos />
            </a>
          </Link>
        </NextSection>
        <Footer />
      </Root>
    </Layout>
  );
};

export default IntroPage;
