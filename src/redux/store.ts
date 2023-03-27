import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../redux/reducers/movies';
import userReducer from '../redux/reducers/user';
import tokenReducer from '../redux/reducers/token';
import loadingReducer from '../redux/reducers/loading';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    user: userReducer,
    token: tokenReducer,
    loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
