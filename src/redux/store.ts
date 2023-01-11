import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';

import appReducer from './app/appSlice';
import moviesReducer from './movies/moviesSlice';

const reducer = {
  app: appReducer,
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
