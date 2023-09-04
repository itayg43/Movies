import {createAsyncThunk} from '@reduxjs/toolkit';

import {RootState, AppDispatch} from '../store';
import errorHandlerUtil from '../../utils/errorHandlerUtil';
import {WatchListEntities} from '../../types';
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

export default {
  getWatchList,
};
