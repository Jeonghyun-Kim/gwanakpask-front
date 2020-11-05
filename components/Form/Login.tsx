import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import fetcher from '../../lib/fetcher';

const Root = styled.form`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  max-width: min(800px, 90%);

  .MuiTextField-root {
    margin: 5px 0;
  }

  .submit-button {
    margin: 10px 0 10px auto;
    width: 100px;

    span.MuiButton-label {
      color: white;
    }
  }

  .response {
    margin: 10px 0;
  }
`;

const defaultInputs = {
  username: '',
  password: '',
};

interface props {
  onSuccess: () => void;
  redirectTo?: string;
}
const ArtworkForm: React.FC<props> = ({
  onSuccess,
  redirectTo = '/admin',
  ...props
}) => {
  const router = useRouter();
  const [inputs, setInputs] = React.useState<{
    username: string;
    password: string;
  }>(defaultInputs);
  const [res, setRes] = React.useState<string>('');

  const handleSubmit = React.useCallback(async () => {
    if (!inputs.username) {
      setRes('아이디를 입력해주세요.');
    } else if (!inputs.password) {
      setRes('비밀번호를 입력해주세요.');
    } else {
      const response = await fetcher('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      });
      const { error } = response;
      if (error) {
        setRes(error.message);
      } else {
        onSuccess();
        router.push(redirectTo);
      }
    }
  }, [inputs, redirectTo, router, onSuccess]);

  return (
    <Root {...props}>
      <TextField
        label="Username"
        name="username"
        type="text"
        placeholder=""
        value={inputs.username}
        onChange={(e) => {
          setInputs({
            ...inputs,
            username: e.target.value,
          });
        }}
        inputProps={{
          maxLength: 10,
          required: true,
        }}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        placeholder=""
        value={inputs.password}
        onChange={(e) => {
          setInputs({
            ...inputs,
            password: e.target.value,
          });
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSubmit();
        }}
        inputProps={{
          maxLength: 20,
          required: true,
        }}
      />
      <Button
        className="submit-button"
        variant="contained"
        color="primary"
        onClick={() => handleSubmit()}>
        Submit
      </Button>
      <div className="response">{res}</div>
    </Root>
  );
};

export default ArtworkForm;
