import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../redux/reducers/movies';
import userReducer from '../redux/reducers/user';
import tokenReducer from '../redux/reducers/token';
import loadingReducer from '../redux/reducers/loading';
import alertReducer from './reducers/loginAlert';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    user: userReducer,
    token: tokenReducer,
    loading: loadingReducer,
    loginAlert: alertReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
