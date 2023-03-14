import { useState, useEffect } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import { findRelatedMovies } from '../../utils/utils';
import { MOVIES_URL } from '../../utils/api-urls';
import LoginView from '../login-view/login-view';
import SignupView from '../signup-view/signup-view';
import React from 'react';
import { Movie } from '../../interfaces/interfaces';
import { Button, Col, Row } from 'react-bootstrap';

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

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    localStorage.setItem('selectedMovie', JSON.stringify(movie));
  };

  const handleDeselectMovie = () => {
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
      <Row className="mb-2 bg-light">
        <Col md="auto" className="d-flex align-items-center">
          <h1>ItFlix</h1>
        </Col>
        {user && (
          <>
            <Col className="d-flex align-items-center">
              <Button
                variant="secondary"
                className="mx-2"
                onClick={handleDeselectMovie}
              >
                Home
              </Button>
            </Col>
            <Col md="auto" className="d-flex align-items-center">
              <Button
                variant="secondary"
                className="mx-2"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Col>
          </>
        )}
      </Row>
      <Row>
        {!user ? (
          <Col md={8}>
            <LoginView onLoggedIn={handleLogin} />
            <br />
            or
            <br />
            <SignupView />
          </Col>
        ) : selectedMovie ? (
          <Col>
            <MovieView key={selectedMovie._id} movie={selectedMovie} />
          </Col>
        ) : loadingMovies ? (
          <Col>
            <p>Loading...</p>
          </Col>
        ) : movies.length === 0 ? (
          <Col>
            <p>No movies available</p>
          </Col>
        ) : (
          <>
            {movies.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                onCardClick={() => handleSelectMovie(movie)}
              />
            ))}
          </>
        )}
      </Row>
    </>
  );
};

export default MainView;
