import React, { useState } from 'react';
import { AuthProvider, useAuth } from './auth/AuthContext';
import SearchForm from './components/SearchForm';
import TrainResults from './components/TrainResults';
import LoginForm from './components/LoginForm';

const MainApp = () => {
  const { user } = useAuth();
  const [results, setResults] = useState([]);
  const [fromCode, setFromCode] = useState('');
  const [toCode, setToCode] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const handleSearch = (data, searchMeta) => {
    setResults(data);
    setFromCode(searchMeta.from_code);
    setToCode(searchMeta.to_code);
    setSelectedDate(searchMeta.date);
  };

  if (!user) return <LoginForm />;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Поиск поездов {user?.guest ? '(Гость)' : ''}</h1>
      <SearchForm onSearch={handleSearch} />
      <TrainResults
        results={results}
        fromCode={fromCode}
        toCode={toCode}
        selectedDate={selectedDate}
      />
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <MainApp />
  </AuthProvider>
);

export default App;
