import React, { useState } from 'react';
import { AuthProvider, useAuth } from './auth/AuthContext';
import SearchForm from './components/SearchForm';
import TrainResults from './components/TrainResults';
import LoginForm from './components/LoginForm';
import Footer from './components/Footer';

const MainApp = () => {
  const { user } = useAuth();
  const [results, setResults] = useState([]);
  const [fromCode, setFromCode] = useState('');
  const [toCode, setToCode] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (dataOrFunc, searchMeta) => {
    if (typeof dataOrFunc === 'function') {
      setLoading(true);
      return;
    }

    setResults(dataOrFunc);
    if (searchMeta) {
      setFromCode(searchMeta.from_code);
      setToCode(searchMeta.to_code);
      setSelectedDate(searchMeta.date);
    }
    setLoading(false);
  };

  if (!user) return <LoginForm />;

  return (
    <div style={{ padding: '20px', maxWidth: 800, margin: '0 auto' }}>
      <h1>Поиск поездов {user?.guest ? '(Гость)' : ''}</h1>
      <SearchForm onSearch={handleSearch} />
      {loading ? (
        <p style={{ textAlign: 'center' }}>Загрузка поездов...</p>
      ) : (
        <TrainResults
          results={results}
          fromCode={fromCode}
          toCode={toCode}
          selectedDate={selectedDate}
        />
      )}
       <Footer />
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <MainApp />
  </AuthProvider>
);

export default App;
