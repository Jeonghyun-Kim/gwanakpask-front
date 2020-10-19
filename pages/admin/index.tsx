import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import Loading from '../../components/Loading';

import useAdmin from '../../lib/useAdmin';

const Root = styled.div`
  width: 100%;
  height: 100%;
`;

const AdminPage: React.FC = () => {
  const router = useRouter();
  const { username, loading, mutateAdmin } = useAdmin({
    redirectTo: `/login?from=${router.pathname}`,
  });

  if (loading) return <Loading />;

  return (
    <>
      <Head>
        <title>title</title>
      </Head>
      <Root>
        <div>Welcome {username}!</div>
        <button
          type="button"
          onClick={async () => {
            await fetch('/api/logout');
            mutateAdmin('/api/admin');
          }}>
          Logout
        </button>
      </Root>
    </>
  );
};

export default AdminPage;
