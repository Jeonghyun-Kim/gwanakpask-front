import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import SvgIcon from '@material-ui/core/SvgIcon';
import LogoIcon from '../../public/images/logo/logo-squared-with-dot.svg';

const Root = styled.div`
  height: calc(100% - 16px);
  .logo-squared {
    height: 100%;
    width: auto;
  }

  &.clickable {
    .logo-squared {
      cursor: pointer;
    }
  }
`;

const Logo: React.FC = ({ ...props }) => (
  <SvgIcon
    className="logo-squared"
    component={LogoIcon}
    viewBox="0 0 2000 2000"
    {...props}
  />
);

interface props {
  href?: string;
}
const SquaredLogo: React.FC<props> = ({ href, ...props }) => {
  const router = useRouter();

  return (
    <Root
      className={`logo ${href ? 'clickable' : ''}`}
      onClick={() => {
        if (href) router.push(href);
      }}
      {...props}>
      <Logo />
    </Root>
  );
};

export default SquaredLogo;
