import React, { useState } from 'react';
import { getTrainDetails } from '../api/api';
import styles from './TrainCard.module.css';

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const month = String(date.getDate()).padStart(2, '0');
  const day = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

function parseTrainDetails(response) {
  const wagons = [];

  for (const key in response) {
    const wagon = response[key];

    if (
      typeof wagon === 'object' &&
      'car_number' in wagon &&
      'car_type' in wagon &&
      'free_seats' in wagon
    ) {
      const seatGroups = wagon.free_seats;
      const allSeats = Object.values(seatGroups).flat();

      wagons.push({
        car_number: wagon.car_number,
        car_type: wagon.car_type,
        free_seats: seatGroups,
        all_seats: allSeats,
      });
    }
  }

  return wagons;
}

const TrainCard = ({ train, isExpanded, onToggle, fromCode, toCode, selectedDate }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedSeatInfo, setSelectedSeatInfo] = useState(null);

  const handleExpand = async () => {
    onToggle();

    if (!isExpanded) {
      try {
        setLoading(true);

        const formattedDate = formatDate(selectedDate);
        const formattedTime = new Date(train.departure_time).toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
        });

        const response = await getTrainDetails({
          from_code: fromCode,
          to_code: toCode,
          date: formattedDate,
          train_number: train.number,
          departure_time: formattedTime,
        });

        const parsedDetails = parseTrainDetails(response);
        setDetails(parsedDetails);
      } catch (error) {
        console.error('Ошибка загрузки мест:', error);
        alert('Не удалось загрузить места');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={styles.card}>
      <h3 onClick={handleExpand} className={styles.header}>
        {train.number} — {train.origin_station_name} → {train.destination_station_name}
      </h3>

      {isExpanded && (
        <div className={styles.details}>
          {loading && <p>Загрузка мест...</p>}

          {!loading && Array.isArray(details) && details.map((wagon) => (
            <div key={wagon.car_number} className={styles.wagon}>
              <h4>
                Вагон {wagon.car_number} ({wagon.car_type})
              </h4>

              <div className={styles.seats}>
                {Object.entries(wagon.free_seats).map(([seatNumber, segments]) => (
                  <div
                    key={seatNumber}
                    onClick={() =>
                      setSelectedSeatInfo({
                        seatNumber,
                        segments,
                        carNumber: wagon.car_number,
                      })
                    }
                    className={`${styles.seat} ${segments.length > 0 ? styles.available : styles.unavailable}`}
                    title={`Место ${seatNumber}\nСегментов: ${segments.length}`}
                  >
                    {seatNumber}
                  </div>
                ))}
              </div>

              {selectedSeatInfo && selectedSeatInfo.carNumber === wagon.car_number && (
                <div className={styles.seatInfo}>
                  <h5>Информация о месте {selectedSeatInfo.seatNumber}:</h5>
                  {selectedSeatInfo.segments.length > 0 ? (
                    <ul>
                      {selectedSeatInfo.segments.map((segment, index) => (
                        <li key={index}>
                          {segment.start_station_name} → {segment.end_station_name}{' '}
                          ({segment.start_time} – {segment.end_time})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Место недоступно ни на одном сегменте</p>
                  )}
                </div>
              )}
            </div>
          ))}

          {!loading && (!details || !details.length) && <p>Нет доступных вагонов</p>}
        </div>
      )}
    </div>
  );
};

export default TrainCard;
