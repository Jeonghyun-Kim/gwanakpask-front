import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import useSWR from 'swr';
import { useCountUp } from 'react-countup';

import Button from '@material-ui/core/Button';
import Layout from '../components/Layout';
import MessageForm from '../components/Form/Message';
import TemplateIconBlock from '../components/Paper/IconBlock';
import PaperPreview from '../components/Paper';

import fetcher from '../lib/fetcher';

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
  .spinner {
    width: 25px;
    height: 25px;
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
  const [loading, setLoading] = React.useState<boolean>(false);
  const [res, setRes] = React.useState<string>('');
  const [templateId, setTemplateId] = React.useState<number>(6);
  const [previewId, setPreviewId] = React.useState<number | null>(null);
  const { data: countsData, mutate: mutateCounter } = useSWR('/api/counter');
  const { countUp: visitorCount, update: updateCounter } = useCountUp({
    start: 0,
    end: 0,
    duration: 1.5,
    separator: ',',
    startOnMount: true,
  });

  React.useEffect(() => {
    if (countsData && countsData.counts) {
      updateCounter(countsData.counts.message);
    }
  }, [countsData, updateCounter]);

  const handleSubmit = React.useCallback(async () => {
    if (!from || !content) return setRes('모든 칸을 채워주세요.');
    try {
      setLoading(true);
      await fetcher('/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ templateId, from, content }),
      });
      mutateCounter('/api/counter');
      setLoading(false);
      return setRes('성공적으로 제출하였습니다.');
    } catch (err) {
      setLoading(false);
      return setRes('전송 실패(서버 에러). 잠시 후 다시 시도해주세요.');
    }
  }, [from, content, templateId, mutateCounter]);

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
          <p className="response">{res}</p>
          <div className="submit-button-block">
            <p className="info">
              보내주신 방명록은 전시에 참여하신 작가님들께 전달됩니다.
            </p>
            <Button
              className="submit-button"
              variant="contained"
              onClick={() => handleSubmit()}
              disablied={loading}>
              {loading ? (
                <img
                  className="spinner"
                  alt="sipnner"
                  src="/images/spinner.gif"
                />
              ) : (
                <>제출하기</>
              )}
            </Button>
          </div>
        </div>
      </Root>
    </Layout>
  );
};

export default VisitorPage;
