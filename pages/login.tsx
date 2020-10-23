import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import LoginForm from '../components/Form/Login';

import useAdmin from '../lib/useAdmin';

const Root = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 50px;
`;

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { mutateAdmin } = useAdmin({
    redirectTo: (router.query.from as string) ?? '/admin',
    redirectIfFound: true,
  });

  return (
    <>
      <Head>
        <title>Login Page</title>
      </Head>
      <Root>
        <LoginForm mutate={mutateAdmin} />
      </Root>
    </>
  );
};

export default LoginPage;
