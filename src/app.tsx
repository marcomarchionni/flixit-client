import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import BodyLayout from './components/ui/body-layout';
import { Movie } from './interfaces/interfaces';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { setLoading } from './redux/reducers/loading';
import { setMovies } from './redux/reducers/movies';
import { selectToken } from './redux/reducers/token';
import { selectUser } from './redux/reducers/user';
import { MOVIES_URL } from './utils/urls';
import SignupView from './views/signup-view/signup-view';
import FavouritesView from './views/favourites-view/favourites-view';
import LoginView from './views/login-view/login-view';
import MovieInfoView from './views/movie-info-view/movie-info-view';
import MoviesView from './views/movies-view/movies-view';
import ProfileView from './views/profile-view/profile-view';
import SearchView from './views/search-view/search-view';

const App = () => {
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
    <BodyLayout>
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
        <Route
          path={'/users/:username/profile'}
          element={!user ? <Navigate to="/login" /> : <ProfileView />}
        />
        <Route
          path={'/users/:username/favourites'}
          element={!user ? <Navigate to="/login" /> : <FavouritesView />}
        />
        <Route
          path="/movies"
          element={!user ? <Navigate to="/login" /> : <MoviesView />}
        />
        <Route
          path={'/search/:query'}
          element={!user ? <Navigate to="/login" /> : <SearchView />}
        />
        <Route
          path={'/movies/:movieId'}
          element={!user ? <Navigate to="/login" /> : <MovieInfoView />}
        />
      </Routes>
    </BodyLayout>
  );
};

export default App;
