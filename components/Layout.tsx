import React from 'react';

import Header from './Header';

interface props {
  children: React.ReactNode;
}
const Layout: React.FC<props> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
