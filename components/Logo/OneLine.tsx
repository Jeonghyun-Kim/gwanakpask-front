import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import SvgIcon from '@material-ui/core/SvgIcon';
import LogoIcon from '../../public/images/logo/logo-one-line.svg';

const Root = styled.div`
  width: calc(100% - 10px);
  margin: 0 auto;
  .logo-one-line {
    width: 100%;
    height: auto;
  }

  &.clickable {
    .logo-one-line {
      cursor: pointer;
    }
  }
`;

const Logo: React.FC = ({ ...props }) => (
  <SvgIcon
    className="logo-one-line"
    component={LogoIcon}
    viewBox="0 0 2612 581"
    {...props}
  />
);

interface props {
  href?: string;
}
const OneLineLogo: React.FC<props> = ({ href, ...props }) => {
  const router = useRouter();

  return (
    <Root
      className={`${href ? 'clickable' : ''}`}
      onClick={() => {
        if (href) router.push(href);
      }}
      {...props}>
      <Logo />
    </Root>
  );
};

export default OneLineLogo;
