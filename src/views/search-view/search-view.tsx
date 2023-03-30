import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import MainWrapper from '../../components/ui/main-layout';
import MovieGrid from '../../components/movie-grid/movie-grid';
import { Movie } from '../../interfaces/interfaces';
import { useAppSelector } from '../../redux/hooks';
import { selectLoading } from '../../redux/reducers/loading';
import { selectMovies } from '../../redux/reducers/movies';
import searchMovies from '../../utils/search-movies';

type SearchParams = {
  query: string;
};

const SearchView = () => {
  const [searchedMovies, setSearchedMovies] = useState<Movie[]>([]);
  const movies = useAppSelector(selectMovies);
  const loading = useAppSelector(selectLoading);
  const { query } = useParams<SearchParams>();
  if (!query) {
    return <Navigate to="/movies" />;
  }
  useEffect(() => {
    const searchedMovies = searchMovies(movies, query);
    setSearchedMovies(searchedMovies);
  }, [movies, query]);

  return (
    <MainWrapper>
      <MovieGrid
        items={searchedMovies}
        isLoading={loading}
        noItemsAlert="NoMovies"
      />
    </MainWrapper>
  );
};

export default SearchView;
