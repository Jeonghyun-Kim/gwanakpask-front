import React from 'react';
import styled from 'styled-components';

import { OneLineLogo as Logo } from '../Logo';
import MenuItem, { MenuRoot } from './MenuItem';

import { NAVBAR_WIDTH } from '../../defines';

const Root = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: ${NAVBAR_WIDTH}px;
  padding: 30px 30px 60px 30px;
  background-color: #2a2b2c;
  /* background-color: #f8f8f8; */
  z-index: 999;
  .logo-one-line {
    margin: 20px 0;
  }
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
      <MenuItem title="관악구 온라인 사진전" href="/" />
      <MenuItem title="전시소개" href="/intro" />
      <MenuItem
        title="전시장"
        href="/ovr/list"
        currentPaths={['/ovr', '/ovr/list']}
      />
      <MenuItem title="방명록" href="/visitor" />
      <MenuItem title="방역활동 사진첩" href="/covid" />
      <MenuItem title="관악구 풍경" href="/landscape" />
      <div className="grow" />
      <div className="divider" />
      <MenuRoot
        href="https://home.ondisplay.co.kr/"
        target="_blank"
        rel="noreferrer">
        About onDisplay
      </MenuRoot>
    </Root>
  );
};

export default NavBar;
