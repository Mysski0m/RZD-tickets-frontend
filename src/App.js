import React, { useState } from 'react';
import { AuthProvider, useAuth } from './auth/AuthContext';
import SearchForm from './components/SearchForm';
import TrainResults from './components/TrainResults';
import LoginForm from './components/LoginForm';

const MainApp = () => {
  const { user } = useAuth();
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState(null); // добавили хранение фильтров

  if (!user) return <LoginForm />;

  const handleSearch = (newResults, appliedFilters) => {
    setResults(newResults);
    setFilters(appliedFilters); // сохраняем фильтры
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Поиск поездов {user?.guest ? '(Гость)' : ''}</h1>
      <SearchForm onSearch={handleSearch} />
      <TrainResults results={results} filters={filters} />
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <MainApp />
  </AuthProvider>
);

export default App;
