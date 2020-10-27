import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import ScrollLock from 'react-scrolllock';
import { CSSTransition } from 'react-transition-group';

import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import Curator from '../../public/icons/curator.svg';

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
}
const EdgeModal: React.FC<Props> = ({ open, ...props }) => {
  const { withLayout } = React.useContext(AppContext);

  return (
    <CSSTransition in={open} timeout={300} unmountOnExit classNames="modal">
      <Root className={withLayout ? 'desktop' : ''} {...props}>
        <ScrollLock isActive={open} />
        <div className="blurBackground" />
        <div className="modalBox">
          <div className="top">
            <SvgIcon component={Curator} viewBox="0 0 400 400" />
          </div>
          <div className="bottom">
            <p className="alert-title">마지막 작품까지 보셨어요</p>
            <p className="alert-content">작가님들께 방명록을 남겨주실래요?</p>
            <div className="grow" />
            <Link href="/visitor">
              <Button className="exit-button">방명록 남기러 가기</Button>
            </Link>
            <Link href="/ovr/list">
              <Button className="stay-button">작품목록으로 돌아가기</Button>
            </Link>
          </div>
        </div>
      </Root>
    </CSSTransition>
  );
};

export default EdgeModal;
