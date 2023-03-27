import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Movie } from '../../interfaces/interfaces';
import Loading from '../../views/loading-view/loading-view';
import { AlertSimpleBox } from '../alerts/alerts';
import MainWrapper from '../layout/main-wrapper';
import MovieCard from '../movie-card/movie-card';

interface MovieGridProps {
  items: Movie[];
  loading: boolean;
  noMoviesAlert: string;
  toggleFavourite: (id: string) => void;
}

const MovieGrid = ({
  items,
  loading,
  noMoviesAlert,
  toggleFavourite,
}: MovieGridProps) => {
  const [alert, setAlert] = useState('');

  useEffect(() => {
    if (items.length === 0) {
      setAlert(noMoviesAlert);
    } else {
      setAlert('');
    }
  }, [items]);

  if (loading) {
    return <Loading />;
  }

  return (
    <MainWrapper>
      <AlertSimpleBox alert={alert} />
      <Row className="justify-content-center">
        {items.map((movie) => (
          <Col key={movie._id} style={{ flex: '0  0 15rem' }} className="mb-4">
            <MovieCard movie={movie} toggleFavourite={toggleFavourite} />
          </Col>
        ))}
      </Row>
    </MainWrapper>
  );
};

export default MovieGrid;
