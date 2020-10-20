import React from 'react';
import styled from 'styled-components';

import AppContext from '../../AppContext';

import { styles } from './style';

const Root = styled.div`
  display: inline-block;
  width: 300px;
  height: 320px;
  box-shadow: rgba(0, 0, 0, 0.15) 6px 6px 16px;
  border-radius: 5px;
  padding: 16px;
  .from {
    font-size: 1rem;
    margin: 20px 0;
  }
  .content-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .content {
      font-size: 1.125rem;
    }
  }
  &.big {
    width: 406px;
    height: 425px;
    border-radius: 8px;
    padding: 20px;
    .content {
      font-size: 1.56rem;
    }
  }
`;

interface props {
  templateId: number;
  from: string;
  content: string;
}
const Paper: React.FC<props> = ({ templateId, from, content, ...props }) => {
  const { withLayout } = React.useContext(AppContext);

  return (
    <Root
      className={`${withLayout ? 'big' : ''}`}
      style={styles[templateId]}
      {...props}>
      <p className="from kyobo">From. {from}</p>
      <div className="content-box">
        <p className="content kyobo">{content}</p>
      </div>
    </Root>
  );
};

export default Paper;
