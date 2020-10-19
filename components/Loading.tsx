import React from 'react';
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
    width: ${(props) => props.size};
    height: ${(props) => props.size};
  }
`;

interface Props {
  size?: string | number;
  children?: React.ReactNode;
}
const Loading: React.FC<Props> = ({ size = '100px', children, ...props }) => {
  return (
    <Root size={size} {...props}>
      {children ?? (
        <img id="loading-img" alt="loading..." src="/images/loading.gif" />
      )}
    </Root>
  );
};

export default Loading;
