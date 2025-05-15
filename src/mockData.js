export const mockTrains = [
  {
    number: '001А',
    from: 'Рузаевка',
    to: 'Москва',
    date: '2025-07-17',
    departure: '08:00',
    arrival: '16:00',
    seats: [
      { id: '1A', type: 'купе', booked: false },
      { id: '1B', type: 'купе', booked: false },
      { id: '2A', type: 'плацкарт', booked: false },
      { id: '2B', type: 'плацкарт', booked: false },
      { id: '3A', type: 'люкс', booked: false },
      { id: '3B', type: 'люкс', booked: true }, // уже занято
    ]
  },
  {
    number: '002Б',
    from: 'Рузаевка',
    to: 'Москва',
    date: '2025-07-17',
    departure: '12:00',
    arrival: '20:00',
    seats: [
      { id: '1A', type: 'купе', booked: false },
      { id: '1B', type: 'купе', booked: true },
      { id: '2A', type: 'плацкарт', booked: false },
      { id: '2B', type: 'люкс', booked: false },
    ]
  }
];
