import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { AlertContent, ErrorResponse } from '../../interfaces/interfaces';
import { USERS_URL } from '../../utils/urls';
import { AlertBox } from '../../components/alert-box/alert-box';
import { SubmitButton } from '../../components/buttons/buttons';
import FormCard from '../../components/cards/form-card';
import {
  BirthdayInput,
  EmailInput,
  PasswordInput,
  UsernameInput,
} from '../../components/forms/forms';
import MainWrapper from '../../components/layout/main-layout';
import { SIGNUP_FAILED, SIGNUP_SUCCESS } from '../../utils/alert-content';

const SignupView = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState<AlertContent | null>(null);

  const resetFields = () => {
    setUsername('');
    setEmail('');
    setBirthday('');
    setPassword('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      username,
      email,
      birthday,
      password,
    };

    fetch(USERS_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (response.ok) {
          resetFields();
          setAlert(SIGNUP_SUCCESS);
        } else {
          return response.json().then((data: ErrorResponse) => {
            const failureReason = data.message ? `. ${data.message}.` : '';
            console.error(failureReason);
            setAlert(SIGNUP_FAILED);
          });
        }
      })
      .catch((err: Error) => console.error(err));
  };

  return (
    <MainWrapper>
      <AlertBox alert={alert} onClose={() => setAlert(null)} />
      <FormCard title="Signup">
        <Form onSubmit={handleSubmit}>
          <UsernameInput
            value={username}
            handleValueChange={(e) => setUsername(e.target.value)}
          />
          <EmailInput
            value={email}
            handleValueChange={(e) => setEmail(e.target.value)}
          />
          <BirthdayInput
            value={birthday}
            handleValueChange={(e) => setBirthday(e.target.value)}
          />
          <PasswordInput
            value={password}
            handleValueChange={(e) => setPassword(e.target.value)}
          />
          <FormCard.Buttons>
            <SubmitButton label="Signup" />
          </FormCard.Buttons>
        </Form>
      </FormCard>
    </MainWrapper>
  );
};

export default SignupView;
