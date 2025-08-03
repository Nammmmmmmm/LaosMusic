// Types cho Song
export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number;
  imageUrl: string;
  audioUrl: string;
  genre?: string;
  releaseDate?: string;
}

// Types cho Playlist
export interface Playlist {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  songCount: number;
  creator?: string;
  isPublic: boolean;
}

// Types cho Artist
export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  bio?: string;
  followerCount: number;
  songCount: number;
}

// Types cho Genre
export interface Genre {
  id: string;
  name: string;
  imageUrl: string;
  description?: string;
  songCount: number;
}

// Types cho API Responses
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Types cho Search
export interface SearchParams {
  query: string;
  page?: number;
  limit?: number;
  type?: 'songs' | 'artists' | 'playlists' | 'albums';
}

// Types cho Home Page Data
export interface HomePageData {
  recommendedSongs: Song[];
  top100Playlists: Playlist[];
  topGenres: Genre[];
  topArtists: Artist[];
} 