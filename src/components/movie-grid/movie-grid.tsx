import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Movie } from '../../interfaces/interfaces';
import { AlertSimpleBox } from '../alerts/alerts';
import Loading from '../loading/loading';
import MovieCard from '../movie-card/movie-card';

interface MovieGridProps {
  items: Movie[];
  isLoading: boolean;
  noItemsAlert: string;
}

const MovieGrid = ({
  items,
  isLoading,
  noItemsAlert: noMoviesAlert,
}: MovieGridProps) => {
  const [alert, setAlert] = useState('');

  useEffect(() => {
    if (items.length === 0) {
      setAlert(noMoviesAlert);
    } else {
      setAlert('');
    }
  }, [items]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <AlertSimpleBox alert={alert} />
      <Row className="justify-content-center">
        {items.map((movie) => (
          <Col key={movie._id} style={{ flex: '0  0 15rem' }} className="mb-4">
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default MovieGrid;
