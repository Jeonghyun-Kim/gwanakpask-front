import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import useSWR from 'swr';
import Countup from 'react-countup';

import Button from '@material-ui/core/Button';
import Layout from '../components/Layout';
// import Header from '../components/Header';
import Header from '../components/Header/Home';
import MessageForm from '../components/Form/Message';
import TemplateIconBlock from '../components/Paper/IconBlock';
import PaperPreview from '../components/Paper';
import { ResponseModal as ResModal } from '../components/Modal';

import fetcher from '../lib/fetcher';
import { getUserId } from '../lib/utils';

import AppContext from '../AppContext';

const Root = styled.div`
  position: relative;
  width: 100%;
  min-height: 100%;
  padding: 32px 0 48px 0;
  .container {
    max-width: 850px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .sub-title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 500;
    text-align: center;
  }
  .counter {
    font-size: 0.875rem;
    font-weight: 400;
    color: #757575;
    margin: 0;
    margin-top: 10px;
  }
  .content-block {
    width: 100%;
    margin: 16px auto 32px auto;
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
  .info {
    margin: 20px 0 64px 0;
    padding: 0 16px;
    font-size: 0.875rem;
    font-weight: 400;
    color: #757575;
  }
  .submit-button-block {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;
    .submit-button {
      position: fixed;
      left: 50%;
      bottom: 20px;
      transform: translateX(-50%);
      width: 300px;
      height: 48px;
      transition: background-color 300ms ease;
      .MuiButton-label {
        color: white;
      }
    }
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
  &.desktop {
    padding: 80px 0;
    .title {
      margin: 0;
      font-size: 2.5rem;
      font-weight: 500;
    }
    .sub-title {
      margin: 40px 0 10px 0;
      font-size: 1.5625rem;
      font-weight: 400;
    }
    .counter {
      font-size: 1rem;
    }
    .content-block {
      margin-bottom: 32px;
    }
    .info {
      font-size: 1rem;
      margin-bottom: 16px;
    }
    .submit-button {
      position: relative;
      left: initial;
      bottom: initial;
      transform: none;
      width: 80%;
      max-width: 400px;
    }
  }
`;

const VisitorPage: React.FC = () => {
  const { withLayout } = React.useContext(AppContext);
  const [from, setFrom] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [resModalFlags, setResModalFlags] = React.useState<{
    open: boolean;
    success: boolean;
  }>({ open: false, success: true });
  const [valid, setValid] = React.useState<boolean>(false);
  const [templateId, setTemplateId] = React.useState<number>(6);
  const [previewId, setPreviewId] = React.useState<number | null>(null);
  const { data: countsData, mutate: mutateCounter } = useSWR('/api/counter');

  React.useEffect(() => {
    if (!from || !content) setValid(false);
    else setValid(true);
  }, [content, from]);

  const handleSubmit = React.useCallback(async () => {
    try {
      setLoading(true);
      await fetcher('/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId,
          from,
          content,
          userId: getUserId(),
        }),
      });
      mutateCounter('/api/counter');
      return setResModalFlags({ open: true, success: true });
    } catch (err) {
      return setResModalFlags({ open: true, success: false });
    }
  }, [from, content, templateId, mutateCounter]);

  // const SendButton: React.FC = React.useCallback(
  //   () => (
  //     <Button
  //       variant="text"
  //       style={{
  //         color: valid ? '#007aff' : '#bdbdbd',
  //         width: 'fit-content',
  //         marginRight: -10,
  //       }}
  //       onClick={() => handleSubmit()}
  //       disabled={loading || !valid}>
  //       {loading ? (
  //         <img
  //           className="spinner"
  //           style={{ width: 16, height: 16 }}
  //           alt="sipnner"
  //           src="/images/spinner.gif"
  //         />
  //       ) : (
  //         <>보내기</>
  //       )}
  //     </Button>
  //   ),
  //   [handleSubmit, loading, valid],
  // );

  return (
    <Layout>
      <Head>
        <title>방명록</title>
      </Head>
      {/* <Header
        backTo={{ href: '/ovr/list', name: '전시장' }}
        title="방명록"
        actionComponent={SendButton}
      /> */}
      <Header />
      <ResModal
        open={resModalFlags.open}
        close={() => {
          if (resModalFlags.success) {
            setFrom('');
            setContent('');
          }
          setResModalFlags({ ...resModalFlags, open: false });
          setLoading(false);
        }}
        success={resModalFlags.success}
      />
      <Root className={withLayout ? 'desktop' : ''}>
        <div className="container">
          {withLayout && <h2 className="title">방명록</h2>}
          <p className="sub-title">
            전시에 참여하신 작가님들을 위해
            {withLayout ? ' ' : <br />}
            방명록을 남겨주세요
          </p>
          <p className="counter">
            지금까지{' '}
            <Countup
              start={0}
              end={
                countsData && countsData.counts ? countsData.counts.message : 0
              }
              duration={1.5}
              separator=","
            />
            명 참여
          </p>
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
          <div className="submit-button-block">
            <p className="info">
              보내주신 방명록은 전시에 참여하신 작가님들께 전달됩니다.
            </p>
            <Button
              className="submit-button"
              variant="contained"
              style={{ backgroundColor: valid ? '#006288' : '#bdbdbd' }}
              onClick={() => handleSubmit()}
              disabled={loading || !valid}>
              {loading ? (
                <img
                  className="spinner"
                  alt="sipnner"
                  src="/images/spinner.gif"
                />
              ) : (
                <>보내기</>
              )}
            </Button>
          </div>
        </div>
      </Root>
    </Layout>
  );
};

export default VisitorPage;
