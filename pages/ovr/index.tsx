import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import Slider from '../../components/Slider';
import Loading from '../../components/Loading';
import { ManualModal } from '../../components/Modal';

import { photosWithArtist } from '../../data';

import AppContext from '../../AppContext';

import { NAVBAR_WIDTH } from '../../defines';

const Root = styled.div`
  width: 100%;
  height: 100%;
`;

const OnlineViewingRoomPage: React.FC = () => {
  const { index, withLayout } = React.useContext(AppContext);
  const [manualModalOpen, setManualModalOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!sessionStorage.getItem('@manual')) {
      setManualModalOpen(true);
    }
  }, []);

  const handleModalClose = React.useCallback(() => {
    sessionStorage.setItem('@manual', 'seen');
    setManualModalOpen(false);
  }, []);

  return (
    <Layout>
      <Head>
        <title>
          전시장 - {index ? photosWithArtist[index - 1].title : '작품이름'},{' '}
          {index ? photosWithArtist[index - 1].artist.name : '작가이름'}
        </title>
      </Head>
      <Root>
        {index ? (
          <>
            {!withLayout && (
              <ManualModal open={manualModalOpen} close={handleModalClose} />
            )}
            <Slider
              photos={photosWithArtist}
              pageIndex={index - 1}
              innerWidth={
                withLayout
                  ? window.innerWidth - NAVBAR_WIDTH
                  : window.innerWidth
              }
            />
          </>
        ) : (
          <Loading />
        )}
      </Root>
    </Layout>
  );
};

export default OnlineViewingRoomPage;
