// API Configuration
export const API_CONFIG = {
  // Set to true to use mock data only (no API calls)
  USE_MOCK_ONLY: true,
  
  // API Base URL
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  
  // Timeout for API calls (in milliseconds)
  TIMEOUT: 5000,
  
  // Retry settings
  RETRY_ATTEMPTS: 0, // Set to 0 to disable retries
  
  // Cache settings
  STALE_TIME: {
    RECOMMENDED_SONGS: 5 * 60 * 1000, // 5 minutes
    TOP_100_PLAYLISTS: 10 * 60 * 1000, // 10 minutes
    TOP_GENRES: 15 * 60 * 1000, // 15 minutes
    TOP_ARTISTS: 10 * 60 * 1000, // 10 minutes
    SEARCH: 2 * 60 * 1000, // 2 minutes
  },
  
  GC_TIME: {
    RECOMMENDED_SONGS: 10 * 60 * 1000, // 10 minutes
    TOP_100_PLAYLISTS: 30 * 60 * 1000, // 30 minutes
    TOP_GENRES: 60 * 60 * 1000, // 1 hour
    TOP_ARTISTS: 30 * 60 * 1000, // 30 minutes
    SEARCH: 5 * 60 * 1000, // 5 minutes
  },
}; 