import React, { useState } from 'react';
import { AuthProvider, useAuth } from './auth/AuthContext';
import SearchForm from './components/SearchForm';
import TrainResults from './components/TrainResults';
import LoginForm from './components/LoginForm';
import { searchTrains } from './api/api'; // НЕ забудь импортировать функцию!

const MainApp = () => {
  const { user } = useAuth();
  const [results, setResults] = useState([]);
  const [fromCode, setFromCode] = useState('');
  const [toCode, setToCode] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchMeta) => {
    try {
      setLoading(true);

      const data = await searchTrains({
        from_code: searchMeta.from_code,
        to_code: searchMeta.to_code,
        date: searchMeta.date,
      });

      setResults(data);
      setFromCode(searchMeta.from_code);
      setToCode(searchMeta.to_code);
      setSelectedDate(searchMeta.date);
    } catch (error) {
      console.error('Ошибка при загрузке поездов:', error);
      alert('Не удалось загрузить поезда');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <LoginForm />;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Поиск поездов {user?.guest ? '(Гость)' : ''}</h1>

      <SearchForm
        onSearch={(data, meta) => {
          // Поменяем вызов на новый формат
          handleSearch(meta);
        }}
      />

      {loading && <p>Загрузка поездов...</p>}

      {!loading && (
        <TrainResults
          results={results}
          fromCode={fromCode}
          toCode={toCode}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <MainApp />
  </AuthProvider>
);

export default App;
