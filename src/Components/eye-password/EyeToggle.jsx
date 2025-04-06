import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const EyeToggle = ({ showPassword, togglePassword, className }) => {
  return (
    <span
      className={`password-eye ${className}`} 
      onClick={togglePassword}
    >
      {showPassword ? <FaEye /> : <FaEyeSlash />}
    </span>
  );
};

export default EyeToggle;

