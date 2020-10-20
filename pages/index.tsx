import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

import Layout from '../components/Layout';

import { saveIndex, getUserId } from '../lib/utils';

import AppContext from '../AppContext';

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`;

const IndexPage: React.FC = () => {
  const {
    index,
    setIndex,
    headerOpen,
    setHeaderOpen,
    withLayout,
  } = React.useContext(AppContext);

  return (
    <Layout>
      <Head>
        <title>title</title>
      </Head>
      <Root>
        <div>
          <div>withLayout: {String(withLayout)}</div>
          <div>index: {index}</div>
          <div>
            <Button
              variant="outlined"
              onClick={() => {
                setIndex(index + 1);
                saveIndex(index + 1);
              }}>
              setIndex ++
            </Button>{' '}
            <Button
              variant="outlined"
              onClick={() => {
                setIndex(index - 1);
                saveIndex(index - 1);
              }}>
              setIndex --
            </Button>
          </div>
          <div>userId: {index && getUserId()}</div>
          <p className="kyobo">폰트 테스트입니다.</p>
          <Link href="/test">
            <a>test page</a>
          </Link>
          <div>
            <Button
              variant="outlined"
              onClick={() => setHeaderOpen(!headerOpen)}>
              Toggle Header
            </Button>
          </div>
        </div>
      </Root>
    </Layout>
  );
};

export default IndexPage;
