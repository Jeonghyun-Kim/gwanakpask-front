import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

import Layout from '../components/Layout';
import ManualModal from '../components/Modal/Manual';

const Root = styled.div`
  width: 100%;
  height: 100%;
`;

const TestPage: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(true);

  return (
    <Layout>
      <Head>
        <title>test</title>
      </Head>
      <ManualModal open={open} close={() => setOpen(false)} />
      <Root>
        <Link href="/">
          <a>home</a>
        </Link>
        <button type="button" onClick={() => setOpen(true)}>
          open
        </button>
      </Root>
    </Layout>
  );
};

export default TestPage;
