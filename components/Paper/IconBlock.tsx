import React from 'react';
import styled from 'styled-components';

import TemplateIcon from './TemplateIcon';

const Root = styled.div`
  text-align: center;
`;

interface props {
  templateId: number;
  setTemplateId: (id: number) => void;
  setPreviewId: (id: number | null) => void;
}
const IconBlock: React.FC<props> = ({
  templateId,
  setTemplateId,
  setPreviewId,
  ...props
}) => (
  <Root {...props}>
    {Array.from({ length: 8 }, () => 0).map((_, index) => (
      <TemplateIcon
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        templateId={index}
        setTemplateId={setTemplateId}
        current={templateId}
        setPreviewId={setPreviewId}
      />
    ))}
  </Root>
);

export default IconBlock;
