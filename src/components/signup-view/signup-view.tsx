import React, { useState } from 'react';
import { Button, Col, Form, FormControl, FormLabel } from 'react-bootstrap';
import { ErrorResponse, User } from '../../interfaces/interfaces';
import { SIGNUP_URL } from '../../utils/api-urls';

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
        <Form.Group controlId="formUsername" className="my-4">
          <FormLabel>Username</FormLabel>
          <FormControl
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength={3}
          ></FormControl>
        </Form.Group>
        <Form.Group controlId="formEmail" className="my-4">
          <FormLabel>Email</FormLabel>
          <FormControl
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></FormControl>
        </Form.Group>
        <Form.Group controlId="formBirthday" className="my-4">
          <FormLabel>Birthday</FormLabel>
          <FormControl
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
            max={new Date().toISOString().substring(0, 10)}
          ></FormControl>
        </Form.Group>
        <Form.Group controlId="formPassword" className="my-4">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></FormControl>
        </Form.Group>
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
