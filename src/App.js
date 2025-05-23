import React, { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './auth/AuthContext';
import SearchForm from './components/SearchForm';
import TrainResults from './components/TrainResults';
import LoginForm from './components/LoginForm';
import Footer from './components/Footer';
import { login, refreshToken } from './api/auth';

const MainApp = () => {
  const { user, login } = useAuth();
  const [results, setResults] = useState([]);
  const [fromCode, setFromCode] = useState('');
  const [toCode, setToCode] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const checkRefresh = async () => {
      try {
        const access = await refreshToken();
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (access && storedUser) {
          login({ ...storedUser, accessToken: access });
        }
      } catch (err) {
        console.warn('Не удалось обновить токен');
      } finally {
        setAuthLoading(false);
      }
    };
    checkRefresh();
  }, [login]);

  const handleAuth = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const accessToken = localStorage.getItem('accessToken');
    console.log('Current user:', user);

    if (storedUser && accessToken) {
      login({ ...storedUser, accessToken });
    } else {
      login(null);
    }
  };

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

  if (authLoading) return <p>Загрузка...</p>;

  if (!user) return <LoginForm onAuth={login} />;

  

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
