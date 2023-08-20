import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Navigate } from 'react-router-dom';
import MovieInfoCard from '../../components/cards/movie-info-card';
import MainWrapper from '../../components/layout/main-wrapper';
import MovieGrid from '../../components/movie-grid/movie-grid';
import { useMovieById } from '../../hooks/use-movie-by-id';
import { useAppSelector } from '../../redux/hooks';
import { selectMovies } from '../../redux/reducers/movies';
import { selectUser } from '../../redux/reducers/user';
import { NO_RELATED_MOVIES } from '../../utils/alert-content';
import { getRelatedMovies } from '../../utils/related-movies';

type MovieInfoParams = {
  movieId: string;
};

const MovieInfoView = () => {
  const user = useAppSelector(selectUser);

  if (!user) return <Navigate to="/login" />;

  const { movieId } = useParams<MovieInfoParams>();
  if (!movieId) {
    console.error('MovieInfoView: movieId is undefined');
    return <Navigate to="/" />;
  }

  const movies = useAppSelector(selectMovies);
  const { movie, isLoading } = useMovieById(movieId);
  const relatedMovies = movie ? getRelatedMovies(movies, movie) : [];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [movieId]);

  return (
    <MainWrapper>
      <Row className="mb-4 g-4 w-100">
        <Col lg={9} className="d-flex flex-column align-items-center">
          <MovieInfoCard movie={movie} isLoading={isLoading} />
        </Col>
        <Col lg={3} className="d-flex flex-column align-items-center">
          <h2 className="text-light text-center mb-4">Related Movies</h2>
          <MovieGrid
            items={relatedMovies}
            isLoading={isLoading}
            noItemsAlert={NO_RELATED_MOVIES}
          />
        </Col>
      </Row>
    </MainWrapper>
  );
};

export default MovieInfoView;
