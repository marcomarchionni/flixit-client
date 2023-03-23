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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const filteredMovies = movies.filter((movie) =>
      user.favouriteMovies.includes(movie._id)
    );
    setFavouriteMovies(filteredMovies);
    setLoading(false);
  }, [movies, user]);
  return (
    <MovieGrid
      user={user}
      movies={favouriteMovies}
      loading={loading}
      noMoviesAlert="NoFavouriteMovies"
      toggleFavourite={toggleFavourite}
    />
  );
};

export default FavouritesView;
