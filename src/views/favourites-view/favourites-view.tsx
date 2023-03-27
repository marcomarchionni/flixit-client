import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import MainWrapper from '../../components/layout/main-wrapper';
import MovieGrid from '../../components/movie-grid/movie-grid';
import { Movie } from '../../interfaces/interfaces';
import { useAppSelector } from '../../redux/hooks';
import { selectLoading } from '../../redux/reducers/loading';
import { selectMovies } from '../../redux/reducers/movies';
import { selectUser } from '../../redux/reducers/user';

const FavouritesView = () => {
  const user = useAppSelector(selectUser);
  if (!user) return <Navigate to="/login" />;

  const movies = useAppSelector(selectMovies);
  const [favouriteMovies, setFavouriteMovies] = useState<Movie[]>([]);
  const loading = useAppSelector(selectLoading);

  useEffect(() => {
    const filteredMovies = movies.filter((movie) =>
      user.favouriteMovies.includes(movie._id)
    );
    setFavouriteMovies(filteredMovies);
  }, [movies, user]);

  return (
    <MainWrapper>
      <MovieGrid
        items={favouriteMovies}
        isLoading={loading}
        noItemsAlert="NoFavouriteMovies"
      />
    </MainWrapper>
  );
};

export default FavouritesView;
