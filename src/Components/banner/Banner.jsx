// components/EBikeCarousel.tsx
import React, { useState, useEffect } from 'react';
import './Banner.scss';
import { Link } from 'react-router-dom';
import bike1 from '../../assets/image/MirbekImg/bike1.png';
import bike2 from '../../assets/image/MirbekImg/bike2.png'
import bike3 from '../../assets/image/MirbekImg/bike3.1.png'
import BannerCart from './carts/BannerCart';



const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = [
      {
        id: 1,
        title: "ЭЛЕКТРО ВЕЛОСИПЕДЫ",
        description: "Сентябрь 2023 — это конечный велосипед с генетическим подключением электротехнологий, который устанавливает очень высокий стандарт для данной категории",
        image: bike1,
      },
      {
        id: 2,
        title: "НОВИНКИ 2023",
        description: "Новейшие модели оснащены усовершенствованной батареей с увеличенной емкостью, что позволяет значительно расширить запас хода и повысить эффективность поездок.",
        image: bike2,
      },
      {
        id: 3,
        title: "ТЕХНОЛОГИИ БУДУЩЕГО",
        description: "Инновационные технологии обеспечивают максимальный комфорт и устойчивость на любых типах дорог, делая каждую поездку более плавной и безопасной.",
        image: bike3,
      }
    ];
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }, 4000);
  
      return () => clearInterval(interval);
    }, [slides.length]);
  
    const currentSlide = slides[currentIndex];
  
    return (
        <>
      <div className="movie-carousel">
        <div className="carousel-container">
          {/* Фоновое изображение */}
          <div 
            className="slide-background"
            style={{ backgroundImage: `url(${currentSlide.image})` }}
          />
  
          {/* Контент */}
          <div className="slide-content">
           
            <h1 className="slide-title">{currentSlide.title}</h1>
            <p className="slide-description">{currentSlide.description}</p>
  
            
              <button className="about-button">
              Подробнее
              </button>
            
          </div>
  
          {/* Индикаторы слайдов */}
          <div className="slide-indicators">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
      <BannerCart/>
        </>
    );
  };
  
export default Banner;