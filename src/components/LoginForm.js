import React, { useState } from 'react';
import { register, login } from '../api/auth.js';
import Footer from './Footer.js';
import styles from './LoginForm.module.css';

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

  // const handleGuest = () => {
  //   localStorage.setItem('accessToken', 'guest');
  //   onAuth();
  // };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.logo}>SeatTrack</h1>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.title}>
            {isRegister ? 'Регистрация' : 'Вход'}
          </h2>
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            name="name"
            placeholder="Имя"
            value={form.name}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            name="password"
            type="password"
            placeholder="Пароль"
            value={form.password}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            {isRegister ? 'Зарегистрироваться' : 'Войти'}
          </button>
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className={styles.toggleButton}
          >
            {isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрируйтесь'}
          </button>
          {/* <button type="button" onClick={handleGuest} className={styles.guestButton}> */}
            {/* Войти как гость */}
          {/* </button> */}
          <Footer />
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
