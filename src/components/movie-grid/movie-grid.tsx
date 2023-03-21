import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Movie, User } from '../../interfaces/interfaces';
import MovieCard from '../movie-card/movie-card';
import Loading from './loading';
import NoMovies from './no-movies';

interface MovieGridProps {
  user: User;
  movies: Movie[];
  loadingMovies: boolean;
  toggleFavourite: (id: string) => void;
}

const MovieGrid = ({
  user,
  movies,
  loadingMovies,
  toggleFavourite,
}: MovieGridProps) => {
  if (loadingMovies) {
    return <Loading />;
  }

  const noMovies = movies.length === 0;
  if (noMovies) {
    return <NoMovies />;
  }

  return (
    <Row className="my-4">
      {movies.map((movie) => (
        <Col key={movie._id} xl={3} sm={4} className="mb-4">
          <MovieCard
            user={user}
            movie={movie}
            toggleFavourite={toggleFavourite}
          />
        </Col>
      ))}
    </Row>
  );
};

export default MovieGrid;
