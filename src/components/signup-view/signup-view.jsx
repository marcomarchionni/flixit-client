import { useState } from 'react';
import { SIGNUP_URL } from '../../utils/api-urls';

const SignupView = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
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
          return response.json().then((data) => {
            console.log(data);
            const message = data.message ? `. ${data.message}.` : '';
            alert(`Signup failed${message}`);
          });
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Signup</h2>
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
            ></input>
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
          </label>
        </div>
        <div>
          <label>
            Birthday:
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            ></input>
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
            ></input>
          </label>
        </div>
        <div>
          <button type="submit">Signup</button>
        </div>
      </form>
    </div>
  );
};

export default SignupView;
