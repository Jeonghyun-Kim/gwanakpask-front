import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

import Layout from '../components/Layout';
import Header from '../components/Header/Home';

import { getUserId } from '../lib/utils';

import AppContext from '../AppContext';

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`;

const IndexPage: React.FC = () => {
  const { index, setIndex, withLayout } = React.useContext(AppContext);

  return (
    <Layout>
      <Head>
        <title>title</title>
      </Head>
      <Header />
      <Root>
        <div>
          <div>withLayout: {String(withLayout)}</div>
          <div>index: {index}</div>
          <div>
            <Button
              variant="outlined"
              onClick={() => {
                setIndex(index + 1);
              }}>
              setIndex ++
            </Button>{' '}
            <Button
              variant="outlined"
              onClick={() => {
                setIndex(index - 1);
              }}>
              setIndex --
            </Button>
          </div>
          <div>userId: {index && getUserId()}</div>
          <p className="kyobo">폰트 테스트입니다.</p>
          <div>
            <Link href="/test">
              <a>test page</a>
            </Link>
          </div>
          <div>
            <Link href="/covid">
              <a>covid page</a>
            </Link>
          </div>
        </div>
      </Root>
    </Layout>
  );
};

export default IndexPage;
