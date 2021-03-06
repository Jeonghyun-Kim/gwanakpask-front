import React from 'react';
import styled from 'styled-components';

import KyoboFont from '../KyoboFont';

import AppContext from '../../AppContext';

import { styles } from './style';

const Root = styled.div`
  display: inline-block;
  width: 300px;
  height: 320px;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.15) 6px 6px 16px;
  border-radius: 5px;
  padding: 16px;
  overflow: hidden;
  .from {
    font-size: 1rem;
    margin: 10px 0;
  }
  .content-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-height: 290px;
    .content {
      font-size: 1.125rem;
      margin: 5px 0;
    }
  }
  &.big {
    width: 406px;
    height: 425px;
    border-radius: 8px;
    padding: 20px;
    .content-box {
      max-height: 395px;
      .content {
        font-size: 1.56rem;
      }
    }
  }
  ${KyoboFont}
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
      className={`paper ${withLayout ? 'big' : ''}`}
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
