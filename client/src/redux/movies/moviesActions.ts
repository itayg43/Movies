import {createAsyncThunk} from '@reduxjs/toolkit';

import {RootState, AppDispatch} from '../store';
import moviesService from '../../services/moviesService';
import errorHandlerUtil from '../../utils/errorHandlerUtil';
import {MovieEntities} from './moviesSlice';

const definedCreateAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
}>();

const getMovies = definedCreateAsyncThunk<MovieEntities, void>(
  'movies/getMoives',
  async (_, {rejectWithValue}) => {
    try {
      const movies = await moviesService.getMovies();

      return movies.reduce((entities, currMovie) => ({
        ...entities,
        [currMovie.id]: currMovie,
      }));
    } catch (error) {
      const message = errorHandlerUtil.extractMessage(error);
      return rejectWithValue(message);
    }
  },
);

export default {
  getMovies,
};
