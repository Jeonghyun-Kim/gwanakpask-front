import React from 'react';
import styled from 'styled-components';

import TextField from '@material-ui/core/TextField';

import AppContext from '../../AppContext';

const Root = styled.div`
  width: 100%;
  margin: 20px auto;
  max-width: 300px;
  .MuiTextField-root {
    margin: 10px 0;
  }
  &.withLayout {
    max-width: 406px;
  }
`;

interface props {
  from: string;
  setFrom: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}
const MessageForm: React.FC<props> = ({
  from,
  setFrom,
  content,
  setContent,
  ...props
}) => {
  const { withLayout } = React.useContext(AppContext);

  return (
    <Root className={withLayout ? 'withLayout' : ''} {...props}>
      <TextField
        label="보내는 사람"
        name="name"
        type="text"
        placeholder="성함을 적어주세요"
        variant="outlined"
        fullWidth
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        onBlur={(e) => setFrom(e.target.value.trim())}
        inputProps={{
          maxLength: 10,
          required: true,
        }}
      />
      <TextField
        label="내용"
        name="name"
        type="text"
        placeholder="작가님께 전하고 싶은 내용을 적어주세요 (180자 제한)"
        variant="outlined"
        fullWidth
        multiline
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onBlur={(e) => setContent(e.target.value.trim())}
        inputProps={{
          maxLength: 150,
          required: true,
          rows: 8,
        }}
      />
    </Root>
  );
};

export default MessageForm;
