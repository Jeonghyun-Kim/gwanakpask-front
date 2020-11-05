import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import Layout from '../components/Layout';
import LoginForm from '../components/Form/Login';

import useAdmin from '../lib/hooks/useAdmin';

import AppContext from '../AppContext';

const Root = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 100px;
  &.desktop {
    padding-top: 200px;
  }
`;

const LoginPage: React.FC = () => {
  const { withLayout } = React.useContext(AppContext);
  const router = useRouter();
  const { mutateAdmin } = useAdmin({
    redirectTo: (router.query.from as string) ?? '/admin',
    redirectIfFound: true,
  });

  return (
    <Layout>
      <Head>
        <title>관악구 온라인 사진전 - 로그인</title>
      </Head>
      <Root className={withLayout ? 'desktop' : ''}>
        <LoginForm mutate={mutateAdmin} />
      </Root>
    </Layout>
  );
};

export default LoginPage;
