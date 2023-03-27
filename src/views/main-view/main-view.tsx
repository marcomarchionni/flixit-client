import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Movie, User } from '../../interfaces/interfaces';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setMovies } from '../../redux/reducers/movies';
import { buildFavouriteUrl, MOVIES_URL } from '../../utils/api-urls';
import FavouritesView from '../favourites-view/favourites-view';
import MoviesView from '../movies-view/movies-view';
import Header from '../../components/header/header';
import BodyWrapper from '../../components/layout/body-wrapper';
import LoginView from '../login-view/login-view';
import MovieInfo from '../movie-info-view/movie-info-view';
import ProfileView from '../profile-view/profile-view';
import SignupView from '../../components/signup-view/signup-view';
import { selectUser, setUser } from '../../redux/reducers/user';

const MainView = () => {
  const storedToken = localStorage.getItem('token');
  const [token, setToken] = useState<string>(
    storedToken ? JSON.parse(storedToken) : ''
  );
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const handleLogin = (dataUser: User, dataToken: string) => {
    dispatch(setUser(dataUser));
    localStorage.setItem('user', JSON.stringify(dataUser));
    setToken(dataToken);
    localStorage.setItem('token', JSON.stringify(dataToken));
  };

  const handleLogout = () => {
    dispatch(setUser(null));
    setToken('');
    localStorage.clear();
  };

  const toggleFavourite = (movieId: string) => {
    if (!user || !token) {
      return;
    }
    const favoriteUrl = buildFavouriteUrl(user.username, movieId);
    const movieIsFavourite = user.favouriteMovies.includes(movieId);
    const httpMethod = movieIsFavourite ? 'DELETE' : 'PUT';

    fetch(favoriteUrl, {
      method: httpMethod,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((updatedUser: User) => {
        dispatch(setUser(updatedUser));
        localStorage.setItem('user', JSON.stringify(updatedUser));
      })
      .catch((err: Error) => console.error(err));
  };

  useEffect(() => {
    if (!token) {
      return;
    }
    setLoading(true);
    fetch(MOVIES_URL, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => response.json())
      .then((movieData: Movie[]) => {
        dispatch(setMovies(movieData));
        setLoading(false);
      })
      .catch((err: Error) => console.error(err));
  }, [token]);

  return (
    <BrowserRouter>
      <BodyWrapper>
        <Header handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Navigate to="/movies" />}></Route>
          <Route
            path="/signup"
            element={user ? <Navigate to="/movies" /> : <SignupView />}
          />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/movies" />
              ) : (
                <LoginView onLoggedIn={handleLogin} />
              )
            }
          />
          <Route
            path={'/users/:username/profile'}
            element={
              user ? (
                <ProfileView handleLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path={'/users/:username/favourites'}
            element={
              user ? (
                <FavouritesView toggleFavourite={toggleFavourite} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/movies"
            element={
              !user ? (
                <Navigate to="/login" />
              ) : (
                <MoviesView
                  user={user}
                  loading={loading}
                  toggleFavourite={toggleFavourite}
                />
              )
            }
          />
          <Route
            path={'/movies/:movieId'}
            element={
              !user ? (
                <Navigate to="/login" />
              ) : (
                <MovieInfo user={user} toggleFavourite={toggleFavourite} />
              )
            }
          />
        </Routes>
      </BodyWrapper>
    </BrowserRouter>
  );
};

export default MainView;
