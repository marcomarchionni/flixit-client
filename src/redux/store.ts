import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../redux/reducers/movies';
import userReducer from '../redux/reducers/user';

export const store = configureStore({
  reducer: { movies: moviesReducer, user: userReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
