const BASE_URL = 'http://127.0.0.1:8000';

export const searchTrains = async ({ from_code, to_code, date }) => {
  console.log(JSON.stringify({from_code, to_code, date}));
  const response = await fetch(`${BASE_URL}/api/v1/trains/get_trains`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ from_code, to_code, date }),
  });
  
  if (!response.ok) {
    throw new Error('Ошибка при загрузке поездов');
  }

  const data = await response.json();
  console.log(data);
  return data;
};

export const getTrainDetails = async ({
  from_code,
  to_code,
  date,
  train_number,
  departure_time,
  arrival_time, // <-- добавим сюда
}) => {
  const train_request = { from_code, to_code, date };

  console.log(JSON.stringify({ train_request, train_number, departure_time, arrival_time }));

  const response = await fetch(`${BASE_URL}/api/v1/trains/get_seats`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      train_request,
      train_number,
      departure_time,
      arrival_time, // <-- добавим это в JSON
    }),
  });

  if (!response.ok) {
    throw new Error('Ошибка при получении информации о местах');
  }
  const data = await response.json();
  console.log(data);
  return data;
};

export const login = async ({ username, password }) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Ошибка при входе');
  }

  return await response.json();
};

export const guestLogin = async () => {
  return Promise.resolve({
    user: {
      username: 'Гость',
      guest: true,
    },
  });
};