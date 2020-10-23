import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import Slider from '../../components/Slider';
import Loading from '../../components/Loading';

import { photosWithArtist } from '../../data';

import AppContext from '../../AppContext';

import { NAVBAR_WIDTH } from '../../defines';

const Root = styled.div`
  width: 100%;
  height: 100%;
`;

const OnlineViewingRoomPage: React.FC = () => {
  const { index, withLayout } = React.useContext(AppContext);

  return (
    <Layout>
      <Head>
        <title>test</title>
      </Head>
      <Root>
        {index ? (
          <Slider
            photos={photosWithArtist}
            pageIndex={index - 1}
            innerWidth={
              withLayout ? window.innerWidth - NAVBAR_WIDTH : window.innerWidth
            }
          />
        ) : (
          <Loading />
        )}
      </Root>
    </Layout>
  );
};

export default OnlineViewingRoomPage;
