import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { 
  songService, 
  playlistService, 
  artistService, 
  genreService, 
  searchService,
  mockData 
} from './services';
import { SearchParams } from './types';
import { API_CONFIG } from './config';

// Hooks cho Home Page
export const useRecommendedSongs = () => {
  return useQuery({
    queryKey: ['recommended-songs'],
    queryFn: async () => {
      if (API_CONFIG.USE_MOCK_ONLY) {
        return mockData.recommendedSongs;
      }
      
      try {
        return await songService.getRecommendedSongs();
      } catch (error) {
        console.log('Using mock data for recommended songs');
        return mockData.recommendedSongs;
      }
    },
    staleTime: API_CONFIG.STALE_TIME.RECOMMENDED_SONGS,
    gcTime: API_CONFIG.GC_TIME.RECOMMENDED_SONGS,
    retry: API_CONFIG.RETRY_ATTEMPTS,
  });
};

export const useTop100Playlists = () => {
  return useQuery({
    queryKey: ['top100-playlists'],
    queryFn: async () => {
      if (API_CONFIG.USE_MOCK_ONLY) {
        return mockData.top100Playlists;
      }
      
      try {
        return await playlistService.getTop100Playlists();
      } catch (error) {
        console.log('Using mock data for top 100 playlists');
        return mockData.top100Playlists;
      }
    },
    staleTime: API_CONFIG.STALE_TIME.TOP_100_PLAYLISTS,
    gcTime: API_CONFIG.GC_TIME.TOP_100_PLAYLISTS,
    retry: API_CONFIG.RETRY_ATTEMPTS,
  });
};

export const useTopGenres = () => {
  return useQuery({
    queryKey: ['top-genres'],
    queryFn: async () => {
      if (API_CONFIG.USE_MOCK_ONLY) {
        return mockData.topGenres;
      }
      
      try {
        return await genreService.getTopGenresPlaylists();
      } catch (error) {
        console.log('Using mock data for top genres');
        return mockData.topGenres;
      }
    },
    staleTime: API_CONFIG.STALE_TIME.TOP_GENRES,
    gcTime: API_CONFIG.GC_TIME.TOP_GENRES,
    retry: API_CONFIG.RETRY_ATTEMPTS,
  });
};

export const useTopArtists = () => {
  return useQuery({
    queryKey: ['top-artists'],
    queryFn: async () => {
      if (API_CONFIG.USE_MOCK_ONLY) {
        return mockData.topArtists;
      }
      
      try {
        return await artistService.getTopFavouriteArtists();
      } catch (error) {
        console.log('Using mock data for top artists');
        return mockData.topArtists;
      }
    },
    staleTime: API_CONFIG.STALE_TIME.TOP_ARTISTS,
    gcTime: API_CONFIG.GC_TIME.TOP_ARTISTS,
    retry: API_CONFIG.RETRY_ATTEMPTS,
  });
};

// Hook cho Search với Infinite Scroll
export const useSearchSongs = (searchParams: SearchParams) => {
  return useInfiniteQuery({
    queryKey: ['search-songs', searchParams.query, searchParams.type],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      if (API_CONFIG.USE_MOCK_ONLY) {
        // Return mock search results
        const mockResults = mockData.recommendedSongs.filter(song => 
          song.title.toLowerCase().includes(searchParams.query.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchParams.query.toLowerCase())
        );
        
        return {
          data: mockResults.slice((pageParam - 1) * 20, pageParam * 20),
          pagination: {
            page: pageParam,
            limit: 20,
            total: mockResults.length,
            totalPages: Math.ceil(mockResults.length / 20),
          },
        };
      }
      
      try {
        return await searchService.search({
          ...searchParams,
          page: pageParam,
        });
      } catch (error) {
        console.log('Search API not available, returning empty results');
        return {
          data: [],
          pagination: {
            page: pageParam,
            limit: searchParams.limit || 20,
            total: 0,
            totalPages: 0,
          },
        };
      }
    },
    getNextPageParam: (lastPage: any) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    enabled: !!searchParams.query && searchParams.query.trim().length > 0,
    staleTime: API_CONFIG.STALE_TIME.SEARCH,
    gcTime: API_CONFIG.GC_TIME.SEARCH,
    retry: API_CONFIG.RETRY_ATTEMPTS,
  });
};

// Hook cho Home Page Data (combine all home data)
export const useHomePageData = () => {
  const recommendedSongs = useRecommendedSongs();
  const top100Playlists = useTop100Playlists();
  const topGenres = useTopGenres();
  const topArtists = useTopArtists();

  return {
    recommendedSongs,
    top100Playlists,
    topGenres,
    topArtists,
    isLoading: recommendedSongs.isLoading || top100Playlists.isLoading || topGenres.isLoading || topArtists.isLoading,
    isError: recommendedSongs.isError || top100Playlists.isError || topGenres.isError || topArtists.isError,
  };
}; 