import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import useSWR from 'swr';

import Layout from '../../components/Layout';
import Paper from '../../components/Paper';

const Root = styled.div`
  width: 100%;
  height: 100%;
  .container {
    max-width: 1350px;
    margin: 0 auto;
    margin-bottom: 200px;
    padding: 36px 20px;
  }
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 64px;
  }
  .list-container {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
`;

const PreviewPaper = styled(Paper)`
  margin: 8px;
`;

const AdminPage: React.FC = () => {
  const router = useRouter();
  // const { username, loading, mutateAdmin } = useAdmin({
  //   redirectTo: `/login?from=${router.pathname}`,
  // });
  const { data } = useSWR('/api/admin/message');
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [token, setToken] = React.useState<string>('');

  React.useEffect(() => {
    const tokenStorage = sessionStorage.getItem('@token');
    if (!tokenStorage || tokenStorage !== process.env.NEXT_PUBLIC_TOKEN) {
      router.replace(`/login?from=${router.pathname}`);
    } else {
      setToken(tokenStorage);
    }
  }, [router, token]);

  React.useEffect(() => {
    if (data) {
      setMessages(data.messages);
    }
  }, [data]);

  return (
    <Layout>
      <Head>
        <title>온라인 사진전 - 방명록 확인</title>
      </Head>
      <Root>
        <div className="container">
          <div className="header">
            <div>Welcome Admin!</div>
            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem('@token');
                router.replace(`/login?from=${router.pathname}`);
              }}>
              Logout
            </button>
          </div>
          {token && (
            <div className="list-container">
              {messages.map((message) => (
                <PreviewPaper
                  key={message._id}
                  templateId={message.templateId}
                  from={message.from}
                  content={message.content}
                />
              ))}
            </div>
          )}
        </div>
      </Root>
    </Layout>
  );
};

export default AdminPage;
