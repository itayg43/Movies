import {configureStore, createAsyncThunk} from '@reduxjs/toolkit';

import authReducer from './auth/authSlice';

const additionalMiddlewares: any[] = [];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  additionalMiddlewares.push(createDebugger());
}

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(additionalMiddlewares),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const definedCreateAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
}>();

export default store;
