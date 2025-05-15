import React, { useState } from 'react';

const SeatSelectionModal = ({ onClose, onConfirm, train }) => {
  const [seats, setSeats] = useState(train.seats);

  const toggleSeat = (id) => {
    setSeats(seats.map(seat =>
      seat.id === id && !seat.booked
        ? { ...seat, selected: !seat.selected }
        : seat
    ));
  };

  const handleConfirm = () => {
    const selected = seats.filter(seat => seat.selected);
    if (selected.length === 0) {
      alert("Выберите хотя бы одно место.");
      return;
    }
    onConfirm(selected);
    onClose();
  };

  const seatColors = {
    'купе': '#4caf50',
    'плацкарт': '#2196f3',
    'люкс': '#ff9800'
  };

  return (
    <div style={modalStyle.overlay}>
      <div style={modalStyle.modal}>
        <h3>Выбор мест для поезда {train.number}</h3>
        <div style={modalStyle.legend}>
          <span style={{ backgroundColor: '#4caf50' }}>купе</span>
          <span style={{ backgroundColor: '#2196f3' }}>плацкарт</span>
          <span style={{ backgroundColor: '#ff9800' }}>люкс</span>
          <span style={{ backgroundColor: '#999' }}>занято</span>
        </div>
        <div style={modalStyle.seatGrid}>
          {seats.map(seat => (
            <div
              key={seat.id}
              onClick={() => toggleSeat(seat.id)}
              style={{
                ...modalStyle.seat,
                backgroundColor: seat.booked
                  ? '#999'
                  : (seat.selected ? '#000' : seatColors[seat.type]),
                color: seat.booked ? '#fff' : '#000',
                cursor: seat.booked ? 'not-allowed' : 'pointer'
              }}
            >
              {seat.id}
            </div>
          ))}
        </div>
        <button onClick={handleConfirm}>Забронировать</button>
        <button onClick={onClose} style={{ marginLeft: '10px' }}>Закрыть</button>
      </div>
    </div>
  );
};

const modalStyle = {
  overlay: {
    position: 'fixed', top: 0, left: 0, width: '100%',
    height: '100%', backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 1000
  },
  modal: {
    backgroundColor: 'white', padding: '20px',
    borderRadius: '8px', width: '420px'
  },
  legend: {
    display: 'flex', justifyContent: 'space-around', marginBottom: '10px',
    fontSize: '14px'
  },
  seatGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px', marginBottom: '20px'
  },
  seat: {
    padding: '10px', textAlign: 'center',
    border: '1px solid #333', borderRadius: '4px'
  }
};

export default SeatSelectionModal;
