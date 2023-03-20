import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Movie } from '../../interfaces/interfaces';
import MovieCard from '../movie-card/movie-card';

interface RelatedMoviesProp {
  movie: Movie;
  movies: Movie[];
}

const RelatedMovies = ({ movie, movies }: RelatedMoviesProp) => {
  const differentTitle = (movieOne: Movie, movieTwo: Movie): boolean => {
    return movieOne.title !== movieTwo.title;
  };

  const sameDirector = (movieOne: Movie, movieTwo: Movie): boolean => {
    return movieOne.director.name === movieTwo.director.name;
  };

  const sameGenre = (movieOne: Movie, movieTwo: Movie): boolean => {
    return movieOne.genre.name === movieTwo.genre.name;
  };

  const relatedMovies: Movie[] = movies.filter((m) => {
    return (
      (sameDirector(m, movie) || sameGenre(m, movie)) &&
      differentTitle(m, movie)
    );
  });
  console.log('RelatedMovies:' + relatedMovies);

  return (
    <>
      <h4 className="my-4 text-center">Related Movies</h4>
      <Row className="bg-gray">
        {relatedMovies.map((movie) => (
          <Col key={movie._id} className="mb-4">
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default RelatedMovies;
