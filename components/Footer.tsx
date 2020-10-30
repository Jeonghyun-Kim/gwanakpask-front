import React from 'react';
import styled from 'styled-components';

import { OneLineLogo } from './Logo';

const Logo = styled(OneLineLogo)`
  width: 115px;
  margin: 0;
  margin-bottom: 20px;
`;

const Root = styled.section`
  padding: 50px 16px 100px 16px;
  margin: 0 auto;
  background-color: #dbdbdb;
  .info-block,
  .social-block {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }
  .info-block {
    font-size: 0.75rem;
    a {
      color: inherit;
    }
    b {
      color: #1e1e1e;
      font-weight: 400;
    }
    p {
      margin: 5px 0;
      color: #686868;
    }
  }
  .social-block {
    display: flex;
    align-items: center;
    margin-top: 20px;
    display: none;
    * {
      margin: 0 10px;
    }
    #insta-logo {
      height: 55px;
      object-fit: contain;
    }
    #youtube-logo {
      height: 40px;
      object-fit: contain;
    }
  }
  @media screen and (min-width: 600px) {
    .info-block {
      font-size: 1rem;
    }
  }
`;

const Footer: React.FC = ({ ...props }) => {
  return (
    <Root {...props}>
      <div className="info-block">
        <p>
          <b>온라인 전시 제작</b>
        </p>
        <Logo href="https://home.ondisplay.co.kr/" color="black" />
        <p>
          <b>주식회사 온디스플레이</b>
        </p>
        <p>
          <b>대표</b> 박세정
        </p>
        <p>
          <b>사업자등록번호</b> 721-86-01906
        </p>
        <p>
          <b>주소</b> 서울특별시 관악구 봉천로 373, 3층
        </p>
        <p>
          <b>홈페이지</b>{' '}
          <a
            href="https://home.ondisplay.co.kr"
            target="_blank"
            rel="noreferrer">
            https://home.ondisplay.co.kr/
          </a>
        </p>
        <p>
          <b>이메일</b>{' '}
          <a href="mailto:ondisplay.art@gmail.com">ondisplay.art@gmail.com</a>
        </p>
      </div>
      <div className="social-block">
        <a
          href="https://www.instagram.com/ondisplay.art/"
          target="_blank"
          rel="noreferrer">
          <img
            id="insta-logo"
            alt="instagram"
            src="/images/logo/instagram.png"
          />
        </a>
        <a
          href="https://www.youtube.com/channel/UCfVS6DRcZfYZchge60qyHVQ/"
          target="_blank"
          rel="noreferrer">
          <img id="youtube-logo" alt="youtube" src="/images/logo/youtube.png" />
        </a>
      </div>
    </Root>
  );
};

export default Footer;
