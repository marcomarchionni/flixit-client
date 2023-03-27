import * as React from 'react';
import { FormEvent, useState } from 'react';
import { Form } from 'react-bootstrap';
import { User } from '../../interfaces/interfaces';
import { buildLoginUrl } from '../../utils/api-urls';
import { AlertBox } from '../../components/alerts/alerts';
import { SubmitButton } from '../../components/layout/buttons';
import FormCard from '../../components/layout/form-card';
import { PasswordInput, UsernameInput } from '../../components/layout/forms';
import MainWrapper from '../../components/layout/main-wrapper';

interface LoginProps {
  onLoggedIn: (user: User, token: string) => void;
}

interface LoginResponse {
  user?: User;
  token?: string;
}

const LoginView = ({ onLoggedIn }: LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState<string>('');
  const onAlertClose = () => setAlert('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loginUrl = buildLoginUrl(username, password);

    fetch(loginUrl, { method: 'POST' })
      .then((response) => response.json())
      .then(({ user, token }: LoginResponse) => {
        if (user && token) {
          onLoggedIn(user, token);
        } else {
          setUsername('');
          setPassword('');
          setAlert('InvalidLogin');
        }
      })
      .catch((err: Error) => console.error(err));
  };
  return (
    <MainWrapper>
      <AlertBox alert={alert} onClose={onAlertClose} />
      <FormCard title="Login">
        <Form onSubmit={handleSubmit}>
          <UsernameInput
            value={username}
            handleValueChange={(e) => setUsername(e.target.value)}
          />
          <PasswordInput
            value={password}
            handleValueChange={(e) => setPassword(e.target.value)}
          />
          <FormCard.Buttons>
            <SubmitButton label="Login" />
          </FormCard.Buttons>
          <FormCard.Link to="/signup">
            Not registered yet? Create a new account!
          </FormCard.Link>
        </Form>
      </FormCard>
    </MainWrapper>
  );
};

export default LoginView;
