import React from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

const TRANSITION = 300;

const Root = styled.div`
  z-index: 99;
  display: grid;
  place-items: center;
  position: absolute;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  #manual-image {
    width: 125px;
    height: 125px;
  }
  &.manual-modal-enter {
    opacity: 0;
  }
  &.manual-modal-enter-active {
    opacity: 1;
    transition: ${TRANSITION}ms;
  }
  &.manual-modal-exit {
    opacity: 1;
  }
  &.manual-modal-exit-active {
    opacity: 0;
    transition: ${TRANSITION}ms;
  }
`;

interface props {
  open: boolean;
  close: () => void;
}
const ManualModal: React.FC<props> = ({ open, close, ...props }) => {
  return (
    <>
      <CSSTransition
        in={open}
        timeout={TRANSITION}
        unmountOnExit
        classNames="manual-modal">
        <Root
          onTouchStart={() => {
            close();
          }}
          onClick={() => {
            close();
          }}
          {...props}>
          <img
            id="manual-image"
            alt="스와이프! 넘겨보는 전시장"
            src="/images/manual.png"
          />
        </Root>
      </CSSTransition>
    </>
  );
};

export default ManualModal;
