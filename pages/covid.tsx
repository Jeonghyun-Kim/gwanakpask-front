import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import Layout from '../components/Layout';
import Header from '../components/Header';
import CrossFadeSlider from '../components/Slider/CrossFade';

import { covidPhotos } from '../data';

import AppContext from '../AppContext';

const Root = styled.div`
  width: 100%;
  height: 100%;
  .title {
    font-size: 1.25rem;
    font-weight: 500;
    color: white;
    z-index: 2;
  }
  .sec-0 {
    padding: 16px 32px;
    .content {
      margin: 16px 0;
      font-size: 1rem;
      font-weight: 400;
      text-align: center;
    }
  }
  .sec {
    margin-bottom: 48px;
    padding: 0 16px;
    .section-title {
      font-size: 1.25rem;
      font-weight: 500;
      margin: 0;
    }
    .covid-photo {
      width: 100%;
      margin: 8px 0;
    }
  }
  &.desktop {
    max-width: 680px;
    margin: 32px auto;
    .title {
      font-size: 2.5rem;
      text-shadow: 0 3px 6px rgba(0, 0, 0, 0.4);
    }
    .sec-0 {
      padding: 32px;
      .content {
        margin: 0;
        margin-bottom: 80px;
      }
    }
    .sec {
      margin-bottom: 80px;
      padding: 0 16px;
      .section-title {
        font-size: 1.5625rem;
        font-weight: 400;
      }
      .covid-photo {
        width: 100%;
        margin: 16px 0;
      }
    }
  }
`;

const repImages = Array.from({ length: 7 }, (_, i) => i + 1).map(
  (i) => `/images/covid/rep/${i}.jpg`,
);

const ActionButton = <div />;

const CovidPage: React.FC = () => {
  const { withLayout } = React.useContext(AppContext);

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
      <Root className={withLayout ? 'desktop' : ''}>
        <CrossFadeSlider
          images={repImages}
          timeout={3000}
          height={!withLayout ? '160px' : '219px'}>
          <h2 className="title">방역활동 사진첩</h2>
        </CrossFadeSlider>
        <section className="sec-0">
          <p className="content">
            모두가 어려운 시기,
            <br />
            관악구와 주민들이 함께 나섰습니다.
          </p>
          <p className="content">
            관악구청과 주민자치회의
            <br />
            코로나 방역활동을 사진으로 만나보세요.
          </p>
        </section>
        {covidPhotos.map((sec) => (
          <section key={`sec-${sec.id}`} className="sec">
            <h4 className="section-title">{sec.name}</h4>
            {Array.from(
              { length: sec['number-of-photos'] },
              (_, i) => i + 1,
            ).map((idx) => (
              <img
                key={`${sec.name}-${idx}`}
                className="covid-photo"
                alt=""
                src={`/images/covid/sec-${sec.id}/${idx}.jpg`}
              />
            ))}
          </section>
        ))}
      </Root>
    </Layout>
  );
};

export default CovidPage;
