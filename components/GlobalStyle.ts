import { css } from 'styled-components';

const GlobalStyle = css`
  html,
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;

    font-family: 'Noto Sans KR', sans-serif, -apple-system, BlinkMacSystemFont,
      Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
      Helvetica Neue;
    line-height: 1.6;
    font-size: 16px;
  }
  #__next {
    position: relative;
    width: 100%;
    height: 100%;
  }
  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
