import React, { useState, useEffect } from 'react';
import './Banner.scss';
import { useNavigate } from 'react-router-dom';
import bike1 from '../../assets/image/MirbekImg/bike1.png';
import bike2 from '../../assets/image/MirbekImg/bike2.png';
import bike3 from '../../assets/image/MirbekImg/bike3.1.png';
import bike4 from '../../assets/image/MirbekImg/FilmImg/bannner.png';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      title: "ЭЛЕКТРО ВЕЛОСИПЕДЫ",
      description: "Сентябрь 2023 — это конечный велосипед с генетическим подключением электротехнологий, который устанавливает очень высокий стандарт для данной категории",
      image: bike1,
      color: '#F57520'
    },
    {
      id: 2,
      title: "НОВИНКИ 2023",
      description: "Новейшие модели оснащены усовершенствованной батареей с увеличенной емкостью, что позволяет значительно расширить запас хода и повысить эффективность поездок.",
      image: bike2,
      color: '#4CAF50'
    },
    {
      id: 3,
      title: "ТЕХНОЛОГИИ БУДУЩЕГО",
      description: "Инновационные технологии обеспечивают максимальный комфорт и устойчивость на любых типах дорог, делая каждую поездку более плавной и безопасной.",
      image: bike3,
      color: '#2196F3'
    },
    {
      id: 4,
      title: "ВЕЛОСИПЕДЫ ДЛЯ ГЕРОЕВ",
      description: "Электровелосипеды с суперсилой — это современные транспортные средства, которые объединяют в себе мощь и эффективность.",
      image: bike4,
      color: '#9C27B0'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length, isHovered]);

  const handleKeyDown = () => {
    navigate("/catalog");
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const currentSlide = slides[currentIndex];

  return (
    <div
      className="movie-carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="carousel-container">
        <div
          className="slide-background"
          style={{
            backgroundImage: `url(${currentSlide.image})`,
            transition: 'background-image 1s ease-in-out'
          }}
        />
        <div className="slide-overlay" style={{ backgroundColor: `${currentSlide.color}20` }} />

        <div className="slide-content">
          <h1 className="slide-title" style={{ color: currentSlide.color }}>
            {currentSlide.title}
          </h1>
          <p className="slide-description">{currentSlide.description}</p>

          <button
            onClick={handleKeyDown}
            className="about-button"
            style={{ backgroundColor: currentSlide.color }}
            onMouseEnter={(e) => e.target.style.backgroundColor = `${currentSlide.color}DD`}
            onMouseLeave={(e) => e.target.style.backgroundColor = currentSlide.color}
          >
            Подробнее <FaArrowRight style={{ marginLeft: '8px' }} />
          </button>
        </div>

        <button
          className="nav-button prev-button"
          onClick={goToPrevSlide}
          aria-label="Previous slide"
          style={{backgroundColor:currentSlide.color}}
        >
          <FaChevronLeft />
        </button>

        <button
          className="nav-button next-button"
          onClick={goToNextSlide}
          aria-label="Next slide"
          style={{backgroundColor:currentSlide.color}}
        >
          <FaChevronRight />
        </button>

        <div className="slide-indicators">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              style={{
                backgroundColor: index === currentIndex ? currentSlide.color : '#6b7280'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;