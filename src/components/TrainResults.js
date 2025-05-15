import React from 'react';
import TrainCard from './TrainCard';

const TrainResults = ({ results = [] }) => {
  if (!results.length) return <p>Нет доступных поездов по заданным параметрам.</p>;

  return (
    <div>
      {results.map((train) => (
        <TrainCard key={train.number} train={train} />
      ))}
    </div>
  );
};

export default TrainResults;
