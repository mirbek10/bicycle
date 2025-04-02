import React, { useEffect, useRef } from 'react';
import './BikeBrands.scss';
import brand1 from '../../assets/image/MirbekImg/svg/brand1.svg'
import brand2 from '../../assets/image/MirbekImg/svg/brand2.svg'
import brand3 from '../../assets/image/MirbekImg/svg/brand3.svg'
import brand4 from '../../assets/image/MirbekImg/svg/brand4.svg'
import brand5 from '../../assets/image/MirbekImg/svg/brand5.svg'
import brand6 from '../../assets/image/MirbekImg/svg/brand6.svg'
import brand7 from '../../assets/image/MirbekImg/svg/brand7.svg'

const BikeBrands = () => {
  const brands = [
    { name: 'Wilder', logo: brand1 },
    { name: 'TREK', logo: brand2 },
    { name: 'TOPEAK', logo: brand3 },
    { name: 'SRAIN', logo: brand4 },
    { name: 'SHINANO', logo: brand5 },
    { name: 'GIANT', logo: brand6 },
    { name: 'SPECIALIZED', logo: brand7 },
   
  ];

  const scrollContainer = useRef(null);
  const animationRef = useRef(null);
  const scrollSpeed = 1;

  useEffect(() => {
    const scroll = () => {
      if (scrollContainer.current) {
        const container = scrollContainer.current;
        

        if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 1) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += scrollSpeed;
        }
      }
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);


  const handleMouseEnter = () => {
    cancelAnimationFrame(animationRef.current);
  };

  const handleMouseLeave = () => {
    animationRef.current = requestAnimationFrame(() => {
      const scroll = () => {
        if (scrollContainer.current) {
          const container = scrollContainer.current;
          container.scrollLeft += scrollSpeed;
          
          if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
            container.scrollLeft = 0;
          }
        }
        animationRef.current = requestAnimationFrame(scroll);
      };
      scroll();
    });
  };


  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <div className="bike-brands-scroller">
      <div 
        className="brands-scroll" 
        ref={scrollContainer}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {duplicatedBrands.map((brand, index) => (
          <div key={index} className="brand-card">
            <div className="brand-logo-container">
              {brand.logo ? (
                <img src={brand.logo} alt={brand.name} className="brand-logo" />
              ) : (
                <span className="brand-name-fallback">{brand.name}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BikeBrands;