import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Movie, User } from '../../interfaces/interfaces';
import { buildFavouriteUrl, MOVIES_URL } from '../../utils/api-urls';
import Header from '../header/header';
import BodyWrapper from '../layout/body-wrapper';
import LoginView from '../login-view/login-view';
import MovieGrid from '../movie-grid/movie-grid';
import MovieInfo from '../movie-info/movie-info';
import FavouritesView from '../favourites-view/favourites-view';
import ProfileView from '../profile/profile-view';
import SignupView from '../signup-view/signup-view';

const MainView = () => {
  const storedUser = localStorage.getItem('user');
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState<User | null>(
    storedUser ? JSON.parse(storedUser) : null
  );
  const [token, setToken] = useState<string>(
    storedToken ? JSON.parse(storedToken) : ''
  );
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loadingMovies, setLoadingMovies] = useState(false);

  const handleLogin = (dataUser: User, dataToken: string) => {
    setUser(dataUser);
    localStorage.setItem('user', JSON.stringify(dataUser));
    setToken(dataToken);
    localStorage.setItem('token', JSON.stringify(dataToken));
  };

  const handleLogout = () => {
    setUser(null);
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
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      })
      .catch((err: Error) => console.error(err));
  };

  useEffect(() => {
    if (!token) {
      return;
    }
    setLoadingMovies(true);
    fetch(MOVIES_URL, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => response.json())
      .then((movieData: Movie[]) => {
        setMovies(movieData);
        setLoadingMovies(false);
      })
      .catch((err: Error) => console.error(err));
  }, [token]);

  return (
    <BrowserRouter>
      <BodyWrapper>
        <Header user={user} handleLogout={handleLogout} />
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
                <ProfileView user={user} handleLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path={'/users/:username/favourites'}
            element={
              user ? (
                <FavouritesView
                  user={user}
                  movies={movies}
                  toggleFavourite={toggleFavourite}
                />
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
                <MovieGrid
                  user={user}
                  movies={movies}
                  loading={loadingMovies}
                  noMoviesAlert="NoMovies"
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
                <MovieInfo
                  user={user}
                  movies={movies}
                  toggleFavourite={toggleFavourite}
                />
              )
            }
          />
        </Routes>
      </BodyWrapper>
    </BrowserRouter>
  );
};

export default MainView;
