import React, { useState } from 'react';
import './BannerCart.scss';

const info = [
    { id: 1, title: 'Экстремальное вождение на горном велосипеде' },
    { id: 2, title: 'Велосипеды для профессионалов' },
    { id: 3, title: 'Долгая поездка на шоссейном велосипеде' }
];

function BannerCart() {
    const [oneActive, setOneActive] = useState('');

    const handleOneClick = (title) => {
        setOneActive(title);
    };

    return (
        <div className='down-banner'>
            {info.map(item => (
                <div 
                    key={item.id} 
                    onMouseEnter={() => handleOneClick(item.title)} 
                    
                    className={`banner-cart ${oneActive === item.title ? 'active' : ''}`}
                >
                    <h2>{item.title}</h2>
                    <p className={oneActive === item.title ? 'visible' : ''}>Подробнее</p>
                </div>
            ))}
        </div>
    );
}

export default BannerCart;
