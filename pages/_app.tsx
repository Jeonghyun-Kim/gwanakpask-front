import React from 'react';
import { SWRConfig } from 'swr';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import fetcher from '../lib/fetcher';
// import { initGA } from '../lib/analytics';

const GlobalStyle = createGlobalStyle`
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

    /* background: #191b21; */
  }

  #__next {
    width: 100%;
    height: 100%;
  }

  * {
    box-sizing: border-box;
  }
`;

const theme = {
  colors: {
    primary: '#000000',
  },
};

export default class MyApp extends App {
  componentDidMount(): void {
    if (process.env.NODE_ENV === 'production') {
      // initGA();
    }
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;
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
            <Component {...pageProps} />
          </SWRConfig>
        </ThemeProvider>
      </>
    );
  }
}
