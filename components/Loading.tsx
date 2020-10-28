import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

interface RootProps {
  size: string | number;
}
const Root = styled.div<RootProps>`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;

  #loading-img {
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
  }
`;

interface Props {
  size?: number;
  children?: React.ReactNode;
}
const Loading: React.FC<Props> = ({ size = 100, children, ...props }) => {
  return (
    <Root size={size} {...props}>
      {children ?? (
        <Image
          id="loading-img"
          alt="loading..."
          src="/images/loading.gif"
          width={size}
          height={size}
        />
      )}
    </Root>
  );
};

export default Loading;
