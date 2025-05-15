import { useState, useEffect, useRef } from "react";
import "../styles/VideoIntro.css";

const VideoIntro = ({ onVideoEnd }) => {
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (isVideoEnded) {
      onVideoEnd();
    }
  }, [isVideoEnded, onVideoEnd]);

  const handleVideoEnd = () => {
    setIsVideoEnded(true);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        videoRef.current.muted = false;
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        className="game-video"
        src="/Do you wanna play a game_.mp4"
        playsInline
        onEnded={handleVideoEnd}
      />
      <button
        className={`play-button ${isPlaying ? "hidden" : ""}`}
        onClick={handlePlayPause}
      >
        {isPlaying ? "⏸️" : "▶️"}
      </button>
    </div>
  );
};

export default VideoIntro;
