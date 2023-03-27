import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from '../../components/header/header';
import BodyWrapper from '../../components/layout/body-wrapper';
import SignupView from '../../components/signup-view/signup-view';
import { Movie } from '../../interfaces/interfaces';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setLoading } from '../../redux/reducers/loading';
import { setMovies } from '../../redux/reducers/movies';
import { selectToken } from '../../redux/reducers/token';
import { selectUser } from '../../redux/reducers/user';
import { MOVIES_URL } from '../../utils/api-urls';
import FavouritesView from '../favourites-view/favourites-view';
import LoginView from '../login-view/login-view';
import MovieInfoView from '../movie-info-view/movie-info-view';
import MoviesView from '../movies-view/movies-view';
import ProfileView from '../profile-view/profile-view';

const MainView = () => {
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token) {
      return;
    }
    dispatch(setLoading(true));
    fetch(MOVIES_URL, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => response.json())
      .then((movieData: Movie[]) => {
        dispatch(setMovies(movieData));
        dispatch(setLoading(false));
      })
      .catch((err: Error) => console.error(err));
  }, [token]);

  return (
    <BrowserRouter>
      <BodyWrapper>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/movies" />}></Route>
          <Route
            path="/signup"
            element={user ? <Navigate to="/movies" /> : <SignupView />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/movies" /> : <LoginView />}
          />
          <Route path={'/users/:username/profile'} element={<ProfileView />} />
          <Route
            path={'/users/:username/favourites'}
            element={<FavouritesView />}
          />
          <Route
            path="/movies"
            element={!user ? <Navigate to="/login" /> : <MoviesView />}
          />
          <Route path={'/movies/:movieId'} element={<MovieInfoView />} />
        </Routes>
      </BodyWrapper>
    </BrowserRouter>
  );
};

export default MainView;
