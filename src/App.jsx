import { useState } from 'react';
import VideoIntro from './components/VideoIntro';
import Game from './components/Game';
import FinalImage from './components/FinalImage';
import './App.css';

function App() {
  const [gameState, setGameState] = useState('video'); // video, game, final

  const handleVideoEnd = () => {
    setGameState('game');
  };

  const handleGameComplete = () => {
    setGameState('final');
  };

  return (
    <div className="app">
      {gameState === 'video' && <VideoIntro onVideoEnd={handleVideoEnd} />}
      {gameState === 'game' && <Game onGameComplete={handleGameComplete} />}
      {gameState === 'final' && <FinalImage />}
    </div>
  );
}

export default App;
