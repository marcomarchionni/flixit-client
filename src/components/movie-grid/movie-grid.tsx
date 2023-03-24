import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Movie, User } from '../../interfaces/interfaces';
import { AlertSimpleBox } from '../alerts/alerts';
import MainWrapper from '../layout/main-wrapper';
import MovieCard from '../movie-card/movie-card';
import Loading from '../loading-view/loading-view';

interface MovieGridProps {
  user: User;
  movies: Movie[];
  loading: boolean;
  noMoviesAlert: string;
  toggleFavourite: (id: string) => void;
}

const MovieGrid = ({
  user,
  movies,
  loading,
  noMoviesAlert,
  toggleFavourite,
}: MovieGridProps) => {
  const [alert, setAlert] = useState('');

  useEffect(() => {
    if (movies.length === 0) {
      setAlert(noMoviesAlert);
    } else {
      setAlert('');
    }
  }, [movies]);

  if (loading) {
    return <Loading />;
  }

  return (
    <MainWrapper>
      <AlertSimpleBox alert={alert} />
      <Row className="justify-content-center">
        {movies.map((movie) => (
          <Col key={movie._id} style={{ flex: '0  0 15rem' }} className="mb-4">
            <MovieCard
              user={user}
              movie={movie}
              toggleFavourite={toggleFavourite}
            />
          </Col>
        ))}
      </Row>
    </MainWrapper>
  );
};

export default MovieGrid;
