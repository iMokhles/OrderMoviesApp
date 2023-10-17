import {tmdbAPI} from '@api/TMDB';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';

export const rootReducer = combineReducers({
  [tmdbAPI.reducerPath]: tmdbAPI.reducer,
});

export const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['configs'],
  blacklist: [],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
