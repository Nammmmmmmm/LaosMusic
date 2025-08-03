import React, { useState } from 'react';
import { useHomePageData } from '../api/hooks';
import { Song, Playlist, Artist, Genre } from '../api/types';
import './Home.css';

interface HomeProps {
  onSongSelect: (song: Song) => void;
}

const Home: React.FC<HomeProps> = ({ onSongSelect }) => {
  const { recommendedSongs, top100Playlists, topGenres, topArtists, isLoading, isError } = useHomePageData();
  
  // Slider states
  const [currentIndex, setCurrentIndex] = useState(0);
  const [top100Index, setTop100Index] = useState(0);
  const [genresIndex, setGenresIndex] = useState(0);
  const [artistsIndex, setArtistsIndex] = useState(0);
  
  const visibleCount = 6;

  // Slider handlers
  const handleSliderNext = (currentIndex: number, maxItems: number, setIndex: (index: number) => void) => {
    const maxIndex = Math.max(0, maxItems - visibleCount);
    setIndex(Math.min(currentIndex + 1, maxIndex));
  };

  const handleSliderPrev = (currentIndex: number, setIndex: (index: number) => void) => {
    setIndex(Math.max(currentIndex - 1, 0));
  };

  if (isLoading) {
    return (
      <div className="home-container">
        <div className="loading-container">
          <p>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="home-container">
        <div className="error-container">
          <p>Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại.</p>
        </div>
      </div>
    );
  }

  const songs = recommendedSongs.data || [];
  const playlists = top100Playlists.data || [];
  const genres = topGenres.data || [];
  const artists = topArtists.data || [];

  return (
    <div className="home-container">
      {/* Recommended Songs Section */}
      <div className="section">
        <h2>Nghe gì hôm nay</h2>
        <div className="slider-wrapper left-align">
          <button 
            className="slider-arrow left" 
            onClick={() => handleSliderPrev(currentIndex, setCurrentIndex)} 
            disabled={currentIndex === 0}
          >
            &lt;
          </button>
          <div className="album-list-viewport">
            <div className="album-list horizontal-slider slider-no-scroll">
              {songs.slice(currentIndex, currentIndex + visibleCount).map((song, idx) => (
                <div 
                  className="album-item" 
                  key={song.id} 
                  onClick={() => onSongSelect(song)}
                  style={{cursor: 'pointer'}}
                >
                  <div className="album-img">
                    <img src={song.imageUrl} alt={song.title} />
                  </div>
                  <div className="album-info-hover">
                    <div className="album-title-hover2">{song.title}</div>
                    <div className="album-artist-hover2">{song.artist}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button 
            className="slider-arrow right" 
            onClick={() => handleSliderNext(currentIndex, songs.length, setCurrentIndex)} 
            disabled={currentIndex >= Math.max(0, songs.length - visibleCount)}
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Top 100 Playlists Section */}
      <div className="section">
        <div className="section-header">
          <h2>Nhạc top 100</h2>
          <span className="see-more">Xem thêm &gt;</span>
        </div>
        <div className="slider-wrapper left-align">
          <button 
            className="slider-arrow left" 
            onClick={() => handleSliderPrev(top100Index, setTop100Index)} 
            disabled={top100Index === 0}
          >
            &lt;
          </button>
          <div className="album-list-viewport">
            <div className="album-list horizontal-slider slider-no-scroll">
              {playlists.slice(top100Index, top100Index + visibleCount).map((playlist) => (
                <div className="album-item" key={playlist.id}>
                  <div className="album-img">
                    <img src={playlist.imageUrl} alt={playlist.title} />
                  </div>
                  <div className="album-title">{playlist.title}</div>
                  <div className="album-artist">{playlist.creator}</div>
                </div>
              ))}
            </div>
          </div>
          <button 
            className="slider-arrow right" 
            onClick={() => handleSliderNext(top100Index, playlists.length, setTop100Index)} 
            disabled={top100Index >= Math.max(0, playlists.length - visibleCount)}
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Top Genres Section */}
      <div className="section">
        <div className="section-header">
          <h2>Các chủ đề tiếp theo</h2>
          <span className="see-more">Xem thêm &gt;</span>
        </div>
        <div className="slider-wrapper left-align">
          <button 
            className="slider-arrow left" 
            onClick={() => handleSliderPrev(genresIndex, setGenresIndex)} 
            disabled={genresIndex === 0}
          >
            &lt;
          </button>
          <div className="album-list-viewport">
            <div className="album-list horizontal-slider slider-no-scroll">
              {genres.slice(genresIndex, genresIndex + visibleCount).map((genre) => (
                <div className="album-item" key={genre.id}>
                  <div className="album-img">
                    <img src={genre.imageUrl} alt={genre.name} />
                  </div>
                  <div className="album-title">{genre.name}</div>
                  <div className="album-artist">{genre.songCount} bài hát</div>
                </div>
              ))}
            </div>
          </div>
          <button 
            className="slider-arrow right" 
            onClick={() => handleSliderNext(genresIndex, genres.length, setGenresIndex)} 
            disabled={genresIndex >= Math.max(0, genres.length - visibleCount)}
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Top Artists Section */}
      <div className="section">
        <div className="section-header">
          <h2>Ca sỹ yêu thích</h2>
          <span className="see-more">Xem thêm &gt;</span>
        </div>
        <div className="slider-wrapper left-align">
          <button 
            className="slider-arrow left" 
            onClick={() => handleSliderPrev(artistsIndex, setArtistsIndex)} 
            disabled={artistsIndex === 0}
          >
            &lt;
          </button>
          <div className="album-list-viewport">
            <div className="album-list horizontal-slider slider-no-scroll">
              {artists.slice(artistsIndex, artistsIndex + visibleCount).map((artist) => (
                <div className="album-item" key={artist.id}>
                  <div className="album-img">
                    <img src={artist.imageUrl} alt={artist.name} />
                  </div>
                  <div className="album-title">{artist.name}</div>
                  <div className="album-artist">{artist.followerCount.toLocaleString()} người theo dõi</div>
                </div>
              ))}
            </div>
          </div>
          <button 
            className="slider-arrow right" 
            onClick={() => handleSliderNext(artistsIndex, artists.length, setArtistsIndex)} 
            disabled={artistsIndex >= Math.max(0, artists.length - visibleCount)}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home; 