import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import MovieGrid from '../../components/movie-grid/movie-grid';
import { Movie } from '../../interfaces/interfaces';
import { useAppSelector } from '../../redux/hooks';
import { selectMovies } from '../../redux/reducers/movies';
import { selectUser } from '../../redux/reducers/user';

interface FavouritesViewProps {
  toggleFavourite: (movieId: string) => void;
}

const FavouritesView = ({ toggleFavourite }: FavouritesViewProps) => {
  const user = useAppSelector(selectUser);
  if (!user) return <Navigate to="/login" />;

  const movies = useAppSelector(selectMovies);
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
      items={favouriteMovies}
      loading={loading}
      noMoviesAlert="NoFavouriteMovies"
      toggleFavourite={toggleFavourite}
    />
  );
};

export default FavouritesView;
