const BASE_URL = 'http://127.0.0.1:8000';

export const register = async ({ email, name, password, confirmed_password }) => {
  const res = await fetch(`${BASE_URL}/api/v1/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, name, password, confirmed_password }),
  });

  console.log("register");
  console.log({email, name, password, confirmed_password});

  if (!res.ok) {
    console.log('is not ok');
    const error = await res.json();
    throw new Error(`${error.detail} Ошибка регистрации`);
  }

  return res.json();
};

export const login = async ({ email, name, password }) => {
  const res = await fetch(`${BASE_URL}/api/v1/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, name, password }),
  });

  console.log("login");
  console.log({ email, name, password});

  if (!res.ok) {
    const error = await res.json();
    throw new Error(`${error.detail} Ошибка входа`);
  }

  return res.json();
};

export const refreshToken = async () => {
  const response = await fetch('http://127.0.0.1:8000/api/v1/refresh', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    //   Accept: 'application/json',
    },
  });

  console.log("Response refresh");
  console.log(response);

  if (!response.ok) {
    throw new Error('Не удалось обновить токен');
  }

  const newAccessToken = await response.json();
  return newAccessToken;
};
