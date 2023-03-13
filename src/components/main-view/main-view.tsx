import { useState, useEffect } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import { findRelatedMovies } from '../../utils/utils';
import { MOVIES_URL } from '../../utils/api-urls';
import LoginView from '../login-view/login-view';
import SignupView from '../signup-view/signup-view';
import React from 'react';
import { Movie } from '../../interfaces/interfaces';

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
    const relatedMovies: Movie[] = findRelatedMovies(movies, selectedMovie);
    return (
      <div>
        <button onClick={handleDeselectMovie}>To Movie List</button>
        <button onClick={handleLogout}>Logout</button>
        <br />
        <h2>Movie View</h2>
        <MovieView key={selectedMovie._id} movie={selectedMovie} />
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

  if (loadingMovies) {
    return <div>Loading...</div>;
  }

  if (movies.length === 0) {
    return <div>No movie available</div>;
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <br />
      <h2>Movies</h2>
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
