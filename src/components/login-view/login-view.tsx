import * as React from 'react';
import { FormEvent, useState } from 'react';
import { Button, Col, Form, FormControl, FormLabel } from 'react-bootstrap';
import { User } from '../../interfaces/interfaces';
import { composeLoginUrl } from '../../utils/api-urls';

interface LoginProps {
  onLoggedIn: Function;
}

interface LoginResponse {
  user?: User;
  token?: string;
}

const LoginView = ({ onLoggedIn }: LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loginUrl = composeLoginUrl(username, password);

    fetch(loginUrl, { method: 'POST' })
      .then((response) => response.json())
      .then((data: LoginResponse) => {
        if (data.user && data.token) {
          onLoggedIn(data.user, data.token);
        } else {
          alert('Invalid credentials');
          setUsername('');
          setPassword('');
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
        <h2 className="text-center">Login</h2>
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
        <Form.Group controlId="formBasicPassword" className="my-4">
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
            Login
          </Button>
        </div>
      </Form>
    </Col>
  );
};

export default LoginView;
