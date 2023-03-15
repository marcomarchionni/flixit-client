import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Movie } from '../../interfaces/interfaces';
import { MOVIES_URL } from '../../utils/api-urls';
import Header from '../header/header';
import LoginView from '../login-view/login-view';
import MovieGrid from '../movie-grid/movie-grid';
import MovieInfo from '../movie-info/movie-info';
import SignupView from '../signup-view/signup-view';

const MainView = () => {
  const storedUser = localStorage.getItem('user');
  const storedToken = localStorage.getItem('token');
  const storedMovie = localStorage.getItem('selectedMovie');
  const [user, setUser] = useState<string>(
    storedUser ? JSON.parse(storedUser) : ''
  );
  const [token, setToken] = useState<string>(
    storedToken ? JSON.parse(storedToken) : ''
  );
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(
    storedMovie ? JSON.parse(storedMovie) : null
  );
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loadingMovies, setLoadingMovies] = useState(false);

  const handleLogin = (dataUser: string, dataToken: string) => {
    setUser(dataUser);
    localStorage.setItem('user', JSON.stringify(dataUser));
    setToken(dataToken);
    localStorage.setItem('token', JSON.stringify(dataToken));
  };

  const handleLogout = () => {
    setUser('');
    setToken('');
    setSelectedMovie(null);
    localStorage.clear();
  };

  const showMovieInfo = (movie: Movie) => {
    setSelectedMovie(movie);
    localStorage.setItem('selectedMovie', JSON.stringify(movie));
  };

  const showHome = () => {
    setSelectedMovie(null);
    localStorage.removeItem('selectedMovie');
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
    <>
      <Header
        isLogged={!!user}
        handleShowHome={showHome}
        handleLogout={handleLogout}
      />
      <Row className="justify-content-md-center mt-4">
        <Col xl={9}>
          {!user ? (
            <Row>
              <LoginView onLoggedIn={handleLogin} />
              <SignupView />
            </Row>
          ) : selectedMovie ? (
            <MovieInfo
              movie={selectedMovie}
              movies={movies}
              showMovieInfo={showMovieInfo}
            />
          ) : (
            <MovieGrid
              movies={movies}
              loadingMovies={loadingMovies}
              showMovieInfo={showMovieInfo}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default MainView;
