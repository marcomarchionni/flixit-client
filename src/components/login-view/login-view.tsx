import * as React from 'react';
import { FormEvent, useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { User } from '../../interfaces/interfaces';
import { composeLoginUrl } from '../../utils/api-urls';
import { PasswordInput, UsernameInput } from '../form-elements/forms-elements';

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
        <UsernameInput
          value={username}
          handleValueChange={(e) => setUsername(e.target.value)}
        />
        <PasswordInput
          value={password}
          handleValueChange={(e) => setPassword(e.target.value)}
        />
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
