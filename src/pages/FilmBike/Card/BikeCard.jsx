import React from 'react';
import './BikeCard.scss';

const BikeCard = ({ bike }) => {
  return (
    <div className="bike-card">
      <img src={bike.image} alt={bike.name} />
      <h3>{bike.name}</h3>
      <p>{bike.description}</p>
      <span>${bike.price}</span>
    </div>
  );
};

export default BikeCard;
