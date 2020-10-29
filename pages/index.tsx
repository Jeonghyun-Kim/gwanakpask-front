import React from 'react';
import Image from 'next/image';
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
import Footer from '../components/Footer';

import { NextSection } from '../components/GlobalStyle';

import useLayout from '../lib/hooks/useLayout';
import useWindowScroll from '../lib/hooks/useWindowScroll';

import AppContext from '../AppContext';

import { artists } from '../data';

const Root = styled.div`
  width: 100%;
  height: 100%;
  .poster {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #006288;
    overflow: hidden;
    z-index: 1;
    .title {
      position: absolute;
      top: 32px;
      left: 16px;
      max-width: 60%;
      max-height: min(100% - 140px, 70%);
      object-fit: contain;
    }
    #horse {
      position: absolute;
      bottom: 0;
      right: -32px;
      max-width: 100%;
      max-height: calc(100% - 200px);
      object-fit: contain;
    }
    .counter {
      position: absolute;
      bottom: 80px;
      left: 50%;
      width: fit-content;
      transform: translateX(-50%);
      font-size: 1rem;
      font-weight: 400;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 1);
      color: white;
    }
    .enter-button {
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 60px);
      height: 45px;
      z-index: 99;
      background-color: white;
      .MuiButton-label {
        font-size: 1rem;
        font-weight: 700;
        color: #006288;
      }
      &.sticky {
        height: calc(50px + env(safe-area-inset-bottom) / 2);
        width: 100%;
        bottom: 0;
        padding-bottom: calc(8px + env(safe-area-inset-bottom) / 4);
        border-radius: 0;
        background-color: #3f51b5;
        .MuiButton-label {
          font-weight: 500;
          color: white;
        }
      }
      &.enter-button-enter {
        height: 45px;
        width: calc(100% - 60px);
        bottom: 30px;
        border-radius: 10px;
        background-color: white;
        .MuiButton-label {
          font-weight: 700;
          color: #006288;
        }
        transition: 1000ms;
      }
      &.enter-button-enter-active {
        height: calc(50px + env(safe-area-inset-bottom) / 2);
        width: 100%;
        bottom: 0;
        padding-bottom: calc(8px + env(safe-area-inset-bottom) / 4);
        border-radius: 0;
        background-color: #3f51b5;
        .MuiButton-label {
          font-weight: 500;
          color: white;
        }
      }
      &.enter-button-exit {
        height: calc(50px + env(safe-area-inset-bottom) / 2);
        width: 100%;
        bottom: 0;
        padding-bottom: calc(8px + env(safe-area-inset-bottom) / 4);
        border-radius: 0;
        background-color: #3f51b5;
        .MuiButton-label {
          font-weight: 500;
          color: white;
        }
        transition: 1000ms;
      }
      &.enter-button-exit-active {
        height: 45px;
        width: calc(100% - 60px);
        bottom: 30px;
        border-radius: 10px;
        background-color: white;
        .MuiButton-label {
          font-weight: 700;
          color: #006288;
        }
      }
    }
  }
  .section-1 {
    position: relative;
    text-align: center;
    padding-top: 100px;
    padding-bottom: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    word-break: keep-all;
    .title-block {
      position: relative;
      margin-bottom: 32px;
      #fireworks {
        position: absolute;
        width: auto;
        bottom: 50px;
        left: 50%;
        transform: translateX(-50%);
      }
      p {
        position: relative;
        font-size: 1.5625rem;
        font-weight: 500;
      }
      h4 {
        position: relative;
        font-size: 1rem;
        font-weight: 400;
      }
    }
    .welcome-guide {
      position: relative;
      margin: 32px 0;
      padding: 0 32px;
      line-height: 3;
      font-size: 0.875rem;
      font-weight: 400;
    }
    .name {
      position: relative;
      margin-top: 0;
      margin-bottom: 80px;
      font-size: 0.875rem;
      font-weight: 500;
    }
    a {
      position: relative;
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
  .section-4 {
    background-color: #dbdbdb;
    padding: 48px 16px 0 16px;
    & > * {
      max-width: 800px;
      margin: 0 auto;
    }
    .title {
      font-size: 1rem;
      font-weight: 500;
      margin-bottom: 30px;
    }
    .division {
      margin: 15px auto;
      margin-bottom: 0;
      font-size: 0.75rem;
      font-weight: 400;
      word-break: keep-all;
      p {
        font-weight: 500;
      }
    }
    .ack-logo {
      margin-top: 32px;
    }
    .divider {
      height: 1px;
      margin-top: 32px;
      background-color: #707070;
    }
  }
  &.desktop {
    .poster {
      & > * {
        max-width: 1300px;
        margin: 0 auto;
      }
      .image-container {
        position: relative;
        width: 100%;
        height: 100%;
        .title {
          top: 64px;
          left: 32px;
          max-height: min(100% - 270px, 70%);
        }
      }
      .counter {
        bottom: 110px;
        display: flex;
        align-items: flex-end;
        font-size: 1.5625rem;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
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
        #fireworks {
          bottom: -360px;
        }
        p {
          font-size: 2.5rem;
          font-weight: 700;
        }
        h4 {
          font-size: 1.5625rem;
        }
      }
      .welcome-guide {
        max-width: 480px;
        font-size: 1rem;
      }
      .name {
        font-size: 1rem;
        margin-bottom: 120px;
      }
      a {
        span {
          font-size: 1rem;
          margin: 0 10px;
          font-weight: 700;
        }
      }
    }
    .section-2 {
      p {
        font-size: 1rem;
      }
    }
    .section-4 {
      .title {
        font-size: 1.2rem;
      }
      .division {
        font-size: 1rem;
        p {
          font-size: 1.1rem;
        }
      }
    }
  }
`;

const repPhotos = [2, 3, 5, 7, 19, 50];
const repCovid = [1, 2, 3, 4, 5, 6, 7];

const IndexPage: React.FC = () => {
  const router = useRouter();
  const {
    size: { innerWidth },
  } = useLayout();
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

  const onFireworks = React.useCallback(
    (visible: boolean) => {
      if (visible) {
        setSpring({
          height: !withLayout ? (innerWidth * 600) / 1300 : 500,
          opacity: 0.7,
        });
      }
    },
    [innerWidth, withLayout, setSpring],
  );

  const offFireworks = React.useCallback(
    (visible: boolean) => {
      if (visible) {
        setSpring({
          height: 0,
          opacity: 0,
        });
      }
    },
    [setSpring],
  );

  return (
    <Layout>
      <Header />
      <Root className={withLayout ? 'desktop' : ''}>
        <VisibilitySensor onChange={offFireworks}>
          <section className="poster">
            <div className="image-container">
              <img
                className="unselectable"
                id="horse"
                alt="general ganggamchan statue"
                src="/images/poster/horse.png"
              />
              <img
                className="title unselectable"
                alt="2020 관악 강감찬 축제"
                src="/images/poster/title.png"
              />
            </div>
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
                  className={`enter-button ${
                    !withLayout && scrollY > 5 && 'sticky'
                  }`}
                  variant="contained"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') router.push('/intro');
                  }}>
                  전시 입장
                </Button>
              </Link>
            </CSSTransition>
          </section>
        </VisibilitySensor>
        <section className="section-1">
          <VisibilitySensor onChange={onFireworks}>
            <div className="title-block">
              <a.img
                id="fireworks"
                className="unselectable"
                alt=""
                src="/images/fireworks.png"
                style={{ height, opacity: opacity as never }}
              />
              <p>환영합니다.</p>
              <h4>한국사진협회 관악지부의 온라인 사진전입니다.</h4>
            </div>
          </VisibilitySensor>
          <p className="welcome-guide">
            코로나 19로 인하여 관악구민 모두가 어려움을 겪고 몸과 마음이
            지쳐있는 이 시기에 회원들의 소중한 작품으로 위로가 되고 희망과
            용기를 잃지 않았으면 합니다.
          </p>
          <p className="name">
            <span>한국 사진작가협회 관악구지부 지부장 박태재</span>
          </p>
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
        <VisibilitySensor onChange={offFireworks}>
          <section className="section-2">
            <p>* 이 전시는 온라인으로만 진행되는 비대면 전시입니다.</p>
            <KeenSlider
              images={repPhotos.map((id) => `/images/photo/full/${id}.jpg`)}
              autoPlay
            />
          </section>
        </VisibilitySensor>
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
        <section className="section-4">
          <h2 className="title">
            2020 관악 강감찬 축제
            <br />
            관악구 온라인 사진전
          </h2>
          <div className="division">
            <p>장소</p>
            gawnakpask.ondisplay.co.kr
          </div>
          <div className="division">
            <p>기간</p>
            2020.11.06 ~ 11.19
          </div>
          <div className="division">
            <p>참여작가</p>
            {artists.map((artist) => `${artist.name}`).join(' ')}
          </div>
          <div className="ack-logo">
            {!withLayout ? (
              <Image
                alt="주최 관악미술협회 후원 관악구 관악문화재단 관악문화원"
                src="/images/logo/ack_m.png"
                width={200}
                height={80}
              />
            ) : (
              <Image
                alt="주최 관악미술협회 후원 관악구 관악문화재단 관악문화원"
                src="/images/logo/ack_w.png"
                width={625}
                height={28}
              />
            )}
          </div>
          <div className="divider" />
        </section>
        <Footer />
      </Root>
    </Layout>
  );
};

export default IndexPage;
