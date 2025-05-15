import React, { useState } from 'react';
import { fakeApi } from '../api/api';
import { useAuth } from '../auth/AuthContext';

const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await fakeApi.login({ email, password });
      login({ ...data.user, token: data.token });
    } catch (err) {
      setError('Неверный логин или пароль');
    }
  };

  const handleGuestLogin = () => {
    login({ guest: true });
  };

  return (
    <div>
      <h2>Вход</h2>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Войти</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <hr />
      <button onClick={handleGuestLogin}>Войти как гость</button>
    </div>
  );
};

export default LoginForm;
