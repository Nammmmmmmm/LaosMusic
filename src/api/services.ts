import api from './axios';
import { 
  Song, 
  Playlist, 
  Artist, 
  Genre, 
  ApiResponse, 
  PaginatedResponse, 
  SearchParams,
  HomePageData 
} from './types';

// API Services
export const songService = {
  // Lấy danh sách bài hát được đề xuất
  getRecommendedSongs: async (): Promise<Song[]> => {
    const response = await api.get<ApiResponse<Song[]>>('/songs/recommended');
    return response.data.data;
  },

  // Tìm kiếm bài hát với infinite scroll
  searchSongs: async (params: SearchParams): Promise<PaginatedResponse<Song>> => {
    const response = await api.get<PaginatedResponse<Song>>('/search/songs', {
      params: {
        q: params.query,
        page: params.page || 1,
        limit: params.limit || 20,
      }
    });
    return response.data;
  },
};

export const playlistService = {
  // Lấy danh sách top 100 playlist
  getTop100Playlists: async (): Promise<Playlist[]> => {
    const response = await api.get<ApiResponse<Playlist[]>>('/playlists/top100');
    return response.data.data;
  },
};

export const artistService = {
  // Lấy danh sách nghệ sĩ yêu thích
  getTopFavouriteArtists: async (): Promise<Artist[]> => {
    const response = await api.get<ApiResponse<Artist[]>>('/artists/top-favourite');
    return response.data.data;
  },
};

export const genreService = {
  // Lấy danh sách thể loại hàng đầu
  getTopGenresPlaylists: async (): Promise<Genre[]> => {
    const response = await api.get<ApiResponse<Genre[]>>('/genres/top-genres-playlists');
    return response.data.data;
  },
};

export const searchService = {
  // Tìm kiếm tổng hợp
  search: async (params: SearchParams): Promise<PaginatedResponse<Song>> => {
    const response = await api.get<PaginatedResponse<Song>>('/search/songs', {
      params: {
        q: params.query,
        page: params.page || 1,
        limit: params.limit || 20,
        type: params.type || 'songs',
      }
    });
    return response.data;
  },
};

// Mock data cho development (khi chưa có API thật)
export const mockData = {
  recommendedSongs: [
    {
      id: '1',
      title: 'HÃY TRAO CHO ANH',
      artist: 'Sơn Tùng M-TP',
      duration: 240,
      imageUrl: '/img/a1.jpg',
      audioUrl: '/Sounds/HayTraoChoAnh-SonTungMTPSnoopDogg-6010660.mp3',
      genre: 'Pop',
    },
    {
      id: '2',
      title: 'CHÚNG TA CỦA HIỆN TẠI',
      artist: 'Sơn Tùng M-TP',
      duration: 235,
      imageUrl: '/img/a2.jpg',
      audioUrl: '/Sounds/ChungTaCuaHienTai-SonTungMTP-6892340.mp3',
      genre: 'Pop',
    },
    {
      id: '3',
      title: 'MUỘN RỒI MÀ SAO CÒN',
      artist: 'Sơn Tùng M-TP',
      duration: 228,
      imageUrl: '/img/a3.jpg',
      audioUrl: '/Sounds/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3',
      genre: 'Pop',
    },
    {
      id: '4',
      title: 'CƯƠN MƯA NGANG QUA',
      artist: 'Sơn Tùng M-TP',
      duration: 245,
      imageUrl: '/img/a4.jpg',
      audioUrl: '/Sounds/ConMuaNgangQua-SonTungMTP-1142953.mp3',
      genre: 'Pop',
    },
    {
      id: '5',
      title: '1000 ÁNH MẮT',
      artist: 'Sơn Tùng M-TP',
      duration: 232,
      imageUrl: '/img/a5.jpg',
      audioUrl: '/Sounds/1000anhmat.mp3',
      genre: 'Pop',
    },
    {
      id: '6',
      title: 'CÓ CHẮC YÊU LÀ ĐÂY',
      artist: 'Sơn Tùng M-TP',
      duration: 238,
      imageUrl: '/img/a6.jpg',
      audioUrl: '/Sounds/CoChacYeuLaDayOnionnRemix-SonTungMTPOnionn-7022615.mp3',
      genre: 'Pop',
    },
    {
      id: '7',
      title: 'NƠI NÀY CÓ ANH',
      artist: 'Sơn Tùng M-TP',
      duration: 242,
      imageUrl: '/img/a7.jpg',
      audioUrl: '/Sounds/NoiNayCoAnh-SonTungMTP-4772041.mp3',
      genre: 'Pop',
    },
  ] as Song[],

  top100Playlists: [
    { id: '1', title: 'Nhạc Phim', imageUrl: '/img/a1.jpg', songCount: 50, creator: 'Lưu Vũ Ninh', isPublic: true },
    { id: '2', title: 'Top100Today', imageUrl: '/img/a2.jpg', songCount: 100, creator: 'Ali Hoàng Dương, Đậu Tất Đạt', isPublic: true },
    { id: '3', title: 'TOP100TUANMOI', imageUrl: '/img/a3.jpg', songCount: 100, creator: 'Ali Hoàng Dương, Đậu Tất Đạt', isPublic: true },
    { id: '4', title: 'TOP100 THÁNG 4', imageUrl: '/img/a4.jpg', songCount: 100, creator: 'Ali Hoàng Dương, Đậu Tất Đạt', isPublic: true },
    { id: '5', title: 'testTop100_01', imageUrl: '/img/a5.jpg', songCount: 100, creator: 'Giang Hồng Ngọc, Ali Hoàng Dương', isPublic: true },
    { id: '6', title: 'testTop100', imageUrl: '/img/a6.jpg', songCount: 100, creator: 'Giang Hồng Ngọc, Ali Hoàng Dương', isPublic: true },
  ] as Playlist[],

  topGenres: [
    { id: '1', name: 'Pop', imageUrl: '/img/a1.jpg', songCount: 1500 },
    { id: '2', name: 'Rock', imageUrl: '/img/a2.jpg', songCount: 800 },
    { id: '3', name: 'Hip Hop', imageUrl: '/img/a3.jpg', songCount: 600 },
    { id: '4', name: 'Electronic', imageUrl: '/img/a4.jpg', songCount: 400 },
    { id: '5', name: 'Jazz', imageUrl: '/img/a5.jpg', songCount: 300 },
    { id: '6', name: 'Classical', imageUrl: '/img/a6.jpg', songCount: 200 },
  ] as Genre[],

  topArtists: [
    { id: '1', name: 'Sơn Tùng M-TP', imageUrl: '/img/a1.jpg', followerCount: 5000000, songCount: 50 },
    { id: '2', name: 'Đen Vâu', imageUrl: '/img/a2.jpg', followerCount: 3000000, songCount: 30 },
    { id: '3', name: 'Min', imageUrl: '/img/a3.jpg', followerCount: 2000000, songCount: 25 },
    { id: '4', name: 'Erik', imageUrl: '/img/a4.jpg', followerCount: 1800000, songCount: 20 },
    { id: '5', name: 'Chi Pu', imageUrl: '/img/a5.jpg', followerCount: 1500000, songCount: 15 },
    { id: '6', name: 'Justatee', imageUrl: '/img/a6.jpg', followerCount: 1200000, songCount: 18 },
  ] as Artist[],
}; 