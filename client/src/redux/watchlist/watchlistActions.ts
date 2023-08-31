import {createAsyncThunk} from '@reduxjs/toolkit';

import {RootState, AppDispatch} from '../store';
import watchlistService from '../../services/watchlistService';
import errorHandlerUtil from '../../utils/errorHandlerUtil';
import {WatchlistEntities} from '../../types';

const definedCreateAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
}>();

const getWatchlist = definedCreateAsyncThunk<WatchlistEntities, void>(
  'watchlist/getWatchlist',
  async (_, {rejectWithValue}) => {
    try {
      const watchlist = await watchlistService.getWatchlist();

      return watchlist.reduce(
        (entities, currWatchlist) => ({
          ...entities,
          [currWatchlist.id]: currWatchlist,
        }),
        {},
      );
    } catch (error) {
      const message = errorHandlerUtil.extractMessage(error);
      return rejectWithValue(message);
    }
  },
);

export default {
  getWatchlist,
};
