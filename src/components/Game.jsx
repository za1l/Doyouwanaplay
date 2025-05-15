import { useState, useCallback, useRef, useEffect } from "react";
import "../styles/Game.css";

const Game = ({ onGameComplete }) => {
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [targetSize, setTargetSize] = useState(30);
  const [level, setLevel] = useState(1);
  const [speed, setSpeed] = useState(1);
  const audioRef = useRef(null);
  const popSound = useRef(null);
  const levelUpSound = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("/game-music.mp3");
    popSound.current = new Audio("/pop.mp3");
    levelUpSound.current = new Audio("/level-up.mp3");
    audioRef.current.loop = true;
    return () => {
      audioRef.current.pause();
      audioRef.current = null;
      popSound.current = null;
      levelUpSound.current = null;
    };
  }, []);

  const moveTarget = useCallback(
    (target) => {
      if (!gameActive) return;

      const gameArea = target.parentElement;
      const maxX = gameArea.clientWidth - target.clientWidth;
      const maxY = gameArea.clientHeight - target.clientHeight;

      const newX = Math.random() * maxX;
      const newY = Math.random() * maxY;

      target.style.left = `${newX}px`;
      target.style.top = `${newY}px`;

      if (speed > 1) {
        setTimeout(() => moveTarget(target), 2000 / speed);
      }
    },
    [gameActive, speed]
  );

  const handleTargetHover = (e) => {
    if (!gameActive) return;

    popSound.current.currentTime = 0;
    popSound.current.play();

    setScore((prevScore) => {
      const newScore = prevScore + 1;

      if (newScore >= 4) {
        audioRef.current.pause();
        setGameActive(false);
        onGameComplete();
        return newScore;
      }

      if (newScore % 3 === 0) {
        levelUpSound.current.play();
        setLevel((prevLevel) => prevLevel + 1);
        setSpeed((prevSpeed) => prevSpeed + 0.5);
        setTargetSize((prevSize) => Math.max(prevSize - 5, 10));
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
    setLevel(1);
    setSpeed(1);
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    const target = document.getElementById("target");
    moveTarget(target);
  };

  useEffect(() => {
    startGame();
  }, []);

  return (
    <div className="game-container">
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
      <h1>¡Atrapa el punto rojo Rebo!</h1>
      <div className="score">
        Nivel: <span>{level}</span> | Puntos: <span>{score}</span>
      </div>
    </div>
  );
};

export default Game;
