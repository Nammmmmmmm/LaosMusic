import React, { useState, useRef, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSearchSongs } from '../api/hooks';
import { Song } from '../api/types';
import './Search.css';

interface SearchProps {
  onSongSelect: (song: Song) => void;
}

const Search: React.FC<SearchProps> = ({ onSongSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const { ref: loadMoreRef, inView } = useInView();

  // Debounce search query
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useSearchSongs({
    query: debouncedQuery,
    limit: 20,
  });

  // Load more when scroll to bottom
  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Flatten all pages data
  const allSongs = data?.pages.flatMap(page => page.data) || [];

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (isError) {
    return (
      <div className="search-container">
        <div className="search-header">
          <input
            type="text"
            placeholder="Tìm kiếm bài hát, nghệ sĩ, album..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="search-error">
          <p>Có lỗi xảy ra khi tìm kiếm. Vui lòng thử lại.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="search-container">
      <div className="search-header">
        <input
          type="text"
          placeholder="Tìm kiếm bài hát, nghệ sĩ, album..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="search-results">
        {isLoading && debouncedQuery && (
          <div className="loading">
            <p>Đang tìm kiếm...</p>
          </div>
        )}

        {!debouncedQuery && (
          <div className="search-placeholder">
            <p>Nhập từ khóa để tìm kiếm bài hát</p>
          </div>
        )}

        {debouncedQuery && allSongs.length === 0 && !isLoading && (
          <div className="no-results">
            <p>Không tìm thấy kết quả cho "{debouncedQuery}"</p>
          </div>
        )}

        {allSongs.length > 0 && (
          <div className="songs-list">
            {allSongs.map((song, index) => (
              <div
                key={`${song.id}-${index}`}
                className="song-item"
                onClick={() => onSongSelect(song)}
              >
                <div className="song-image">
                  <img src={song.imageUrl} alt={song.title} />
                  <div className="play-overlay">
                    <span>▶</span>
                  </div>
                </div>
                <div className="song-info">
                  <div className="song-title">{song.title}</div>
                  <div className="song-artist">{song.artist}</div>
                  {song.genre && <div className="song-genre">{song.genre}</div>}
                </div>
                <div className="song-duration">
                  {formatDuration(song.duration)}
                </div>
              </div>
            ))}

            {/* Load more trigger */}
            {hasNextPage && (
              <div ref={loadMoreRef} className="load-more-trigger">
                {isFetchingNextPage ? (
                  <p>Đang tải thêm...</p>
                ) : (
                  <p>Cuộn xuống để tải thêm</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search; 