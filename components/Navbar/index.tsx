import React from 'react';
import styled from 'styled-components';

import Logo from '../Logo/OneLine';

import { NAVBAR_WIDTH } from '../../defines';

const Root = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: ${NAVBAR_WIDTH}px;
  padding: 30px;
  background-color: #eee;
  .divider {
    margin: 16px 0;
    align-self: center;
    width: 100%;
    border-top: 1px solid #4b4b4b;
  }
`;

const NavBar: React.FC = ({ ...props }) => {
  return (
    <Root {...props}>
      <Logo href="/" />
      <div className="divider" />
      <div className="grow" />
    </Root>
  );
};

export default NavBar;
