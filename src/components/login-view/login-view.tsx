import * as React from 'react';
import { useState, FormEvent, FC} from 'react';
import { User } from '../../interfaces/interfaces';
import { composeLoginUrl } from '../../utils/api-urls';

interface LoginProps {
  onLoggedIn: Function
}

interface LoginResponse {
  user?: User,
  token?: string
}

const LoginView: FC<LoginProps> = ({ onLoggedIn }) => {
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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={3}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <button type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginView;
