import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { login, guestLogin } from '../api/api';
import Footer from './Footer';

const LoginForm = () => {
  const { login: setUser } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await login({ username, password });
      setUser(response.user);
    } catch (err) {
      console.error('Ошибка входа:', err);
      setError('Неверный логин или пароль');
    }
  };

  const handleGuestLogin = async () => {
    try {
      const response = await guestLogin();
      setUser(response.user);
    } catch (err) {
      console.error('Ошибка гостевого входа:', err);
      setError('Ошибка при входе как гость');
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 300, margin: 'auto' }}>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Логин"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            placeholder="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Войти</button>
      </form>

      <hr />

      <button onClick={handleGuestLogin}>Войти как гость</button>
      <Footer />
    </div>
  );
};

export default LoginForm;
