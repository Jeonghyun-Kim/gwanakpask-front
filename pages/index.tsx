import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import useSWR from 'swr';
import Countup from 'react-countup';
import { CSSTransition } from 'react-transition-group';

import Button from '@material-ui/core/Button';

import Layout from '../components/Layout';
import Header from '../components/Header/Home';

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
`;

const IndexPage: React.FC = () => {
  const router = useRouter();
  const { withLayout } = React.useContext(AppContext);
  const { data: counter } = useSWR('/api/counter');
  const { y: scrollY } = useWindowScroll();

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
            방문자{' '}
            {counter && counter.counts ? (
              <Countup start={0} end={counter.counts.visitor} duration={2} />
            ) : (
              ''
            )}
            명 &middot; 방명록{' '}
            {counter && counter.counts ? (
              <Countup start={0} end={counter.counts.message} duration={2} />
            ) : (
              ''
            )}
            개
          </span>
          <CSSTransition
            in={scrollY > 5}
            timeout={1000}
            classNames="enter-button">
            <Link href="/intro">
              <Button
                className={`enter-button ${scrollY > 5 && 'sticky'}`}
                variant="contained"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') router.push('/intro');
                }}>
                전시입장
              </Button>
            </Link>
          </CSSTransition>
        </section>
        <div style={{ height: '100vh' }} />
        <div style={{ height: '100vh' }} />
      </Root>
    </Layout>
  );
};

export default IndexPage;
