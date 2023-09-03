import {createAsyncThunk} from '@reduxjs/toolkit';

import {RootState, AppDispatch} from '../store';
import moviesService from '../../services/moviesService';
import errorHandlerUtil from '../../utils/errorHandlerUtil';
import {Movie, MoviesCategory} from '../../types';

const definedCreateAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
}>();

const getMoviesByCategory = definedCreateAsyncThunk<Movie[], MoviesCategory>(
  'movies/getMoviesByCategory',
  async (category, {rejectWithValue}) => {
    try {
      return await moviesService.getMoviesByCategory(category);
    } catch (error) {
      const message = errorHandlerUtil.extractMessage(error);
      return rejectWithValue(message);
    }
  },
);

export default {
  getMoviesByCategory,
};
