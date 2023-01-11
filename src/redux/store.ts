import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';

import moviesReducer from './movies/moviesSlice';

const reducer = {
  movies: moviesReducer,
};

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
