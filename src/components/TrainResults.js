import React, { useState } from 'react';
import TrainCard from './TrainCard';

const TrainResults = ({ results, fromCode, toCode, selectedDate }) => {
  const [expandedTrain, setExpandedTrain] = useState(null);

  const handleToggle = (trainNumber) => {
    setExpandedTrain(expandedTrain === trainNumber ? null : trainNumber);
  };

  if (!results || results.length === 0) {
    return <p>Нет доступных поездов</p>;
  }

  return (
    <div>
      {results.map((train) => (
        <TrainCard
          key={train.number}
          train={train}
          isExpanded={expandedTrain === train.number}
          onToggle={() => handleToggle(train.number)}
          fromCode={fromCode}
          toCode={toCode}
          selectedDate={selectedDate}
        />
      ))}
    </div>
  );
};

export default TrainResults;
