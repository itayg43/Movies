import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {Movie} from '../../entities/Movie';

export enum MoviesStatus {
  idle,
  loading,
  error,
}

export interface MoviesEntities {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
}

interface MoviesState {
  status: MoviesStatus;
  errorMessage: string;
  entities: MoviesEntities | null;
  searchQuery: string;
  searchResults: Movie[] | null;
}

const initialState: MoviesState = {
  status: MoviesStatus.idle,
  errorMessage: '',
  entities: null,
  searchQuery: '',
  searchResults: null,
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    // get movies
    getMovies: state => {
      state.status = MoviesStatus.loading;
    },
    getMoviesSuccess: (state, action: PayloadAction<MoviesEntities>) => {
      state.status = MoviesStatus.idle;
      state.entities = action.payload;
    },
    getMoviesFail: (state, action: PayloadAction<string>) => {
      state.status = MoviesStatus.error;
      state.errorMessage = action.payload;
    },

    // update search query
    updateSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    // get search results
    getSearchResults: state => {
      state.status = MoviesStatus.loading;
    },
    getSearchResultsSuccess: (state, action: PayloadAction<Movie[]>) => {
      state.status = MoviesStatus.idle;
      state.searchResults = action.payload;
    },
    getSearchResultsFail: (state, action: PayloadAction<string>) => {
      state.status = MoviesStatus.error;
      state.errorMessage = action.payload;
    },

    // reset search results
    resetSearchResultsValue: state => {
      state.searchResults = null;
    },
  },
});

export const {
  getMovies,
  getMoviesSuccess,
  getMoviesFail,
  updateSearchQuery,
  getSearchResults,
  getSearchResultsSuccess,
  getSearchResultsFail,
  resetSearchResultsValue,
} = moviesSlice.actions;

export default moviesSlice.reducer;
