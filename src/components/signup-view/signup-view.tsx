import React, { useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { ErrorResponse } from '../../interfaces/interfaces';
import { USERS_URL } from '../../utils/api-urls';
import { SignupSuccessAlert } from '../basic-components/alerts';
import { SubmitButton } from '../basic-components/buttons';
import {
  BirthdayInput,
  EmailInput,
  PasswordInput,
  UsernameInput,
} from '../basic-components/forms';

const SignupView = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

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
          setShowSuccessAlert(true);
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
    <Row>
      <Col Col sm={6} className="mx-auto pt-4 mt-4">
        <Card className="p-4">
          <Card.Title className="text-center fi-bigger-card-title">
            Signup
          </Card.Title>
          {showSuccessAlert && (
            <SignupSuccessAlert
              handleClose={() => setShowSuccessAlert(false)}
            />
          )}
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
            <SubmitButton label="Signup" />
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default SignupView;
