import { Movie } from '../types/interfaces';

const differentTitle = (movieOne: Movie, movieTwo: Movie): boolean => {
  return movieOne.title !== movieTwo.title;
};

const sameDirector = (movieOne: Movie, movieTwo: Movie): boolean => {
  return movieOne.director.name === movieTwo.director.name;
};

const sameGenre = (movieOne: Movie, movieTwo: Movie): boolean => {
  return movieOne.genre.name === movieTwo.genre.name;
};

export const getRelatedMovies = (movies: Movie[], movie: Movie) =>
  movies.filter((m) => {
    return (
      (sameDirector(m, movie) || sameGenre(m, movie)) &&
      differentTitle(m, movie)
    );
  });
