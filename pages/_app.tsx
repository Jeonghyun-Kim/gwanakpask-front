import React from 'react';
import { SWRConfig } from 'swr';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import {
  isMobile,
  isTablet,
  isIE,
  isEdge,
  isEdgeChromium,
} from 'react-device-detect';
import { useWindowSize } from 'react-use';
import smoothscroll from 'smoothscroll-polyfill';

import fetcher from '../lib/fetcher';
import { getIndex, getUserId, pageCounter } from '../lib/utils';
// import { initGA } from '../lib/analytics';

import AppContext from '../AppContext';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Kyobo';
    font-weight: 400;
    src: local('Kyobo'), url('/fonts/Kyobo.woff') format('woff'), url('/fonts/Kyobo.ttf') format('truetype');
  }
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;

    font-family: 'Noto Sans KR', sans-serif, -apple-system, BlinkMacSystemFont,
      Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
      Helvetica Neue;
    line-height: 1.6;
    font-size: 16px;
  }
  #__next {
    width: 100%;
    height: 100%;
  }
  * {
    box-sizing: border-box;
  }
  .kyobo {
    font-family: 'Kyobo', 'Noto Sans KR', sans-serif, -apple-system, BlinkMacSystemFont,
      Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
      Helvetica Neue;
  }
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
  const { width: innerWidth, height: innerHeight } = useWindowSize();
  const [index, setIndex] = React.useState<number>(getIndex() ?? 0);
  const withLayout = !isMobile || (isTablet && innerWidth > innerHeight);

  React.useEffect(() => {
    smoothscroll.polyfill();
    if (process.env.NODE_ENV === 'production') {
      // initGA();
    }
    // eslint-disable-next-line no-console
    console.log('userId:', getUserId());
  }, []);

  React.useEffect(() => {
    pageCounter();
  }, [router.asPath]);

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
      <AppContext.Provider value={{ index, setIndex, withLayout }}>
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
            <Component {...pageProps} />
          </SWRConfig>
        </ThemeProvider>
      </AppContext.Provider>
    </>
  );
};

export default App;
