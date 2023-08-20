import * as React from 'react';
import { FormEvent, useState } from 'react';
import { Form } from 'react-bootstrap';
import { AlertBox } from '../../components/alert-box/alert-box';
import FormCard from '../../components/cards/form-card';
import { PasswordInput, UsernameInput } from '../../components/forms/forms';
import { SubmitButton } from '../../components/buttons/buttons';
import MainWrapper from '../../components/layout/main-wrapper';
import { AlertContent, User } from '../../types/interfaces';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectLoginAlert,
  setLoginAlert,
} from '../../redux/reducers/loginAlert';
import { setToken } from '../../redux/reducers/token';
import { setUser } from '../../redux/reducers/user';
import { LOGIN_FAILED } from '../../utils/alert-content';
import { buildLoginUrl } from '../../utils/urls';

interface LoginResponse {
  user?: User;
  token?: string;
}

const LoginView = () => {
  // Keeps track of alerts sent by other components before a redirect to login page
  const loginAlert = useAppSelector(selectLoginAlert);
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState<AlertContent | null>(loginAlert);

  // Reset loginAlert
  dispatch(setLoginAlert(null));

  const handleLogin = (dataUser: User, dataToken: string) => {
    dispatch(setUser(dataUser));
    localStorage.setItem('user', JSON.stringify(dataUser));
    dispatch(setToken(dataToken));
    localStorage.setItem('token', JSON.stringify(dataToken));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loginUrl = buildLoginUrl(username, password);

    fetch(loginUrl, { method: 'POST' })
      .then((response) => response.json())
      .then(({ user, token }: LoginResponse) => {
        if (user && token) {
          handleLogin(user, token);
        } else {
          setUsername('');
          setPassword('');
          setAlert(LOGIN_FAILED);
        }
      })
      .catch((err: Error) => console.error(err));
  };
  return (
    <MainWrapper>
      <AlertBox alert={alert} onClose={() => setAlert(null)} />
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
