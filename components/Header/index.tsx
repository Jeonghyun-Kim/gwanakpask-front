import React from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import Logo from '../Logo/Squared';

import { HEADER_HEIGHT } from '../../defines';

import AppContext from '../../AppContext';

const TRANSITION = 500;

const Root = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: ${HEADER_HEIGHT}px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 0 3px 6px;
  z-index: 1;

  .headerContent {
    height: 100%;
    display: flex;
    align-items: center;
    margin: 0 auto;
    padding: 0 20px;
    max-width: 2000px;
  }

  &.header-enter {
    top: -${HEADER_HEIGHT}px;
  }
  &.header-enter-active {
    top: 0;
    transition: ${TRANSITION}ms ease;
  }
  &.header-exit {
    top: 0;
  }
  &.header-exit-active {
    top: -${HEADER_HEIGHT}px;
    transition: ${TRANSITION}ms ease;
  }
`;

interface props {}
const Header: React.FC<props> = ({ ...props }) => {
  const { withLayout, headerOpen } = React.useContext(AppContext);

  if (withLayout) return <></>;
  return (
    <CSSTransition
      in={headerOpen}
      timeout={TRANSITION}
      unmountOnExit
      classNames="header"
      className="header">
      <Root {...props}>
        <div className="headerContent">
          <Logo href="/" />
          <div className="grow" />
        </div>
      </Root>
    </CSSTransition>
  );
};

export default Header;
