# API Integration Guide

## Tổng quan

Dự án đã được tích hợp với React Query và Axios để gọi các API endpoints sau:

### API Endpoints

1. **Nghe gì hôm nay**: `GET /songs/recommended`
2. **Nhạc top 100**: `GET /playlists/top100`
3. **Các chủ đề tiếp theo**: `GET /genres/top-genres-playlists`
4. **Ca sỹ yêu thích**: `GET /artists/top-favourite`
5. **Tìm kiếm bài hát**: `GET /search/songs` (với infinite scroll)

## Cấu trúc thư mục

```
src/
├── api/
│   ├── axios.ts          # Cấu hình Axios instance
│   ├── types.ts          # TypeScript interfaces
│   ├── services.ts       # API service functions
│   └── hooks.ts          # React Query hooks
├── components/
│   ├── Home.tsx          # Component trang chủ
│   ├── Search.tsx        # Component tìm kiếm
│   ├── Home.css          # Styles cho Home
│   └── Search.css        # Styles cho Search
└── App.tsx               # Component chính với React Query Provider
```

## Cách sử dụng

### 1. Cấu hình API Base URL

Trong file `src/api/axios.ts`, bạn có thể thay đổi base URL:

```typescript
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  // ...
});
```

Hoặc tạo file `.env`:

```env
REACT_APP_API_URL=http://your-api-domain.com/api
```

### 2. Sử dụng trong Components

#### Home Component
```typescript
import { useHomePageData } from '../api/hooks';

const Home = () => {
  const { recommendedSongs, top100Playlists, topGenres, topArtists, isLoading, isError } = useHomePageData();
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  
  return (
    // Render your UI with data
  );
};
```

#### Search Component với Infinite Scroll
```typescript
import { useSearchSongs } from '../api/hooks';

const Search = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useSearchSongs({
    query: 'search term',
    limit: 20,
  });
  
  // Flatten all pages data
  const allSongs = data?.pages.flatMap(page => page.data) || [];
  
  return (
    // Render search results with infinite scroll
  );
};
```

### 3. Error Handling

Tất cả các API calls đều có error handling và fallback về mock data:

```typescript
export const useRecommendedSongs = () => {
  return useQuery({
    queryKey: ['recommended-songs'],
    queryFn: async () => {
      try {
        return await songService.getRecommendedSongs();
      } catch (error) {
        // Fallback to mock data if API fails
        console.warn('API failed, using mock data:', error);
        return mockData.recommendedSongs;
      }
    },
  });
};
```

### 4. React Query Configuration

Trong `App.tsx`, React Query được cấu hình với:

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000,   // 10 minutes
      retry: 1,
    },
  },
});
```

## API Response Format

### Songs
```typescript
interface Song {
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
```

### Playlists
```typescript
interface Playlist {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  songCount: number;
  creator?: string;
  isPublic: boolean;
}
```

### Artists
```typescript
interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  bio?: string;
  followerCount: number;
  songCount: number;
}
```

### Genres
```typescript
interface Genre {
  id: string;
  name: string;
  imageUrl: string;
  description?: string;
  songCount: number;
}
```

## Search API với Infinite Scroll

Search API hỗ trợ pagination và infinite scroll:

```typescript
// Request
GET /search/songs?q=search_term&page=1&limit=20

// Response
{
  data: Song[],
  pagination: {
    page: number,
    limit: number,
    total: number,
    totalPages: number
  }
}
```

## Mock Data

Khi API chưa sẵn sàng, ứng dụng sẽ sử dụng mock data có sẵn trong `src/api/services.ts`. Bạn có thể cập nhật mock data này để test UI.

## Development

1. Cài đặt dependencies:
```bash
npm install @tanstack/react-query axios react-intersection-observer
```

2. Chạy ứng dụng:
```bash
npm start
```

3. Kiểm tra console để xem API calls và errors.

## Troubleshooting

1. **API không hoạt động**: Kiểm tra base URL trong `axios.ts`
2. **CORS errors**: Đảm bảo API server cho phép CORS
3. **Type errors**: Kiểm tra TypeScript interfaces trong `types.ts`
4. **Infinite scroll không hoạt động**: Kiểm tra `react-intersection-observer` setup

## Cách tắt/bật API calls

### Sử dụng Mock Data (Mặc định)
Trong file `src/api/config.ts`, set:
```typescript
USE_MOCK_ONLY: true
```

### Sử dụng API thật
Trong file `src/api/config.ts`, set:
```typescript
USE_MOCK_ONLY: false
```

Và cập nhật `BASE_URL` trong cùng file hoặc tạo file `.env`:
```env
REACT_APP_API_URL=http://your-api-domain.com/api
```

## Lưu ý
- Khi `USE_MOCK_ONLY: true`, không có API calls nào được thực hiện
- Search sẽ hoạt động với mock data và filter theo title/artist
- Tất cả data sẽ được load ngay lập tức từ mock data 