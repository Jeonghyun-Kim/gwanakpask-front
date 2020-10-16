import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`;

interface Props {
  children?: React.ReactNode;
}
const Loading: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Root {...props}>
      {children ?? <img alt="loading..." src="/images/loading.gif" />}
    </Root>
  );
};

export default Loading;
