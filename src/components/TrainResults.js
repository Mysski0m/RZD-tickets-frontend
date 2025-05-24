import React, { useState } from 'react';
import TrainCard from './TrainCard';
import styles from './TrainResults.module.css';

const TrainResults = ({ results, fromCode, toCode, selectedDate }) => {
  const [expandedTrain, setExpandedTrain] = useState(null);

  const handleToggle = (trainNumber) => {
    setExpandedTrain(expandedTrain === trainNumber ? null : trainNumber);
  };

  if (!results || results.length === 0) {
    return <p className={styles.message}>Нет доступных поездов</p>;
  }

  return (
    <div className={styles.container}>
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
