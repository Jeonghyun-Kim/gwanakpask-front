import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import Layout from '../components/Layout';
import ManualModal from '../components/Modal/Manual';
import Paper from '../components/Paper';
import IconBlock from '../components/Paper/IconBlock';

import AppContext from '../AppContext';

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;

  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const TestPage: React.FC = () => {
  const { index } = React.useContext(AppContext);
  const [open, setOpen] = React.useState<boolean>(true);
  const [templateId, setTemplateId] = React.useState<number>(0);

  return (
    <Layout>
      <Head>
        <title>test</title>
      </Head>
      <ManualModal open={open} close={() => setOpen(false)} />
      <Root>
        <div className="container">
          <IconBlock templateId={templateId} setTemplateId={setTemplateId} />
          <Paper
            templateId={templateId}
            from="김정현"
            content="작가님의 좋은 작품 잘 보고 갑니다. 사진이 정말 이쁘네요. 작가님의 좋은 작품 앞으로도 많은 기대가 됩니다. 게다가 온라인 전시가 매우 멋있었네요. 다들 전시 준비하시느라 고생 많으셨습니다."
          />
          <div>index: {index}</div>
        </div>
      </Root>
    </Layout>
  );
};

export default TestPage;
