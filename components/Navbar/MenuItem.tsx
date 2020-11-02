import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';

export const MenuRoot = styled.a`
  margin: 25px 0;
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
  color: #7d7d7d;
  cursor: pointer;
  &:hover,
  &:focus {
    opacity: 0.7;
  }
  &.current {
    font-weight: 700;
    color: white;
    /* color: black; */
    opacity: 1;
  }
`;

interface props {
  title: string;
  href: string;
  currentPaths?: string[];
}
const NavbarMenuItem: React.FC<props> = ({
  title,
  href,
  currentPaths = [href],
  ...props
}) => {
  const router = useRouter();

  return (
    <Link href={href}>
      <MenuRoot
        className={`${
          currentPaths.find((path) => path === router.pathname) ? 'current' : ''
        }`}
        role="button"
        tabIndex={0}
        onClick={(e) => e.currentTarget.blur()}
        onKeyDown={(e) => {
          if (e.key === 'Enter') router.push(href);
        }}
        {...props}>
        {title}
      </MenuRoot>
    </Link>
  );
};

export default NavbarMenuItem;
