import React, { useRef, useEffect, useState } from 'react';

interface Song {
  title: string;
  artist: string;
  audio: string;
  img: string;
}

interface MusicPlayerProps {
  song: Song;
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ song, isPlaying, onPlayPause, onPrev, onNext }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, song]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * duration;
    setCurrentTime(audioRef.current.currentTime);
  };

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className="music-player-spotify">
      <div className="mp-spotify-left">
        <img className="mp-spotify-cover" src={song.img} alt={song.title} />
        <div className="mp-spotify-info">
          <div className="mp-spotify-title">{song.title}</div>
          <div className="mp-spotify-artist">{song.artist}</div>
        </div>
      </div>
      <div className="mp-spotify-center">
        <div className="mp-spotify-controls">
          <button className="mp-spotify-btn" title="Shuffle"><span className="material-icons">shuffle</span></button>
          <button className="mp-spotify-btn" onClick={onPrev} title="Previous"><span className="material-icons">skip_previous</span></button>
          <button className="mp-spotify-btn mp-spotify-play" onClick={onPlayPause} title={isPlaying ? 'Pause' : 'Play'}>
            <span className="material-icons">{isPlaying ? 'pause_circle' : 'play_circle'}</span>
          </button>
          <button className="mp-spotify-btn" onClick={onNext} title="Next"><span className="material-icons">skip_next</span></button>
          <button className="mp-spotify-btn" title="Repeat"><span className="material-icons">repeat</span></button>
        </div>
        <div className="mp-spotify-progress-row">
          <span className="mp-spotify-time">{formatTime(currentTime)}</span>
          <div className="mp-spotify-progress-bar" onClick={handleProgressClick}>
            <div className="mp-spotify-progress" style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }} />
          </div>
          <span className="mp-spotify-time">{formatTime(duration)}</span>
        </div>
      </div>
      <div className="mp-spotify-right">
        <button className="mp-spotify-btn" title="Add to playlist"><span className="material-icons">playlist_add</span></button>
        <button className="mp-spotify-btn" title="Favorite"><span className="material-icons">favorite_border</span></button>
      </div>
      <audio
        ref={audioRef}
        src={song.audio}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
    </div>
  );
};

export default MusicPlayer; 