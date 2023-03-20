import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Movie, User } from '../../interfaces/interfaces';
import MovieCard from '../movie-card/movie-card';

interface RelatedMoviesProp {
  movie: Movie;
  user: User;
  movies: Movie[];
  toggleFavourite: (id: string) => void;
}

const RelatedMovies = ({
  movie,
  user,
  movies,
  toggleFavourite: addToFavourites,
}: RelatedMoviesProp) => {
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
      <h3 className="my-4 text-center text-light">Related Movies</h3>
      <Row className="bg-gray">
        {relatedMovies.map((movie) => (
          <Col key={movie._id} className="mb-4">
            <MovieCard
              movie={movie}
              isFavourite={user.favouriteMovies.includes(movie._id)}
              toggleFavourite={addToFavourites}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default RelatedMovies;
