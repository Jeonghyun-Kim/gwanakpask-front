import styled from 'styled-components';

export const ModalRoot = styled.div`
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
        width: 110px;
        height: 110px;
        bottom: 0;
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
    }
  }
  &.desktop {
  }
  &.modal-enter {
    opacity: 0;
  }
  &.modal-active {
    opacity: 1;
    transition: opacity 300ms ease;
  }
  &.modal-exit {
    opacity: 1;
  }
  &.modal-exit-active {
    opacity: 0;
    transition: opacity 300ms ease;
  }
`;

export default { ModalRoot };
