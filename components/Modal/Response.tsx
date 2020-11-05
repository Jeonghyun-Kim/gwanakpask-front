import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import ScrollLock from 'react-scrolllock';
import { CSSTransition } from 'react-transition-group';

import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import Curator from '../../public/icons/curator.svg';
import CuratorSad from '../../public/icons/curator_sad.svg';

import { ModalRoot } from './styles';

import AppContext from '../../AppContext';

const Root = styled(ModalRoot)`
  .blurBackground {
    position: absolute;
  }
  .modalBox {
    position: absolute;
  }
  .bottom {
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
    .ok-button {
      background-color: #757575;
      width: 120px;
      height: 30px;
      margin-bottom: 20px;
      .MuiButton-label {
        font-size: 0.875rem;
        font-weight: 500;
        color: white;
      }
    }
  }
  &.desktop {
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
    <CSSTransition in={open} timeout={300} unmountOnExit classNames="modal">
      <Root className={withLayout ? 'desktop' : ''} {...props}>
        <ScrollLock isActive={open} />
        <div className="blurBackground" />
        <div className="modalBox">
          <div className="top">
            <SvgIcon
              component={success ? Curator : CuratorSad}
              viewBox="0 0 400 400"
            />
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
            {success ? (
              <>
                <Link href="/">
                  <Button className="exit-button">홈으로 돌아가기</Button>
                </Link>
                <Button className="stay-button" onClick={() => close()}>
                  다른 방명록 남기기
                </Button>
              </>
            ) : (
              <Button
                className="ok-button"
                variant="contained"
                onClick={() => close()}>
                확인
              </Button>
            )}
          </div>
        </div>
      </Root>
    </CSSTransition>
  );
};

export default ResponseModal;
