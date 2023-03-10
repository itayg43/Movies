import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';

import appReducer from './app/appSlice';
import moviesReducer from './movies/moviesSlice';
import movieReducer from './movie/movieSlice';

const reducer = {
  app: appReducer,
  movies: moviesReducer,
  movie: movieReducer,
};

const additionalMiddlewares: any[] = [];
if (process.env.NODE_ENV === 'development') {
  additionalMiddlewares.push(logger);
}

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(additionalMiddlewares),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
