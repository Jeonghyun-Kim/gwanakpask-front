import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import ScrollLock from 'react-scrolllock';
import { CSSTransition } from 'react-transition-group';

import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import Curator from '../../public/icons/curator.svg';

import AppContext from '../../AppContext';

const Root = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 4;
  .blurBackground {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5) no-repeat padding-box;
    -webkit-backdrop--filter: blur(5px);
    backdrop-filter: blur(5px);
    z-index: 3;
  }
  .modalBox {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 280px;
    height: 300px;
    border-radius: 10px;
    background-color: white;
    z-index: 5;
    display: flex;
    flex-direction: column;
    .top {
      position: relative;
      height: 80px;
      background-color: #ededed;
      border-radius: 10px 10px 0 0;
      svg {
        position: absolute;
        width: 95px;
        height: 95px;
        bottom: -3px;
        left: 50%;
        transform: translate(-50%, 0);
      }
    }
    .bottom {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px 0;
      .alert-title {
        margin: 5px 0;
        font-size: 1.25rem;
        font-weight: 500;
      }
      .alert-content {
        margin: 0;
        font-size: 0.75rem;
        font-weight: 400;
        text-align: center;
      }
      .exit-button {
        background-color: #3f51b5;
        .MuiButton-label {
          color: white;
        }
      }
      .stay-button {
        .MuiButton-label {
          text-decoration: underline;
          color: #7d7d7d;
        }
      }
    }
  }
  &.desktop {
  }
  &.res-modal-enter {
    opacity: 0;
  }
  &.res-modal-active {
    opacity: 1;
    transition: opacity 300ms ease;
  }
  &.res-modal-exit {
    opacity: 1;
  }
  &.res-modal-exit-active {
    opacity: 0;
    transition: opacity 300ms ease;
  }
`;

interface Props {
  open: boolean;
  close: () => void;
  success: boolean;
}
const ResponseModal: React.FC<Props> = ({ open, close, success, ...props }) => {
  const { withLayout } = React.useContext(AppContext);

  return (
    <CSSTransition in={open} timeout={300} unmountOnExit classNames="res-modal">
      <Root className={`${withLayout && 'desktop'}`} {...props}>
        <ScrollLock isActive={open} />
        <div className="blurBackground" />
        <div className="modalBox">
          <div className="top">
            <SvgIcon component={Curator} viewBox="0 0 300 300" />
          </div>
          <div className="bottom">
            <p className="alert-title">
              {success ? '감사합니다' : '문제가 발생했습니다'}
            </p>
            <p className="alert-content">
              {success ? (
                <>
                  남겨주신 방명록은 작가님들께
                  <br />
                  소중히 전달해드릴게요
                </>
              ) : (
                <>새로고침 이후에 다시 시도해주세요</>
              )}
            </p>
            <div className="grow" />
            <Link href="/">
              <Button className="exit-button">홈으로 돌아가기</Button>
            </Link>
            <Button className="stay-button" onClick={() => close()}>
              다른 방명록 남기기
            </Button>
          </div>
        </div>
      </Root>
    </CSSTransition>
  );
};

export default ResponseModal;
