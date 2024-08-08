/*
export const Loader = () => (
  <div className="loader">
    <div className="spinner"></div>
  </div>
);
*/
import React, { useState, useEffect } from 'react';


const texts = [
    `Las puertas del destino nunca se han cerrado...`,
    'Seguramente te espera perderlo todo...',
    'Pero tú podrás alcanzar tus sueños...',
    'Demuestra que su sueño es real!!'
  ];

export const Loader = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2500); 

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  return (
    <div className="loader">
      <div className="loader-text" style={{color:"yellow",fontFamily:"Japanese Brush Stroke", fontSize:"2em"}}>{texts[currentTextIndex]}</div>
    </div>
  );
};
