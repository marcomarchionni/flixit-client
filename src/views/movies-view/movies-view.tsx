import React from 'react';
import MovieGrid from '../../components/movie-grid/movie-grid';
import { User } from '../../interfaces/interfaces';
import { useAppSelector } from '../../redux/hooks';
import { selectMovies } from '../../redux/reducers/movies';

interface MoviesViewProps {
  user: User;
  loading: boolean;
  toggleFavourite: (movieId: string) => void;
}

const MoviesView = ({ user, loading, toggleFavourite }: MoviesViewProps) => {
  const movies = useAppSelector(selectMovies);
  return (
    <MovieGrid
      user={user}
      items={movies}
      loading={loading}
      noMoviesAlert="NoMovies"
      toggleFavourite={toggleFavourite}
    />
  );
};

export default MoviesView;
