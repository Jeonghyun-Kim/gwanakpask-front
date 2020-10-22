import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import useSWR from 'swr';
import { useCountUp } from 'react-countup';

import Layout from '../components/Layout';
import MessageForm from '../components/Form/Message';
import TemplateIconBlock from '../components/Paper/IconBlock';
import PaperPreview from '../components/Paper';

import AppContext from '../AppContext';

const Root = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px 0;
  .container {
    max-width: 850px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .content-block {
    width: 100%;
    margin: 30px auto 50px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .form-block {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 30px;
  }
  @media screen and (min-width: 1201px) {
    .content-block {
      flex-direction: row;
      justify-content: space-between;
    }
    .form-block {
      height: 425px;
      margin-bottom: 0;
    }
  }
`;

const VisitorPage: React.FC = () => {
  const { withLayout } = React.useContext(AppContext);
  const [from, setFrom] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');
  const [templateId, setTemplateId] = React.useState<number>(6);
  const [previewId, setPreviewId] = React.useState<number | null>(null);
  const { data } = useSWR('/api/counter');
  const { countUp: visitorCount, update: updateCounter } = useCountUp({
    start: 0,
    end: data ? data.counts.message : 0,
    duration: 1.5,
    separator: ',',
    startOnMount: true,
  });

  React.useEffect(() => {
    if (data) updateCounter(data.counts.message);
  }, [data, updateCounter]);

  return (
    <Layout>
      <Head>
        <title>방명록</title>
      </Head>
      <Root className={`${withLayout ? 'desktop' : ''}`}>
        <div className="container">
          <h2 className="title">방명록</h2>
          <p className="sub-title">
            전시에 참여하신 작가님들을 위해 방명록을 남겨주세요
          </p>
          <p className="counter">지금까지 {visitorCount}명 참여</p>
          <div className="content-block">
            <div className="form-block">
              <MessageForm
                from={from}
                setFrom={setFrom}
                content={content}
                setContent={setContent}
              />
              <TemplateIconBlock
                templateId={templateId}
                setTemplateId={setTemplateId}
                setPreviewId={setPreviewId}
              />
            </div>
            <PaperPreview
              templateId={previewId ?? templateId}
              from={from}
              content={content}
            />
          </div>
        </div>
      </Root>
    </Layout>
  );
};

export default VisitorPage;
