import { css } from 'styled-components';

const KyoboFont = css`
  @font-face {
    font-family: 'Kyobo';
    font-weight: 400;
    src: local('Kyobo'), url('/fonts/Kyobo.woff') format('woff'),
      url('/fonts/Kyobo.ttf') format('truetype');
  }
  .kyobo {
    font-family: 'Kyobo', 'Noto Sans KR', sans-serif, -apple-system,
      BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
      Droid Sans, Helvetica Neue;
    font-weight: 400;
  }
`;

export default KyoboFont;
