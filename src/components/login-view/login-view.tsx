import * as React from 'react';
import { FormEvent, useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { User } from '../../interfaces/interfaces';
import { composeLoginUrl } from '../../utils/api-urls';
import { InvalidLoginAlert } from '../basic-components/alerts';
import { SubmitButton } from '../basic-components/buttons';
import { PasswordInput, UsernameInput } from '../basic-components/forms';

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
  const [showInvalidLoginAlert, setShowInvalidLoginAlert] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loginUrl = composeLoginUrl(username, password);

    fetch(loginUrl, { method: 'POST' })
      .then((response) => response.json())
      .then((data: LoginResponse) => {
        if (data.user && data.token) {
          onLoggedIn(data.user, data.token);
        } else {
          setUsername('');
          setPassword('');
          setShowInvalidLoginAlert(true);
        }
      })
      .catch((err: Error) => console.error(err));
  };
  return (
    <Row className="my-4">
      <Col sm={6} className="mx-auto">
        <Card className="p-4">
          <Card.Title className="text-center fi-bigger-card-title">
            Login
          </Card.Title>
          {showInvalidLoginAlert && (
            <InvalidLoginAlert
              handleClose={() => setShowInvalidLoginAlert(false)}
            />
          )}
          <Form onSubmit={handleSubmit}>
            <UsernameInput
              value={username}
              handleValueChange={(e) => setUsername(e.target.value)}
            />
            <PasswordInput
              value={password}
              handleValueChange={(e) => setPassword(e.target.value)}
            />
            <div className="d-flex justify-content-center">
              <SubmitButton label="Login" />
            </div>
            <div className="d-flex justify-content-center my-2">
              <Link to="/signup">
                Not registered yet? Create a new account!
              </Link>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginView;
