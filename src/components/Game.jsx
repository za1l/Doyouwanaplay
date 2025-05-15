import { useState, useCallback } from "react";
import "../styles/Game.css";

const Game = ({ onGameComplete }) => {
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [targetSize, setTargetSize] = useState(30);

  const moveTarget = useCallback(
    (target) => {
      if (!gameActive) return;

      const gameArea = target.parentElement;
      const maxX = gameArea.clientWidth - target.clientWidth;
      const maxY = gameArea.clientHeight - target.clientHeight;

      target.style.left = `${Math.random() * maxX}px`;
      target.style.top = `${Math.random() * maxY}px`;
    },
    [gameActive]
  );

  const handleTargetHover = (e) => {
    if (!gameActive) return;

    setScore((prevScore) => {
      const newScore = prevScore + 1;

      if (newScore >= 5) {
        setGameActive(false);
        onGameComplete();
        return newScore;
      }
      if (newScore > 3) {
        setTargetSize(20);
      }
      return newScore;
    });

    moveTarget(e.target);
  };

  const handleInteraction = (e) => {
    if (!gameActive) return;

    const target = document.getElementById("target");
    const rect = target.getBoundingClientRect();
    const interactionX = e.clientX || (e.touches && e.touches[0].clientX);
    const interactionY = e.clientY || (e.touches && e.touches[0].clientY);
    const targetX = rect.left + rect.width / 2;
    const targetY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
      Math.pow(interactionX - targetX, 2) + Math.pow(interactionY - targetY, 2)
    );

    if (distance < 100) {
      moveTarget(target);
    }
  };

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setTargetSize(30);
    const target = document.getElementById("target");
    moveTarget(target);
  };

  return (
    <div className="game-container">
      <h1>¡Atrapa el punto rojo!</h1>
      <div className="score">
        Puntos: <span>{score}</span>
      </div>
      <div 
        className="game-area" 
        onMouseMove={handleInteraction}
        onTouchMove={handleInteraction}
      >
        <div
          id="target"
          className="target"
          style={{ width: `${targetSize}px`, height: `${targetSize}px` }}
          onMouseOver={handleTargetHover}
        />
      </div>
      <button className="button" onClick={startGame}>
        Empezar Juego
      </button>
    </div>
  );
};

export default Game;
