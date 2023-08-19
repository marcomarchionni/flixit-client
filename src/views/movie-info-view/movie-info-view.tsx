import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Navigate } from 'react-router-dom';
import MovieInfoCard from '../../components/cards/movie-info-card';
import MainLayout from '../../components/layout/main-layout';
import MovieGrid from '../../components/movie-grid/movie-grid';
import { useAppSelector } from '../../redux/hooks';
import { selectMovies } from '../../redux/reducers/movies';
import { selectUser } from '../../redux/reducers/user';
import { getRelatedMovies } from '../../utils/related-movies';
import { NO_RELATED_MOVIES } from '../../utils/alert-content';

type MovieInfoParams = {
  movieId: string;
};

const MovieInfoView = () => {
  const user = useAppSelector(selectUser);
  if (!user) return <Navigate to="/login" />;

  const { movieId } = useParams<MovieInfoParams>();
  const movies = useAppSelector(selectMovies);
  const movie = movies.find((m) => m._id === movieId);
  if (!movieId || !movie) {
    return <Navigate to="/" />;
  }
  const relatedMovies = getRelatedMovies(movies, movie);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [movieId]);

  return (
    <MainLayout>
      <Row className="mb-4 g-4 w-100">
        <Col lg={9}>
          <MovieInfoCard movie={movie} />
        </Col>
        <Col lg={3} className="d-flex flex-column">
          <h2 className="text-light text-center mb-4">Related Movies</h2>
          <MovieGrid
            items={relatedMovies}
            isLoading={false}
            noItemsAlert={NO_RELATED_MOVIES}
          />
        </Col>
      </Row>
    </MainLayout>
  );
};

export default MovieInfoView;
