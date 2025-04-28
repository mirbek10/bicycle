import React from 'react';
import { motion } from 'framer-motion';


const NotFoundMessage = () => {
  return (
    <motion.div
      className="product-not-found"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        scale: { type: 'spring', damping: 10, stiffness: 100 }
      }}
    >
      <motion.div 
        className="decoration"
        initial={{ x: -50, y: -50, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 0.1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      />
      <motion.div 
        className="decoration bottom"
        initial={{ x: 50, y: 50, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 0.1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      />
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Товары не найдены. Измените параметры фильтрации.
      </motion.p>
    </motion.div>
  );
};

const styles = `
  .product-not-found {
    text-align: center;
    padding: 2rem;
    margin: 2rem auto;
    max-width: 600px;
    border-radius: 12px;
    background: linear-gradient(135deg, #ff7b00 0%, #ff5e00 100%);
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.3),
      inset 0 4px 8px rgba(255, 255, 255, 0.2);
    position: relative;
    overflow: hidden;
    border: 2px solid #000;
    transform-origin: center;
    
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: #000;
      transform-origin: left;
      animation: scaleIn 0.8s 0.1s ease-out both;
    }
    
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: #000;
      transform-origin: right;
      animation: scaleIn 0.8s 0.2s ease-out both;
    }

    p {
      color: white;
      font-size: 1.5rem;
      font-weight: 700;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      margin: 0;
      padding: 1rem;
      position: relative;
      z-index: 1;
      letter-spacing: 1px;
    }

    .decoration {
      position: absolute;
      width: 100px;
      height: 100px;
      background: #000;
      border-radius: 50%;
      opacity: 0.1;
      
      &.bottom {
        width: 150px;
        height: 150px;
        bottom: -40px;
        right: -20px;
        top: auto;
        left: auto;
      }
    }
  }

  @keyframes scaleIn {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default NotFoundMessage;