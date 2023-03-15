import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Movie } from '../../interfaces/interfaces';
import Loading from '../loading/loading';
import MovieCard from '../movie-card/movie-card';

interface MovieGridProps {
  movies: Movie[];
  loadingMovies: boolean;
  showMovieInfo: Function;
}

const MovieGrid = ({
  movies,
  loadingMovies,
  showMovieInfo,
}: MovieGridProps) => {
  const noMovies = movies.length === 0;
  return (
    <Row>
      {loadingMovies ? (
        <Loading />
      ) : noMovies ? (
        <Col md={8}>
          <p>Sorry, no movies to show!</p>
        </Col>
      ) : (
        <>
          {movies.map((movie) => (
            <Col key={movie._id} xl={3} sm={4} className="mb-4">
              <MovieCard
                movie={movie}
                onInfoClick={() => showMovieInfo(movie)}
              />
            </Col>
          ))}
        </>
      )}
    </Row>
  );
};

export default MovieGrid;
