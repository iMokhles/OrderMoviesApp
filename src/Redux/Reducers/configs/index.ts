import {createSlice} from '@reduxjs/toolkit';

import {ConfigState} from './types';

const initialState: Partial<ConfigState> = {
  selectedMovie: undefined,
  selectedGenre: undefined,
};

const configsSlice = createSlice({
  name: 'configs',
  initialState,
  reducers: {
    selectMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
    selectGenre: (state, action) => {
      state.selectedGenre = action.payload;
    },
  },
});

export const {selectMovie, selectGenre} = configsSlice.actions;
export default configsSlice.reducer;
