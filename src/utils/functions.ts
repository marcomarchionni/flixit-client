import { Movie } from '../interfaces/interfaces';

export const findRelatedMovies = (
  allMovies: Movie[],
  selectedMovie: Movie
): Movie[] => {
  return allMovies.filter((movie) => {
    return (
      (sameDirector(movie, selectedMovie) || sameGenre(movie, selectedMovie)) &&
      differentTitle(movie, selectedMovie)
    );
  });
};

const differentTitle = (movieOne: Movie, movieTwo: Movie): boolean => {
  return movieOne.title !== movieTwo.title;
};

const sameDirector = (movieOne: Movie, movieTwo: Movie): boolean => {
  return movieOne.director.name === movieTwo.director.name;
};

const sameGenre = (movieOne: Movie, movieTwo: Movie): boolean => {
  return movieOne.genre.name === movieTwo.genre.name;
};
