import React, { useState } from 'react';
import { register, login } from '../api/auth.js';
import Footer from './Footer.js';

const AuthForm = ({ onAuth }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ email: '', name: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegister) {
        await register({ ...form, confirmed_password: form.password });
      }
      
      const userData = await login(form);
      // const accessToken = await login(form);
      localStorage.setItem('accessToken', userData.accessToken);
      onAuth(userData);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGuest = () => {
    localStorage.setItem('accessToken', 'guest');
    onAuth();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="name" placeholder="Имя" value={form.name} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Пароль" value={form.password} onChange={handleChange} required />
      <button type="submit">{isRegister ? 'Зарегистрироваться' : 'Войти'}</button>
      <button type="button" onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрируйтесь'}
      </button>
      <button type="button" onClick={handleGuest}>Войти как гость</button>
      <Footer />
    </form>
  );
};

export default AuthForm;
