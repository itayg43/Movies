import {createAsyncThunk} from '@reduxjs/toolkit';

import {RootState, AppDispatch} from '../store';
import errorHandlerUtil from '../../utils/errorHandlerUtil';
import {WatchList, WatchListEntities} from '../../types';
import watchListService from '../../services/watchListService';

const definedCreateAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
}>();

const getWatchList = definedCreateAsyncThunk<WatchListEntities, void>(
  'watchList/getWatchList',
  async (_, {rejectWithValue}) => {
    try {
      const watchList = await watchListService.getWatchList();

      return watchList.reduce(
        (entities, currWatchList) => ({
          ...entities,
          [currWatchList.id]: currWatchList,
        }),
        {},
      );
    } catch (error) {
      const message = errorHandlerUtil.extractMessage(error);
      return rejectWithValue(message);
    }
  },
);

const addWatchList = definedCreateAsyncThunk<WatchList, number>(
  'watchList/addWatchList',
  async (movieId, {rejectWithValue}) => {
    try {
      return await watchListService.addWatchList(movieId);
    } catch (error) {
      const message = errorHandlerUtil.extractMessage(error);
      return rejectWithValue(message);
    }
  },
);

const removeWatchList = definedCreateAsyncThunk<number, number>(
  'watchList/removeWatchList',
  async (id, {rejectWithValue}) => {
    try {
      await watchListService.removeWatchList(id);

      return id;
    } catch (error) {
      const message = errorHandlerUtil.extractMessage(error);
      return rejectWithValue(message);
    }
  },
);

export default {
  getWatchList,
  addWatchList,
  removeWatchList,
};
