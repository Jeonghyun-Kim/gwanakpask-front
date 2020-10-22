import React from 'react';
import { SWRConfig } from 'swr';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { isMobile, isIE, isEdge, isEdgeChromium } from 'react-device-detect';
import smoothscroll from 'smoothscroll-polyfill';

import GlobalCSS from '../components/GlobalStyle';

import fetcher from '../lib/fetcher';
import { getIndex, saveIndex, pageCounter } from '../lib/utils';
import useLayout from '../lib/useLayout';
// import { initGA } from '../lib/analytics';

import AppContext from '../AppContext';

const GlobalStyle = createGlobalStyle`
  ${GlobalCSS}
`;

const theme = {
  colors: {
    primary: '#000000',
  },
};

const App: React.FC<{
  Component: React.FC;
  pageProps: never;
}> = ({ Component, pageProps }) => {
  const router = useRouter();
  const [index, setIndex] = React.useState<number>(0);
  // const index = React.useRef(0);
  const [headerOpen, setHeaderOpen] = React.useState<boolean>(true);
  const { withLayout } = useLayout();

  const saveAndSetIndex = React.useCallback((newIndex: number) => {
    setIndex(newIndex);
    saveIndex(newIndex);
  }, []);

  React.useEffect(() => {
    smoothscroll.polyfill();
    if (process.env.NODE_ENV === 'production') {
      // initGA();
    }
  }, []);

  React.useEffect(() => {
    const indexFromStorage = getIndex();
    setIndex(indexFromStorage ?? 1);
  }, [setIndex]);

  React.useEffect(() => {
    pageCounter();
  }, [router.asPath]);

  React.useEffect(() => {
    const refreshHandler = () => {
      if (isMobile) router.reload();
    };
    window.addEventListener('orientationchange', refreshHandler);

    return () =>
      window.removeEventListener('orientationchange', refreshHandler);
  }, [router]);

  if (isEdge && !isEdgeChromium) {
    return (
      <div>
        <h2>예전 엣지 브라우저에서는 전시를 감상할 수 없어요ㅜ.ㅜ</h2>
        <h2>
          보다 원활한 전시 감상을 위해 엣지를 업데이트 하시거나 크롬 브라우저
          사용을 권장합니다.
        </h2>
        <a
          href="https://www.google.com/chrome/"
          target="_blank"
          rel="noreferrer">
          <h4>크롬 다운받기</h4>
        </a>
      </div>
    );
  }

  if (isIE) {
    return (
      <div>
        <h2>인터넷 익스플로러에서는 전시를 감상할 수 없어요ㅜ.ㅜ</h2>
        <h2>보다 원활한 전시 감상을 위해 크롬 브라우저 사용을 권장합니다.</h2>
        <a
          href="https://www.google.com/chrome/"
          target="_blank"
          rel="noreferrer">
          <h4>크롬 다운받기</h4>
        </a>
      </div>
    );
  }

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="theme-color" content="#000000" />
          {/* <meta property="og:title" content="2020 관악강감찬" />
            <meta property="og:description" content="온라인 미술공모전" />
          <meta property="og:image" content="/images/og_image.jpg" /> */}
          <title>DEFAULT TITLE</title>
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <SWRConfig
          value={{
            fetcher,
            onError: (err) => {
              // eslint-disable-next-line no-console
              console.error(err);
            },
          }}>
          <AppContext.Provider
            value={{
              index,
              setIndex: saveAndSetIndex,
              headerOpen,
              setHeaderOpen,
              withLayout,
            }}>
            <Component {...pageProps} />
          </AppContext.Provider>
        </SWRConfig>
      </ThemeProvider>
    </>
  );
};

export default App;
