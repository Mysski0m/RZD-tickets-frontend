import React, { useState } from 'react';
import { searchTrains, getStationCodeByName } from '../api/api';
import styles from './SearchForm.module.css';

const SearchForm = ({ onSearch }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      onSearch(() => {});
      const from_code = await getStationCodeByName(from.trim());
      const to_code = await getStationCodeByName(to.trim());
      const formattedDate = new Date(date).toLocaleDateString('ru-RU');

      const results = await searchTrains({ from_code, to_code, date: formattedDate });

      onSearch(results, { from_code, to_code, date: formattedDate });
    } catch (err) {
      alert('Неверно введен город отправления и/или назначения');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>
        Откуда:
        <input
          className={styles.input}
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          required
        />
      </label>
      <label className={styles.label}>
        Куда:
        <input
          className={styles.input}
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
      </label>
      <label className={styles.label}>
        Дата:
        <input
          className={styles.input}
          type="date"
          value={
            date instanceof Date
              ? date.toISOString().substring(0, 10)
              : date
          }
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>
      <button type="submit" className={styles.button}>Найти</button>
    </form>
  );
};

export default SearchForm;
