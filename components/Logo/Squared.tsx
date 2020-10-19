import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import SvgIcon from '@material-ui/core/SvgIcon';
import LogoIcon from '../../public/images/logo/logo-squared-with-dot.svg';

const Root = styled.div`
  .logo-squared {
    font-size: 20rem;
  }
`;

const Logo: React.FC = ({ ...props }) => (
  <SvgIcon
    className="logo-squared"
    component={LogoIcon}
    viewBox="0 0 20000 2000"
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
      suppressHydrationWarning
      className={`${href ? '' : 'disabled'}`}
      onClick={() => {
        if (href) router.push(href);
      }}
      {...props}>
      <Logo />
    </Root>
  );
};

export default SquaredLogo;
