import { useState } from 'react';
import { composeLoginUrl } from '../../utils/api-urls';

const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const loginUrl = composeLoginUrl(username, password);

    fetch(loginUrl, { method: 'POST' })
      .then((response) => response.json())
      .then((data) => {
        if (data.user && data.token) {
          onLoggedIn(data.user, data.token);
        } else {
          alert('Invalid credentials');
        }
      })
      .catch((err) => console.error(err));
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
              minLength="3"
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
          <button type="submit" onSubmit={handleSubmit}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginView;
