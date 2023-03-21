import React, { useEffect, useState } from 'react';
import { Movie, User } from '../../interfaces/interfaces';
import MovieGrid from '../movie-grid/movie-grid';

interface FavouritesViewProps {
  user: User;
  movies: Movie[];
  toggleFavourite: (movieId: string) => void;
}

const FavouritesView = ({
  user,
  movies,
  toggleFavourite,
}: FavouritesViewProps) => {
  const [favouriteMovies, setFavouriteMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const filteredMovies = movies.filter((movie) =>
      user.favouriteMovies.includes(movie._id)
    );
    setFavouriteMovies(filteredMovies);
  }, [movies, user]);

  console.log({ movies });
  console.log({ user });
  console.log({ favouriteMovies });
  return (
    <MovieGrid
      user={user}
      movies={favouriteMovies}
      loadingMovies={false}
      toggleFavourite={toggleFavourite}
    />
  );
};

export default FavouritesView;
