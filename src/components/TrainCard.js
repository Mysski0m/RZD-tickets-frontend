import React, { useState } from 'react';

const Seat = ({ seat, selected, onSelect }) => {
  const isBooked = seat.bookedSegments.length > 0;

  const handleClick = () => {
    onSelect(seat);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: 30,
        height: 30,
        margin: 4,
        backgroundColor: selected ? '#4caf50' : isBooked ? '#f44336' : '#9e9e9e',
        color: 'white',
        fontSize: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        borderRadius: 4,
      }}
      title={`Место ${seat.number}`}
    >
      {seat.number}
    </div>
  );
};

const Wagon = ({ wagon }) => {
  const [selectedSeat, setSelectedSeat] = useState(null);

  return (
    <div style={{ border: '1px solid #ccc', padding: 10, marginBottom: 20 }}>
      <h4>Вагон №{wagon.number} ({wagon.type})</h4>

      <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: 240 }}>
        {wagon.seats.map((seat) => (
          <Seat
            key={seat.number}
            seat={seat}
            selected={selectedSeat?.number === seat.number}
            onSelect={setSelectedSeat}
          />
        ))}
      </div>

      {selectedSeat && (
        <div style={{ marginTop: 10 }}>
          <strong>Место {selectedSeat.number}</strong>
          <ul>
            {selectedSeat.bookedSegments.length > 0 ? (
              selectedSeat.bookedSegments.map((seg, idx) => (
                <li key={idx}>Занято: {seg}</li>
              ))
            ) : (
              <li>Свободно на всём маршруте</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

const TrainCard = ({ train }) => (
  <div style={{ border: '2px solid #2196f3', borderRadius: 10, padding: 15, marginBottom: 30 }}>
    <h2>Поезд {train.number}</h2>
    <p>
      {train.from} → {train.to} | Дата: {train.date}
    </p>

    {train.wagons.map((wagon) => (
      <Wagon key={wagon.number} wagon={wagon} />
    ))}
  </div>
);

export default TrainCard;
