import * as React from 'react';
import { FormEvent, useState } from 'react';
import { Form } from 'react-bootstrap';
import { AlertBox } from '../../components/alerts/alerts';
import { SubmitButton } from '../../components/layout/buttons';
import FormCard from '../../components/layout/form-card';
import { PasswordInput, UsernameInput } from '../../components/layout/forms';
import MainWrapper from '../../components/layout/main-wrapper';
import { User } from '../../interfaces/interfaces';
import { useAppDispatch } from '../../redux/hooks';
import { setToken } from '../../redux/reducers/token';
import { setUser } from '../../redux/reducers/user';
import { buildLoginUrl } from '../../utils/api-urls';

interface LoginResponse {
  user?: User;
  token?: string;
}

const LoginView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState<string>('');
  const onAlertClose = () => setAlert('');
  const dispatch = useAppDispatch();

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
