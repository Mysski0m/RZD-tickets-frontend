import React, { useState } from 'react';
import { fakeApi } from '../api/api'; // подключаем API

const SearchForm = ({ onSearch }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const allTrains = await fakeApi.getTrains();

      const normalize = (s) => (s || '').trim().toLowerCase();

      const filtered = allTrains.filter((train) =>
        (!from || normalize(train.from) === normalize(from)) &&
        (!to || normalize(train.to) === normalize(to)) &&
        (!date || train.date === date)
      );

      onSearch(filtered, { from, to, date });

    } catch (error) {
      console.error('Ошибка при получении поездов:', error);
      onSearch([], { from, to, date });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <div>
        <label>Откуда: </label>
        <input type="text" value={from} onChange={(e) => setFrom(e.target.value)} />
      </div>
      <div>
        <label>Куда: </label>
        <input type="text" value={to} onChange={(e) => setTo(e.target.value)} />
      </div>
      <div>
        <label>Дата: </label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <button type="submit">Найти</button>
    </form>
  );
};

export default SearchForm;
