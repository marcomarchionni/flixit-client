import React from 'react';
import MainWrapper from '../../components/layout/main-wrapper';
import MovieGrid from '../../components/movie-grid/movie-grid';
import { useAppSelector } from '../../redux/hooks';
import { selectLoading } from '../../redux/reducers/loading';
import { selectMovies } from '../../redux/reducers/movies';

const MoviesView = () => {
  const movies = useAppSelector(selectMovies);
  const loading = useAppSelector(selectLoading);
  return (
    <MainWrapper>
      <MovieGrid items={movies} isLoading={loading} noItemsAlert="NoMovies" />
    </MainWrapper>
  );
};

export default MoviesView;
