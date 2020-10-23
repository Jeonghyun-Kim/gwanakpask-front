import React from 'react';
import Link from 'next/link';

import Logo from '../Logo/Squared';

import { HeaderRoot, MenuItemRoot } from './styles';

interface MenuItemProps {
  href: string;
  title: string;
}
const MenuItem: React.FC<MenuItemProps> = ({ href, title, ...props }) => {
  return (
    <MenuItemRoot {...props}>
      <Link href={href}>
        <a>
          <span className="menu-item-title">{title}</span>
        </a>
      </Link>
    </MenuItemRoot>
  );
};

const Header: React.FC = ({ ...props }) => {
  return (
    <HeaderRoot {...props}>
      <div className="header-content">
        <Logo />
        <div className="grow" />
        <MenuItem href="/intro" title="전시소개" />
        <MenuItem href="/ovr/list" title="전시장" />
        <MenuItem href="/visitor" title="방명록" />
      </div>
    </HeaderRoot>
  );
};

export default Header;
