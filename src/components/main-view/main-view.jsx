import { useState, useEffect } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import { findRelatedMovies } from '../../utils/functions';
import { MOVIES_URL } from '../../utils/api-urls';
import LoginView from '../login-view/login-view';
import SignupView from '../signup-view/signup-view';

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = JSON.parse(localStorage.getItem('token'));
  const storedMovie = JSON.parse(localStorage.getItem('selectedMovie'));
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [selectedMovie, setSelectedMovie] = useState(
    storedMovie ? storedMovie : null
  );
  const [movies, setMovies] = useState([]);

  const handleLogin = (dataUser, dataToken) => {
    setUser(dataUser);
    localStorage.setItem('user', JSON.stringify(dataUser));
    setToken(dataToken);
    localStorage.setItem('token', JSON.stringify(dataToken));
  };
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setSelectedMovie(null);
    localStorage.clear();
  };

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    localStorage.setItem('selectedMovie', JSON.stringify(movie));
  };

  const handleDeselectMovie = () => {
    setSelectedMovie(null);
    localStorage.setItem('selectedMovie', null);
  };

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch(MOVIES_URL, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => response.json())
      .then((movieData) => {
        setMovies(movieData);
      })
      .catch((err) => console.error(err));
  }, [token]);

  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={handleLogin} />
        <br />
        or
        <br />
        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    const relatedMovies = findRelatedMovies(movies, selectedMovie);
    return (
      <div>
        <button onClick={handleLogout}>Logout</button>
        <br />
        <MovieView
          key={selectedMovie._id}
          movie={selectedMovie}
          onBackClick={handleDeselectMovie}
        />
        <br />
        <h2>Related Movies</h2>
        {relatedMovies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onCardClick={() => handleSelectMovie(movie)}
          />
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return <div>No movie available</div>;
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <br />
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onCardClick={() => handleSelectMovie(movie)}
        />
      ))}
    </div>
  );
};

export default MainView;
