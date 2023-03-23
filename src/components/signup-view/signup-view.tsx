import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { ErrorResponse } from '../../interfaces/interfaces';
import { USERS_URL } from '../../utils/api-urls';
import AlertBox from '../alerts/alerts';
import { SubmitButton } from '../layout/buttons';
import FormCard from '../layout/form-card';
import {
  BirthdayInput,
  EmailInput,
  PasswordInput,
  UsernameInput,
} from '../layout/forms';
import MainWrapper from '../layout/main-wrapper';

const SignupView = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState('');
  const onAlertClose = () => setAlert('');

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
          setAlert('SignupSuccessful');
        } else {
          return response.json().then((data: ErrorResponse) => {
            const failureReason = data.message ? `. ${data.message}.` : '';
            console.error(failureReason);
            setAlert('SignupFailed');
          });
        }
      })
      .catch((err: Error) => console.error(err));
  };

  return (
    <MainWrapper size="large">
      <AlertBox alert={alert} onClose={onAlertClose} />
      <FormCard title="Signup">
        <Form
          onSubmit={handleSubmit}
          // className="border border-secondary rounded-4 p-4 bg-light"
        >
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
