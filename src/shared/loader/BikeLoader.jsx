import React, { useEffect, useState } from "react";
import "./BikeLoader.scss";

const BikeLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 2));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bike-loader">
      <div className="loader-container">

        <div className="bike-wheel">
          <div className="wheel-spokes"></div>
        </div>
        
        <div className="track">
          <div 
            className="progress" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        

        <div className="progress-text">{progress}%</div>
      </div>
    </div>
  );
};

export default BikeLoader;