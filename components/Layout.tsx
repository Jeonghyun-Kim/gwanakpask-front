import React from 'react';
import styled from 'styled-components';

import Header from './Header';
import NavBar from './Navbar';

import AppContext from '../AppContext';

import { NAVBAR_WIDTH } from '../defines';

const Main = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const DesktopMain = styled(Main)`
  width: calc(100% - ${NAVBAR_WIDTH}px);
  margin-left: ${NAVBAR_WIDTH}px;
`;

interface props {
  children: React.ReactNode;
}
const Layout: React.FC<props> = ({ children, ...props }) => {
  const { withLayout } = React.useContext(AppContext);

  if (!withLayout)
    return (
      <>
        <Header />
        <Main {...props}>{children}</Main>
      </>
    );

  return (
    <>
      <NavBar />
      <DesktopMain {...props}>{children}</DesktopMain>
    </>
  );
};

export default Layout;
