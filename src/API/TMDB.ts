import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IMovie} from '@rredux/Reducers/configs/types';

const API_KEY: string = '918026d985ab80afa1ae6f0b53c6aa70';

interface IResponse {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export const tmdbAPI = createApi({
  reducerPath: 'tmdbAPI',
  baseQuery: fetchBaseQuery({baseUrl: 'https://api.themoviedb.org/3'}),
  endpoints: builder => ({
    getGenres: builder.query({
      query: () => `/genre/movie/list?api_key=${API_KEY}`,
    }),
    getPopularMovies: builder.query<IResponse, number>({
      query: (page: number) => ({
        url: '/movie/popular',
        params: {
          api_key: API_KEY,
          page: page,
        },
      }),
    }),
  }),
});

export const {useGetGenresQuery, useGetPopularMoviesQuery} = tmdbAPI;
