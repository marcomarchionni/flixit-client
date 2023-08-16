import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../../types/interfaces';
import type { RootState } from '../store';

interface MoviesState {
  value: Movie[];
}

const initialState: MoviesState = {
  value: [],
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setMovies } = moviesSlice.actions;
export const selectMovies = (state: RootState) => state.movies.value;

export default moviesSlice.reducer;
