import React from 'react';
import styled from 'styled-components';

import { styles } from './style';

const Root = styled.div`
  position: relative;
  margin: 10px 9px;
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid #9a9a9a;
  cursor: pointer;
  transition: 400ms ease;
  .circle {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% + 8px);
    height: calc(100% + 8px);
    border-radius: 50%;
    border: 1px solid #9a9a9a;
    &.selected {
      display: block;
    }
  }
  &:hover {
    transform: scale(1.2);
    .circle {
      display: block;
    }
  }
`;

interface props {
  templateId: number;
  setTemplateId: (id: number) => void;
  selected: boolean;
}
const TemplateIcon: React.FC<props> = ({
  templateId,
  setTemplateId,
  selected,
  ...props
}) => (
  <Root
    style={styles[templateId]}
    tabIndex={0}
    role="button"
    onClick={(e) => {
      setTemplateId(templateId);
      e.currentTarget.blur();
    }}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        setTemplateId(templateId);
        e.currentTarget.blur();
      }
    }}
    {...props}>
    <div className={`circle ${selected ? 'selected' : ''}`} />
  </Root>
);

export default TemplateIcon;
