import React, { useEffect, useState } from 'react';
import BikeCard from './Card/BikeCard';
import { bikes } from '../../shared/data/bikes';
import Card from '../../Components/Card/Card';

const BikeFilm = () => {

  

  return (
    <div className="catalog">
      <h2>Каталог велосипедов</h2>
      <div className="bike-list">
        {bikes.map((bike) => (
          <Card el={bike} key={bike.id} />
        ))}
      </div>
    </div>
  );
};

export default BikeFilm;
