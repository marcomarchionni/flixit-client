import { Movie } from '../interfaces/interfaces';

const searchMatch = (movie: Movie, query: string) => {
  const stars = movie.stars.map((star) => star.name).join(' ');
  const movieString =
    `${movie.title} ${movie.originalTitle} ${movie.director} ${stars} ${movie.year} ${movie.genre.name}`.toLowerCase();
  const queryLowerCase = query.toLowerCase();
  return movieString.includes(queryLowerCase);
};

const searchMovies = (movies: Movie[], query: string) => {
  return movies.filter((movie) => searchMatch(movie, query));
};

export default searchMovies;
