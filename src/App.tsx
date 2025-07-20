import React, { useState } from 'react';
import './App.css';
import MusicPlayer from './MusicPlayer';

const sidebarMenu = [
  { icon: '🏠', label: 'Home', active: true },
  { icon: '📈', label: 'Rankings' },
  { icon: '🔲', label: 'Topics and genres' },
  { icon: '🎵', label: 'Library' },
];

const listenToday = [
  { img: '/img/a1.jpg', title: 'HÃY TRAO CHO ANH', artist: 'Sơn Tùng M-TP', audio: '/Sounds/HayTraoChoAnh-SonTungMTPSnoopDogg-6010660.mp3' },
  { img: '/img/a2.jpg', title: 'CHÚNG TA CỦA HIỆN TẠI', artist: 'Sơn Tùng M-TP', audio: '/Sounds/ChungTaCuaHienTai-SonTungMTP-6892340.mp3' },
  { img: '/img/a3.jpg', title: 'MUỘN RỒI MÀ SAO CÒN', artist: 'Sơn Tùng M-TP', audio: '/Sounds/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3' },
  { img: '/img/a4.jpg', title: 'CƯƠN MƯA NGANG QUA', artist: 'Sơn Tùng M-TP', audio: '/Sounds/ConMuaNgangQua-SonTungMTP-1142953.mp3' },
  { img: '/img/a5.jpg', title: '1000 ÁNH MẮT', artist: 'Sơn Tùng M-TP', audio: '/Sounds/1000anhmat.mp3' },
  { img: '/img/a6.jpg', title: 'CÓ CHẮC YÊU LÀ ĐÂY', artist: 'Sơn Tùng M-TP', audio: '/Sounds/CoChacYeuLaDayOnionnRemix-SonTungMTPOnionn-7022615.mp3' },
  { img: '/img/a7.jpg', title: 'NƠI NÀY CÓ ANH', artist: 'Sơn Tùng M-TP', audio: '/Sounds/NoiNayCoAnh-SonTungMTP-4772041.mp3' },
  { img: '/img/a7.jpg', title: 'BÀI HÁT 8', artist: 'Sơn Tùng M-TP', audio: '' }, // chưa có file mp3
];

const top100 = [
  { img: '/img/a1.jpg', title: 'Nhạc Phim', artist: 'Lưu Vũ Ninh' },
  { img: '/img/a2.jpg', title: 'Top100Today', artist: 'Ali Hoàng Dương, Đậu Tất Đạt' },
  { img: '/img/a3.jpg', title: 'TOP100TUANMOI', artist: 'Ali Hoàng Dương, Đậu Tất Đạt' },
  { img: '/img/a4.jpg', title: 'TOP100 THÁNG 4', artist: 'Ali Hoàng Dương, Đậu Tất Đạt' },
  { img: '/img/a5.jpg', title: 'testTop100_01', artist: 'Giang Hồng Ngọc, Ali Hoàng Dương' },
  { img: '/img/a6.jpg', title: 'testTop100', artist: 'Giang Hồng Ngọc, Ali Hoàng Dương' },
  { img: '/img/a6.jpg', title: 'testTop100', artist: 'Giang Hồng Ngọc, Ali Hoàng Dương' },
  { img: '/img/a6.jpg', title: 'testTop100', artist: 'Giang Hồng Ngọc, Ali Hoàng Dương' },
  { img: '/img/a6.jpg', title: 'testTop100', artist: 'Giang Hồng Ngọc, Ali Hoàng Dương' },
];

function App() {
  // Slider logic: chỉ hiển thị đúng 6 item, dịch chuyển bằng nút mũi tên
  const [currentIndex, setCurrentIndex] = useState(0);
  const [top100Index, setTop100Index] = useState(0);
  const visibleCount = 6;
  const maxIndex = Math.max(0, listenToday.length - visibleCount);
  const maxTop100Index = Math.max(0, top100.length - visibleCount);

  // Music player state
  const [currentSongIndex, setCurrentSongIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlaySong = (idx: number) => {
    setCurrentSongIndex(idx);
    setIsPlaying(true);
  };
  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };
  const handlePrev = () => {
    if (currentSongIndex !== null) {
      setCurrentSongIndex((prev) => (prev && prev > 0 ? prev - 1 : listenToday.length - 1));
      setIsPlaying(true);
    }
  };
  const handleNext = () => {
    if (currentSongIndex !== null) {
      setCurrentSongIndex((prev) => (prev !== null && prev < listenToday.length - 1 ? prev + 1 : 0));
      setIsPlaying(true);
    }
  };
  const handleTop100Prev = () => {
    setTop100Index((prev) => Math.max(prev - 1, 0));
  };
  const handleTop100Next = () => {
    setTop100Index((prev) => Math.min(prev + 1, maxTop100Index));
  };

  return (
    <div className="main-bg">
      <aside className="sidebar">
        <div className="logo">
          <span className="logo-icon">🎵</span>
          <span className="logo-text">laomusic</span>
        </div>
        <nav className="menu">
          {sidebarMenu.map((item, idx) => (
            <div key={item.label} className={`menu-item${item.active ? ' active' : ''}`}> 
              <span className="menu-icon">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>
      <div className="content">
        <header className="header">
          <input className="search" placeholder="What do you want to listen to?" />
          <button className="login-btn">Login</button>
        </header>
        <div className="section">
          <h2>What to listen today</h2>
          <div className="slider-wrapper left-align">
            <button className="slider-arrow left" onClick={handlePrev} disabled={currentIndex === 0}>&lt;</button>
            <div className="album-list-viewport">
              <div className="album-list horizontal-slider slider-no-scroll">
                {listenToday.slice(currentIndex, currentIndex + visibleCount).map((item, idx) => (
                  <div className="album-item" key={idx} onClick={() => handlePlaySong(currentIndex + idx)} style={{cursor: 'pointer'}}>
                    <div className="album-img">
                      <img src={item.img} alt={item.title} />
                    </div>
                    <div className="album-info-hover">
                      <div className="album-title-hover2">{item.title}</div>
                      <div className="album-artist-hover2">{item.artist}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="slider-arrow right" onClick={handleNext} disabled={currentIndex === maxIndex}>&gt;</button>
          </div>
        </div>
        <div className="section">
          <div className="section-header">
            <h2>TOP 100 Music</h2>
            <span className="see-more">See more &gt;</span>
          </div>
          <div className="slider-wrapper left-align">
            <button className="slider-arrow left" onClick={handleTop100Prev} disabled={top100Index === 0}>&lt;</button>
            <div className="album-list-viewport">
              <div className="album-list horizontal-slider slider-no-scroll">
                {top100.slice(top100Index, top100Index + visibleCount).map((item, idx) => (
                  <div className="album-item" key={idx}>
                    <div className="album-img">
                      <img src={item.img} alt={item.title} />
                    </div>
                    <div className="album-title">{item.title}</div>
                    <div className="album-artist">{item.artist}</div>
                  </div>
                ))}
              </div>
            </div>
            <button className="slider-arrow right" onClick={handleTop100Next} disabled={top100Index === maxTop100Index}>&gt;</button>
          </div>
        </div>
      </div>
      {currentSongIndex !== null && (
        <MusicPlayer
          song={listenToday[currentSongIndex]}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}

export default App;
