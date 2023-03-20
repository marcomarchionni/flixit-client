import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Movie, User } from '../../interfaces/interfaces';
import { MOVIES_URL } from '../../utils/api-urls';
import Header from '../header/header';
import LoginView from '../login-view/login-view';
import MovieGrid from '../movie-grid/movie-grid';
import MovieInfo from '../movie-info/movie-info';
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
      <Container fluid className="bg-dark min-vh-100">
        <Header user={user} handleLogout={handleLogout} />
        <Row className="justify-content-md-center mt-4 fi-padding-top">
          <Col xl={9}>
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
                path="/movies"
                element={
                  !user ? (
                    <Navigate to="/login" />
                  ) : (
                    <MovieGrid movies={movies} loadingMovies={loadingMovies} />
                  )
                }
              />
              <Route
                path={'/movies/:movieId'}
                element={
                  !user ? (
                    <Navigate to="/login" />
                  ) : (
                    <MovieInfo movies={movies} />
                  )
                }
              />
            </Routes>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
};

export default MainView;
