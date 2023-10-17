import {configureStore} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from 'redux-persist';
import {persistedReducer} from './Reducers';
import {tmdbAPI} from '@api/TMDB';

const defaultMiddlewareOptions = {
  immutableCheck: false,
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    warnAfter: 60,
  },
};

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware(defaultMiddlewareOptions).concat(tmdbAPI.middleware),
});

export const persistor = persistStore(store);
