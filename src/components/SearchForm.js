import React, { useState } from 'react';
import { searchTrains } from '../api/api';

const SearchForm = ({ onSearch }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(new Date());

  const handleSubmit = async (e) => {
  e.preventDefault();

  const from_code = from;
  const to_code = to;

  const formattedDate = new Date(date).toLocaleDateString('ru-RU');

  try {

    onSearch(() => {});

    const results = await searchTrains({
      from_code,
      to_code,
      date: formattedDate,
    });

    onSearch(results, {
      from_code,
      to_code,
      date: formattedDate,
    });
  } catch (err) {
    alert('Ошибка при поиске поездов');
    console.error(err);
  }
};

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20, display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
      <label>
        Откуда:{' '}
        <input
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          required
        />
      </label>
      <label>
        Куда:{' '}
        <input
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
      </label>
      <label>
        Дата:{' '}
        <input
          type="date"
          value={date instanceof Date ? date.toISOString().substring(0, 10) : date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>
      <button type="submit">Найти</button>
    </form>
  );
};

export default SearchForm;
