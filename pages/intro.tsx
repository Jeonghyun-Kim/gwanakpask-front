import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styled from 'styled-components';

import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Congrat from '../components/Congrat';

import { NextSection } from '../components/GlobalStyle';

import { congrats } from '../data';

import AppContext from '../AppContext';

const Root = styled.div`
  width: 100%;
  height: 100%;
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
      margin-top: 16px;
    }
  }
  &.desktop {
    .welcome-section {
      max-width: 1360px;
      padding: 80px 32px 160px 32px;
      .title {
        font-size: 2.5rem;
      }
      .name {
        font-size: 1.5625rem;
        margin-bottom: 80px;
      }
      .content {
        font-size: 1.5625rem;
      }
    }
    .congrats-section {
      padding: 32px 32px;
      .congrat {
        max-width: 1360px;
        margin: 0 auto;
      }
    }
    .congrat + .congrat {
      margin-top: 8px;
    }
  }
`;

const ActionButton = (
  <Link href="/ovr/list">
    <a>전시장</a>
  </Link>
);

const IntroPage: React.FC = () => {
  const { withLayout } = React.useContext(AppContext);

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
      <Root className={withLayout ? 'desktop' : ''}>
        <section className="welcome-section">
          <h2 className="title">지부장 인사말</h2>
          <h4 className="name">한국 사진작가협회 관악구지부 지부장 박태재</h4>
          <p className="content">
            2020년 강감찬 축제 개최를 축하드리며 올해에는 코로나 19로 인해
            비대면 온라인전시회를 하게 되었다는 점에 아쉽지만, 코로나 19의
            종식을 위해 서로 불편하지만 조금 더 노력하여 바이러스가 종식되기를
            기원하는 바입니다.
            <br />
            <br />
            이번 2020년 관악구 온라인 사진전은 회원들이 전국을 돌아다니며 숨겨진
            비경과 아름다운 자연환경을 촬영하여 여러분께 선보이고자
            마련하였습니다. 코로나 19로 인하여 관악구인 모두가 어려움을 겪고
            몸과 마음이 지쳐있는 이 시기에 회원들의 소중한 작품과 관악의 옛
            사진으로 위로가 되고 희망과 용기를 잃지 않았으면 합니다. 감사합니다.
          </p>
        </section>
        <section className="congrats-section">
          {congrats.map((congrat) => (
            <Congrat
              key={congrat.id}
              id={congrat.id}
              name={congrat.name}
              content={congrat.content}
            />
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
      </Root>
    </Layout>
  );
};

export default IntroPage;
