import { useState, useEffect, useRef } from "react";
import "../styles/FinalImage.css";

const FinalImage = ({ onRestart }) => {
  const [showRestartButton, setShowRestartButton] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRestartButton(true);
    }, 5000);

    if (audioRef.current) {
      audioRef.current.play();
    }

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="final-image-container">
      <audio ref={audioRef} src="/caballo.wav" />
      <img
        src="/Imagen de WhatsApp 2025-05-15 a las 13.08.19_5cc3e863.jpg"
        alt="¡Sorpresa!"
        className="final-image"
      />
      {showRestartButton && (
        <button className="restart-button" onClick={onRestart}>
          Empieza de nuevo Ale
        </button>
      )}
    </div>
  );
};

export default FinalImage;
