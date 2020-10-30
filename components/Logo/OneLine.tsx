import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import SvgIcon from '@material-ui/core/SvgIcon';
import LogoIcon from '../../public/images/logo/logo-one-line.svg';

interface RootProps {
  color: string;
}
const Root = styled.div<RootProps>`
  width: calc(100% - 10px);
  margin: 0 auto;
  .logo-one-line {
    color: ${(props) => props.color};
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
  color?: string;
}
const OneLineLogo: React.FC<props> = ({ href, color = 'white', ...props }) => {
  const router = useRouter();

  return (
    <Root
      className={`logo ${href ? 'clickable' : ''}`}
      color={color}
      role={href ? 'button' : ''}
      tabIndex={href ? 0 : -1}
      onKeyDown={(e) => {
        if (href && e.key === 'Enter') router.push(href);
      }}
      onClick={(e) => {
        if (href) router.push(href);
        e.currentTarget.blur();
      }}
      {...props}>
      <Logo />
    </Root>
  );
};

export default OneLineLogo;
