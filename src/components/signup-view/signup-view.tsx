import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { ErrorResponse, User } from '../../interfaces/interfaces';
import { SIGNUP_URL } from '../../utils/api-urls';
import {
  BirthdayInput,
  EmailInput,
  PasswordInput,
  UsernameInput,
} from '../form-elements/forms-elements';

const SignupView = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: User = {
      username,
      email,
      birthday,
      password,
    };

    fetch(SIGNUP_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (response.ok) {
          alert('Signup successful. Please login.');
          window.location.reload();
        } else {
          return response.json().then((data: ErrorResponse) => {
            const failureReason = data.message ? `. ${data.message}.` : '';
            alert(`Signup failed${failureReason}`);
          });
        }
      })
      .catch((err: Error) => console.error(err));
  };

  return (
    <Col sm={6}>
      <Form
        onSubmit={handleSubmit}
        className="border border-secondary rounded-4 p-4"
      >
        <h2 className="text-center">Signup</h2>
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
        <div className="d-flex justify-content-center pt-2">
          <Button variant="secondary" type="submit">
            Signup
          </Button>
        </div>
      </Form>
    </Col>
  );
};

export default SignupView;
