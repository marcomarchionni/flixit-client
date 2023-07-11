import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import BodyLayout from './components/layout/body-layout';
import { useMovies } from './hooks/use-movies';
import { useAppSelector } from './redux/hooks';
import { selectUser } from './redux/reducers/user';
import FavouritesView from './views/favourites-view/favourites-view';
import LoginView from './views/login-view/login-view';
import MovieInfoView from './views/movie-info-view/movie-info-view';
import MoviesView from './views/movies-view/movies-view';
import ProfileView from './views/profile-view/profile-view';
import SearchView from './views/search-view/search-view';
import SignupView from './views/signup-view/signup-view';

const App = () => {
  const user = useAppSelector(selectUser);
  useMovies();

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
