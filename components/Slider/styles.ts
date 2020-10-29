import styled from 'styled-components';

export const MobileRoot = styled.div`
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  .slider-page {
    position: absolute;
    width: 100%;
    height: 100%;
    & > div {
      position: relative;
      width: 100%;
      height: 100%;
      box-shadow: 0 62.5px 125px -25px rgba(50, 50, 73, 0.5),
        0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6);
    }
    .close-button {
      position: absolute;
      top: 10px;
      left: 5px;
      padding: 5px;
      svg {
        font-size: 36px;
        color: white;
      }
    }
    .bottom {
      padding: 0 16px 24px 16px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .artist-info {
      position: absolute;
      bottom: 12px;
      left: 12px;
      .click-area {
        display: flex;
        align-items: flex-end;
        cursor: pointer;
      }
      .title-and-name {
        margin-left: 10px;
        h2 {
          margin: 5px 0;
          font-size: 1rem;
          font-weight: 500;
          color: white;
        }
        p {
          margin: 0;
          font-size: 0.75rem;
          font-weight: 400;
          color: white;
        }
      }
    }
    .zoom-in-button {
      position: absolute;
      bottom: 12px;
      right: 12px;
      cursor: pointer;
    }
    .icon-block {
      display: flex;
      flex-direction: column;
      svg {
        font-size: 2rem;
        color: white;
      }
      .icon-name {
        font-size: 0.625rem;
        font-weight: 400;
        color: white;
        text-align: center;
      }
    }
  }
`;

export const DesktopRoot = styled.div`
  width: 100%;
  height: 100%;
  .close-button {
    position: absolute;
    width: 51px;
    height: 51px;
    padding: 5px;
    top: 40px;
    right: 40px;
    border-radius: 50%;
    background-color: #515253 !important;
    transition: opacity 300ms ease;
    .MuiIconButton-label {
      width: 51px;
      height: 51px;
    }
    svg {
      font-size: 40px;
      color: white;
    }
    &:hover {
      opacity: 0.7;
    }
  }
  .arrow-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 80px;
    height: 80px;
    .MuiIconButton-label {
      width: 80px;
      height: 80px;
    }
    svg {
      width: 100%;
      height: 100%;
      font-size: 10rem;
      color: #515253;
    }
    &.left {
      left: 80px;
      @media screen and (max-width: 1100px) {
        left: 40px;
      }
    }
    &.right {
      right: 80px;
      @media screen and (max-width: 1100px) {
        right: 40px;
      }
    }
  }
  .artist-info {
    position: absolute;
    bottom: 40px;
    left: 40px;
    .click-area {
      width: 400px;
      height: 80px;
      background-color: #515253;
      border-radius: 5px;
      opacity: 0.8;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    .vertical-divider {
      width: 2px;
      height: 55px;
      margin-top: 5px;
      background-color: white;
    }
    .title-and-name {
      margin-left: 10px;
      h2 {
        font-size: 1.5625rem;
        margin: 0;
        margin-bottom: 3px;
        font-weight: 500;
        color: white;
      }
      p {
        margin: 0;
        font-size: 1rem;
        font-weight: 400;
        color: white;
      }
    }
  }
  .icon-block {
    display: flex;
    flex-direction: column;
    padding: 0 12px;
    svg {
      font-size: 50px;
      margin-bottom: -6px;
      color: white;
    }
    .icon-name {
      font-size: 1rem;
      font-weight: 400;
      color: white;
      text-align: center;
      margin-bottom: 3px;
    }
  }
  .zoom-in-button {
    position: absolute;
    width: 51px;
    height: 51px;
    bottom: 40px;
    right: 40px;
    border-radius: 50%;
    padding: 5px;
    background-color: #515253;
    opacity: 0.8;
    cursor: pointer;
    transition: opacity 300ms ease;
    &:hover {
      opacity: 0.7;
    }
    .icon-block {
      width: 100%;
      height: 100%;
      padding: 0 8px;
      justify-content: center;
      svg {
        font-size: 28px;
        margin-bottom: -3px;
      }
      .icon-name {
        font-size: 0.6rem;
      }
    }
  }
`;

export default { MobileRoot, DesktopRoot };
