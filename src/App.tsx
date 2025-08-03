import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import MusicPlayer from './MusicPlayer';
import Home from './components/Home';
import Search from './components/Search';
import { Song } from './api/types';

// Tạo QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
    },
  },
});

const sidebarMenu = [
  { icon: '🏠', label: 'Home', active: true },
  { icon: '📈', label: 'Rankings' },
  { icon: '🔲', label: 'Topics and genres' },
  { icon: '🎵', label: 'Library' },
];

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'search'>('home');
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSongSelect = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handlePrev = () => {
    // Logic for previous song - would need to implement playlist management
    console.log('Previous song');
  };

  const handleNext = () => {
    // Logic for next song - would need to implement playlist management
    console.log('Next song');
  };

  const handleMenuClick = (label: string) => {
    if (label === 'Home') {
      setCurrentView('home');
    } else if (label === 'Search') {
      setCurrentView('search');
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="main-bg">
        <aside className="sidebar">
          <div className="logo">
            <span className="logo-icon">🎵</span>
            <span className="logo-text">laomusic</span>
          </div>
          <nav className="menu">
            {sidebarMenu.map((item) => (
              <div 
                key={item.label} 
                className={`menu-item${item.active ? ' active' : ''}`}
                onClick={() => handleMenuClick(item.label)}
                style={{ cursor: 'pointer' }}
              > 
                <span className="menu-icon">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </nav>
        </aside>
        
        <div className="content">
          <header className="header">
            <input 
              className="search" 
              placeholder="What do you want to listen to?" 
              onClick={() => setCurrentView('search')}
              readOnly
            />
            <button className="login-btn">Login</button>
          </header>
          
          <div className="main-content">
            {currentView === 'home' && (
              <Home onSongSelect={handleSongSelect} />
            )}
            {currentView === 'search' && (
              <Search onSongSelect={handleSongSelect} />
            )}
          </div>
        </div>
        
        {currentSong && (
          <MusicPlayer
            song={{
              img: currentSong.imageUrl,
              title: currentSong.title,
              artist: currentSong.artist,
              audio: currentSong.audioUrl,
            }}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </div>
    </QueryClientProvider>
  );
}

export default App;
