import React from 'react';
// import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import useSWR from 'swr';
import Countup from 'react-countup';
import { CSSTransition } from 'react-transition-group';
import { useSpring } from '@react-spring/core';
import { a } from '@react-spring/web';
import VisibilitySensor from 'react-visibility-sensor';

import Button from '@material-ui/core/Button';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import Visibility from '@material-ui/icons/Visibility';
import Create from '@material-ui/icons/Create';
import Layout from '../components/Layout';
import Header from '../components/Header/Home';
import KeenSlider from '../components/Slider/Keen';

import { NextSection } from '../components/GlobalStyle';

import useWindowScroll from '../lib/hooks/useWindowScroll';

import AppContext from '../AppContext';

const Root = styled.div`
  width: 100%;
  height: 100%;
  .poster {
    position: relative;
    width: 100%;
    height: 100%;
    .title {
      position: absolute;
    }
    .counter {
      position: absolute;
      bottom: 80px;
      left: 50%;
      width: fit-content;
      transform: translateX(-50%);
      font-size: 1rem;
      font-weight: 400;
    }
    .enter-button {
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 60px);
      height: 45px;
      z-index: 99;
      background-color: #3f51b5;
      .MuiButton-label {
        font-size: 1rem;
        font-weight: 500;
        color: white;
      }
      &.sticky {
        height: calc(50px + env(safe-area-inset-bottom) / 2);
        width: 100%;
        bottom: 0;
        padding-bottom: calc(8px + env(safe-area-inset-bottom) / 4);
        border-radius: 0;
      }
      &.enter-button-enter {
        height: 45px;
        width: calc(100% - 60px);
        bottom: 30px;
        border-radius: 10px;
        transition: 1000ms;
      }
      &.enter-button-enter-active {
        height: calc(50px + env(safe-area-inset-bottom) / 2);
        width: 100%;
        bottom: 0;
        padding-bottom: calc(8px + env(safe-area-inset-bottom) / 4);
        border-radius: 0;
      }
      &.enter-button-exit {
        height: calc(50px + env(safe-area-inset-bottom) / 2);
        width: 100%;
        bottom: 0;
        padding-bottom: calc(8px + env(safe-area-inset-bottom) / 4);
        border-radius: 0;
        transition: 1000ms;
      }
      &.enter-button-exit-active {
        height: 45px;
        width: calc(100% - 60px);
        bottom: 30px;
        border-radius: 10px;
      }
    }
  }
  .section-1 {
    position: relative;
    height: 700px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    #fireworks {
      position: absolute;
      width: auto;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%);
    }
    .title-block {
      position: relative;
      p {
        font-size: 1.5625rem;
        font-weight: 500;
      }
      h4 {
        font-size: 1rem;
        font-weight: 400;
      }
    }
    a {
      padding: 0 32px;
      display: flex;
      align-items: center;
      color: #007aff;
      svg {
        font-size: 1rem;
      }
      span {
        margin: 0 5px;
        font-size: 0.875rem;
        font-weight: 700;
      }
    }
  }
  .visitor-link {
    margin-top: 20px;
    text-decoration: underline;
    color: #757575;
  }
  .section-2 {
    background-color: #f9f9f9;
    padding: 16px 0 136px 0;
    p {
      text-align: center;
      font-size: 0.75rem;
      font-weight: 400;
      color: #757575;
    }
  }
  .section-3 {
    background-color: #292929;
    padding: 32px 0 136px 0;
  }
  &.desktop {
    .poster {
      max-width: 1300px;
      margin: 0 auto;
      .counter {
        bottom: 110px;
        color: #757575;
        display: flex;
        align-items: flex-end;
        font-size: 1.5625rem;
        .icons {
          margin: 0 10px;
          font-size: 2rem;
        }
        .counter-number {
          margin-left: 20px;
          margin-bottom: -5px;
          font-size: 2.4rem;
          font-weight: 500;
        }
      }
      .enter-button {
        position: absolute;
        width: 80%;
        height: 60px;
        border-radius: 10px;
        .MuiButton-label {
          font-size: 1.5rem;
          font-weight: 500;
        }
      }
    }
    .section-1 {
      .title-block {
        p {
          font-size: 2.5rem;
          font-weight: 700;
        }
        h4 {
          font-size: 1.5625rem;
        }
      }
      svg,
      span {
        font-size: 1.5625rem;
      }
      span {
        margin: 0 10px;
        font-weight: 700;
      }
    }
  }
`;

const repPhotos = [2, 3, 5, 7, 19, 50];
const repCovid = [1, 2, 3, 4, 5, 6, 7];

const IndexPage: React.FC = () => {
  const router = useRouter();
  const { withLayout } = React.useContext(AppContext);
  const { data: counter } = useSWR('/api/counter');
  const { y: scrollY } = useWindowScroll();
  const [counters, setCounters] = React.useState<[number, number]>([0, 0]);
  const [{ height, opacity }, setSpring] = useSpring(
    {
      height: 0,
      opacity: 0,
    },
    [],
  );

  React.useEffect(() => {
    if (counter && counter.counts) {
      setCounters([counter.counts.visitor, counter.counts.message]);
    }
  }, [counter]);

  const handleVisibilityChange = React.useCallback(
    (visible: boolean) => {
      setSpring({
        height: visible ? 500 : 0,
        opacity: visible ? 0.5 : 0,
      });
    },
    [setSpring],
  );

  return (
    <Layout>
      <Head>
        <title>title</title>
      </Head>
      <Header />
      <Root className={withLayout ? 'desktop' : ''}>
        <section className="poster">
          <h1 className="title">관악 사진협회 단체전</h1>
          <span className="counter">
            {withLayout && <Visibility className="icons" />}
            방문자{' '}
            <span className="counter-number">
              <Countup start={0} end={counters[0]} duration={2} />
            </span>
            명
            {!withLayout ? (
              ' ・ '
            ) : (
              <>
                <span className="spacer" />
                <Create className="icons" />
              </>
            )}
            방명록{' '}
            <span className="counter-number">
              <Countup start={0} end={counters[1]} duration={2} />
            </span>
            개
          </span>
          <CSSTransition
            in={!withLayout && scrollY > 5}
            timeout={1000}
            classNames="enter-button">
            <Link href="/intro">
              <Button
                className={`enter-button ${scrollY > 5 && 'sticky'}`}
                variant="contained"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') router.push('/intro');
                }}>
                전시 입장
              </Button>
            </Link>
          </CSSTransition>
        </section>
        <section className="section-1">
          <a.img
            id="fireworks"
            alt=""
            src="/images/fireworks.png"
            style={{ height, opacity: opacity as never }}
          />
          <VisibilitySensor onChange={handleVisibilityChange}>
            <div className="title-block">
              <p>환영합니다.</p>
              <h4>한국사진협회 관악지부의 온라인 사진전입니다.</h4>
            </div>
          </VisibilitySensor>
          <Link href="/intro">
            <a>
              <span>전시소개 바로가기</span>
              <ArrowForwardIos />
            </a>
          </Link>
        </section>
        <NextSection white className={withLayout ? 'desktop' : ''}>
          <h2>전시장</h2>
          <h4>
            전시장에서는 31분 작가의 62점 사진 작품이 전시 중입니다.
            <br />
            작품을 감상하고 방명록도 남겨주세요.
          </h4>
          <Link href="/ovr/list">
            <a>
              <span>전시장 바로가기</span>
              <ArrowForwardIos />
            </a>
          </Link>
          <Link href="/visitor">
            <a className="visitor-link">
              <span>방명록 바로가기</span>
            </a>
          </Link>
        </NextSection>
        <section className="section-2">
          <p>* 이 전시는 온라인으로만 진행되는 비대면 전시입니다.</p>
          <KeenSlider
            images={repPhotos.map((id) => `/images/photo/full/${id}.jpg`)}
            autoPlay
          />
        </section>
        <NextSection className={withLayout ? 'desktop' : ''}>
          <h2>방역활동 사진첩</h2>
          <h4>
            모두가 어려운 시기,
            <br />
            관악구와 주민들이 함께 나섰습니다.
            <br />
            관악구청과 주민자치회의 코로나 방역활동을 사진으로 만나보세요.
          </h4>
          <Link href="/covid">
            <a>
              <span>방역활동 사진첩 바로가기</span>
              <ArrowForwardIos />
            </a>
          </Link>
        </NextSection>
        <section className="section-3">
          <KeenSlider
            images={repCovid.map((id) => `/images/covid/rep/${id}.jpg`)}
            autoPlay
          />
        </section>
      </Root>
    </Layout>
  );
};

export default IndexPage;
