import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from './auth/authSlice';

const additionalMiddlewares: any[] = [];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  additionalMiddlewares.push(createDebugger());
}

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const authPersistedReducer = persistReducer(authPersistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: authPersistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(additionalMiddlewares),
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
