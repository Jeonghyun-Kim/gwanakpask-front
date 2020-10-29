import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { SqauredLogo as Logo } from '../Logo';

import { HeaderRoot, MenuItemRoot } from './styles';

import AppContext from '../../AppContext';

interface MenuItemProps {
  href: string;
  title: string;
}
const MenuItem: React.FC<MenuItemProps> = ({ href, title, ...props }) => {
  const router = useRouter();

  return (
    <MenuItemRoot {...props}>
      <Link href={href}>
        <a>
          <span
            className={`menu-item-title ${
              router.pathname === href && 'current'
            }`}>
            {title}
          </span>
        </a>
      </Link>
    </MenuItemRoot>
  );
};

const Header: React.FC = ({ ...props }) => {
  const { withLayout } = React.useContext(AppContext);

  if (withLayout) return <></>;

  return (
    <HeaderRoot {...props}>
      <div className="header-content">
        <Logo href="/" />
        <div className="grow" />
        <MenuItem href="/intro" title="전시소개" />
        <MenuItem href="/ovr/list" title="전시장" />
        <MenuItem href="/visitor" title="방명록" />
        <MenuItem href="/covid" title="방역" />
      </div>
    </HeaderRoot>
  );
};

export default Header;
