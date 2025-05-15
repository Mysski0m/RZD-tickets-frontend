export const fakeApi = {
  getTrains: async () => {
    return [
      {
        number: '001А',
        from: 'Рузаевка',
        to: 'Москва',
        date: '2025-07-17',
        wagons: [
          {
            number: 1,
            type: 'Плацкарт',
            seats: [
              { number: 1, isUpper: false, isSide: false, bookedSegments: ['Рузаевка → Пенза'] },
              { number: 2, isUpper: true, isSide: false, bookedSegments: [] },
              { number: 3, isUpper: false, isSide: false, bookedSegments: [] },
              { number: 4, isUpper: true, isSide: false, bookedSegments: ['Пенза → Москва'] },
            ],
          },
          {
            number: 2,
            type: 'Купе',
            seats: [
              { number: 1, isUpper: false, isSide: false, bookedSegments: [] },
              { number: 2, isUpper: true, isSide: false, bookedSegments: ['Рузаевка → Москва'] },
              { number: 3, isUpper: false, isSide: true, bookedSegments: [] },
              { number: 4, isUpper: true, isSide: true, bookedSegments: [] },
            ],
          },
        ],
      },
      {
        number: '002Б',
        from: 'Самара',
        to: 'Москва',
        date: '2025-07-18',
        wagons: [
          {
            number: 1,
            type: 'Плацкарт',
            seats: [
              { number: 1, isUpper: false, isSide: false, bookedSegments: [] },
              { number: 2, isUpper: true, isSide: false, bookedSegments: [] },
              { number: 3, isUpper: false, isSide: true, bookedSegments: [] },
              { number: 4, isUpper: true, isSide: true, bookedSegments: ['Самара → Москва'] },
            ],
          },
        ],
      },
    ];
  },
};
