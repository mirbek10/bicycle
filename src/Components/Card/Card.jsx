import React from 'react';
import './Card.scss';
import { LuMousePointerClick } from "react-icons/lu";


function Card({el}) {



    return (
        <div className="bike-card">
            <div className={`sold-out-label ${el.buying === true ? 'В-наличии': 'Распродано'}`}>
                {el.buying === true ? 'В наличии': 'Распродано'}
            </div>

            <div className="bike-image-container">
                <img src={el.image} alt="" className="bike-image" />
            </div>

            <div className="bike-info">
                <h2 className="bike-model">{el.name}</h2>
                <p className="bike-price">{el.price}</p>
            </div>
                <button> <LuMousePointerClick/> В 1 клик</button>
        </div>
    );
}

export default Card;
